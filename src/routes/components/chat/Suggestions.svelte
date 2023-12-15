<script lang="ts">
	import { messages } from '$stores/chat';
	import { getAIResponse } from '$lib/clients/openai';
	import { suggestions } from '$lib/stores/chat';

	const sendMessageToAI = async (messageText: string) => {
		messages.update((messages) => [...messages, { role: 'user', content: messageText }]);
		await getAIResponse();
	};
</script>

<div class="h-full w-full bg-slate-200 dark:bg-purple-950 py-1 px-2 grid grid-cols-2 gap-2 text-xs">
	{#each $suggestions as suggestion}
		<button on:click={() => sendMessageToAI(suggestion)}>{suggestion.trim()}</button>
	{/each}
</div>

<style>
	button {
		@apply text-xs w-full overflow-hidden text-ellipsis;
	}
</style>
