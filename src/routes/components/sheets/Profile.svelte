<script lang="ts">
	import { Block } from 'konsta/svelte';
	import { userData } from '$stores/user';
	import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
	import { sheetContent } from '$stores/application';

	const resetProfile = async () => {
		sheetContent.set(null);
	};

	$: userProperties = Object.keys($userData?.data || {});
</script>

<Block strong outline inset>
	<div class="grid grid-cols-2 gap-y-1">
		{#each userProperties as property}
			<div class="text-slate-400">
				{property}:
			</div>
			<div>Hello</div>
		{/each}
	</div>
</Block>

<div class="w-full flex justify-center">
	<button
		on:click={resetProfile}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
		>Reset Profile</button
	>
</div>
