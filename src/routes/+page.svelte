<script lang="ts">
	import { Capacitor } from '@capacitor/core';
	import { Keyboard } from '@capacitor/keyboard';
	import { App, Page } from 'konsta/svelte';
	import { onMount } from 'svelte';

	import { Navbar, Sidebar, Backdrop } from '$components';
	import { ChatInput, ChatMessages, ChatSuggestions } from '$components/chat';
	import { Sheets } from '$components/sheets';

	import { suggestionsShowing } from '$stores/application';
	import { userData } from '$stores/user';
	import { getAIResponse, getInitialMessage } from '$lib/clients/openai';

	//heights
	let heightApp = 0;
	let heightKeyboard = 0;
	let heightNavbar = 48;
	let heightInput = 64;
	let offsetBottom = 32;
	let offsetTop = 64;

	$: heightSuggestions = $suggestionsShowing ? 64 : 0;
	$: heightMessages =
		heightApp -
		heightNavbar -
		heightKeyboard -
		heightInput -
		offsetBottom -
		offsetTop -
		heightSuggestions;

	let loading = true;

	onMount(async () => {
		if (Capacitor.getPlatform() !== 'web') {
			offsetTop = 64;
			Keyboard.addListener('keyboardWillShow', (info) => {
				heightKeyboard = info.keyboardHeight;
				offsetBottom = 0;
			});

			Keyboard.addListener('keyboardWillHide', () => {
				offsetBottom = 32;
				heightKeyboard = 0;
			});
		}

		heightApp = window.innerHeight;
		await getInitialMessage();
		loading = false;
	});
</script>

<!-- App component ideally should be the main root component -->
<App theme="ios" safeAreas={true}>
	{#if loading === true}
		<Page>Loading</Page>
	{:else}
		<Page>
			<!-- Offset Top for Mobile Devices -->
			<div class="absolute z-20 top-0 h-16 bg-purple-500 w-full" style="height: {offsetTop}px" />

			<Backdrop />
			<Sheets />
			<Sidebar />

			<!-- Navbar -->
			<div
				class="absolute z-20 w-full hairline-b"
				style="height: {heightNavbar}px; top: {offsetTop}px"
			>
				<Navbar />
			</div>

			<!-- Chat Messages -->
			<div
				class="w-full absolute z-30 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-all duration-300 ease-in-out"
				style="height: {heightMessages}px; top: {offsetTop + heightNavbar}px"
			>
				<ChatMessages height={heightMessages} />
			</div>

			<div
				class="absolute z-40 w-full transition-all duration-300 ease-in-out"
				style="height: {heightSuggestions}px; top: {offsetTop + heightNavbar + heightMessages}px"
			>
				<ChatSuggestions />
			</div>

			<div
				class="w-full absolute z-50 bg-slate-100 dark:bg-slate-800 transition-all duration-300 ease-in-out"
				style="height: {heightInput + offsetBottom}px; top: {offsetTop +
					heightNavbar +
					heightSuggestions +
					heightMessages}px"
			>
				<ChatInput />
			</div>
		</Page>
	{/if}
</App>

<svelte:head>
	<script>
		if (window) {
			// On page load or when changing themes, best to add inline in `head` to avoid FOUC
			if (
				localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	</script>
</svelte:head>
