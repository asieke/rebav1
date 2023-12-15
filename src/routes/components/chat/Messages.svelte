<script lang="ts">
	import { Messages, Message } from 'konsta/svelte';
	import { messages } from '$stores/chat';
	import { onMount, tick } from 'svelte';

	export let height = 0;
	let messageDiv: HTMLDivElement;

	const scrollToTop = () => {
		tick().then(() => {
			if (messageDiv) messageDiv.scrollTop = messageDiv.scrollHeight;
		});
	};

	$: if (height) {
		scrollToTop();
	}

	onMount(() => {
		messages.subscribe(() => {
			scrollToTop();
		});
	});
</script>

<div class="w-full overflow-y-scroll p-4 pb-6" bind:this={messageDiv} style="height: {height}px">
	<div class="w-full flex flex-col gap-2">
		{#each $messages as { role, content }}
			{#if role === 'assistant'}
				<div class="w-4/5 mb-1 grid grid-cols-[32px_1fr]">
					<div class="flex align-baseline items-end">
						<img alt="avatar" class="w-8 h-8 rounded-full" src="/reba.png" />
					</div>
					<div class="bg-slate-500 text-white p-2 text-sm rounded-lg">{content}</div>
				</div>
			{:else}
				<div class="w-4/5 bg-blue-500 text-white ml-auto p-2 text-sm rounded-lg">{content}</div>
			{/if}
		{/each}
	</div>
</div>
