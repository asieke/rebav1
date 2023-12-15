import type { Message } from '$lib/types';
import { writable } from 'svelte/store';

//default the messages to initial messages
export const messages = writable<Message[]>([]);

const initialSuggestions = [
	'Tell me about 401k plans',
	'Help me develop a college savings plan',
	'What is a Roth IRA?',
	'Plese recommend an asset allocation',
	'How can I save money on taxes?'
];

// Function to get 3 random elements from the array
const getRandomElements = (arr: string[], count: number) => {
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

export const suggestions = writable<string[]>(getRandomElements(initialSuggestions, 2));
