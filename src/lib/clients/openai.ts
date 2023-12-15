import { messages, suggestions } from '$lib/stores/chat';
import { contextInterview, contextAdvice, contextJSONBot, userQuestions } from './prompts';
import { userData, addElement, userInterviewComplete, summaryData } from '$lib/stores/user';
import { get } from 'svelte/store';

import OpenAI from 'openai';
import { PUBLIC_OPENAI_KEY } from '$env/static/public';
const openai = new OpenAI({
	apiKey: PUBLIC_OPENAI_KEY,
	dangerouslyAllowBrowser: true
});

export const getInitialMessage = async () => {
	messages.set([]);
	summaryData.set('');
	const data = get(userData);
	if (isInterviewComplete()) {
		messages.update((m) => [
			...m,
			{ role: 'assistant', content: `Hi, ${data.name}, what can I help you with today?` }
		]);
	} else {
		getAIResponse();
	}
};

export const isInterviewComplete = () => {
	if (Object.keys(get(userData)).length >= userQuestions.length) {
		userInterviewComplete.set(true);
		return true;
	} else {
		return false;
	}
};

export const getAIResponse = async () => {
	if (!isInterviewComplete()) {
		parseMessagesToUserData();
	} else {
		parseMessagesToSummary();
	}

	const userDataString = JSON.stringify(get(userData));

	const messagesToSend = [
		{
			role: 'system',
			content: get(userInterviewComplete) ? contextAdvice : contextInterview
		},
		{
			role: 'system',
			content: `Here is the information I have previously provided: ${userDataString}.`
		},
		...get(messages)
	];

	// get the stream
	const stream = await openai.chat.completions.create({
		model: 'gpt-4',
		messages: messagesToSend as OpenAI.ChatCompletionMessage[],
		stream: true
	});
	let str = '';
	messages.update((m) => [...m, { role: 'assistant', content: '...' }]);
	for await (const chunk of stream) {
		str += chunk.choices[0]?.delta?.content || '';
		if (str.length > 0) {
			messages.update((m) => [...m.slice(0, -1), { role: 'assistant', content: str }]);
		}
	}
};

export const parseMessagesToUserData = async () => {
	const lastTwoMessages = get(messages).slice(-2);
	if (lastTwoMessages.length < 2) return;

	const lastTwoMessagesString = `Prompt: ${lastTwoMessages[0].content}, Response: ${lastTwoMessages[1].content}`;
	const userDataString = JSON.stringify(get(userData));

	const messagesToSend = [
		{
			role: 'system',
			content: contextJSONBot
		},
		{
			role: 'user',
			content: `
			Here is the information I have previously provided: ${userDataString}.
			Here are the last two messages: ${lastTwoMessagesString}.
			Please parse the messages and return the key-value pair that should be saved to the database`
		}
	];

	try {
		const completion = await openai.chat.completions.create({
			messages: messagesToSend as OpenAI.ChatCompletionMessage[],
			model: 'gpt-3.5-turbo-1106',
			response_format: { type: 'json_object' }
		});

		const json = JSON.parse(completion.choices[0].message.content || '{}');
		addElement(json);

		console.log('result of parsing messages to user data: ', json);
	} catch (err) {
		console.error('[openai] - couldnt add element: ', err);
	}
};

const parseMessagesToSummary = async () => {
	console.log('[clients/openai] - parsing messages to summary');
	const lastTwoMessages = get(messages).slice(-2);
	const summaryDataString = get(summaryData);

	if (lastTwoMessages.length < 2) return;

	const messagesToSend = [
		{
			role: 'system',
			content:
				'You are a bot that summarizes text.  Please provide the most terse summary possible while maintaining all important context.'
		},
		{
			role: 'system',
			content: `You will return the response as ONLY a JSON object with 2 properties:
			{
				summary: (required, string) a string that summarizes the conversation.
				followups: (required, string[] size=2) an array of 2 strings that are <10 words each, that are suggested follow up questions the user can ask their financial advisor.
			}`
		},
		{
			role: 'user',
			content: `
			Here is the current summary: ${
				summaryDataString.length > 0
					? summaryDataString
					: 'no summary, subsequent messages are the first in the conversation'
			}.
			Please summarize the following messages and add to the summary ${JSON.stringify(lastTwoMessages)}.
			You may alter the original summary given the new context if necessary.
			Please return only a string that represents the entire summary.
			`
		}
	];

	try {
		const completion = await openai.chat.completions.create({
			messages: messagesToSend as OpenAI.ChatCompletionMessage[],
			model: 'gpt-3.5-turbo-1106',
			response_format: { type: 'json_object' }
		});
		if (completion.choices[0].message.content) {
			const json = JSON.parse(completion.choices[0].message.content);
			summaryData.set(json.summary);
			suggestions.set(json.followups);

			console.log(json);

			//summaryData.set(completion.choices[0].message.content);
		}
	} catch (err) {
		console.error('[openai] - couldnt parse messages', err);
	}
};
