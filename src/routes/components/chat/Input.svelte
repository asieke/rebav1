<script lang="ts">
	import { messages } from '$stores/chat';
	import { getAIResponse } from '$lib/clients/openai';
	import { ArrowUp } from 'lucide-svelte';
	import { userData } from '$stores/user';
	import { suggestionsShowing } from '$stores/application';
	import { userInterviewComplete } from '$stores/user';

	let messageText = '';
	$: inputOpacity = messageText.length >= 3 ? 1 : 0.3;
	let messageInput: HTMLInputElement;

	const onMessageTextKeydown = (e: KeyboardEvent) => {
		//if key is enter and !shiftKey
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessageToAI();
			return;
		}
	};

	const sendMessageToAI = async () => {
		messages.update((messages) => [...messages, { role: 'user', content: messageText }]);
		messageText = '';
		await getAIResponse();
	};

	const showSuggestions = async () => {
		if ($userInterviewComplete) {
			suggestionsShowing.set(true);
		}
	};
</script>

<div
	class="absolute top-0 w-full h-[64px] p-4 -ml-[1px] flex flex-row items-center dark:bg-slate-800 bg-slate-100"
>
	<input
		on:keydown={(e) => onMessageTextKeydown(e)}
		on:focus={() => {
			showSuggestions();
		}}
		on:blur={() => suggestionsShowing.set(false)}
		bind:this={messageInput}
		bind:value={messageText}
		type="text"
		class="w-full h-full text-black dark:text-white bg-slate-200 dark:bg-slate-900 rounded-md px-2 ring-0 outline-0 border-0 mr-2"
		placeholder="Type something..."
	/>
	<button
		class="bg-purple-400 rounded-full p-[3px] ml-1"
		on:click={sendMessageToAI}
		style="opacity: {inputOpacity}"><ArrowUp class="h-4 w-4 text-white" /></button
	>
</div>
