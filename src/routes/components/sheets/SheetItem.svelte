<script lang="ts">
	import { Sheet } from 'konsta/svelte';
	import { sheetContent } from '$stores/application';
	import { X } from 'lucide-svelte';

	const closeSheet = (e: Event) => {
		e.stopImmediatePropagation();
		sheetContent.set(null);
	};

	export let sheetName: string;
</script>

<Sheet
	class="z-50 bg-white dark:bg-black w-full h-4/5"
	backdrop={false}
	opened={$sheetContent === sheetName}
>
	<div class="w-full relative text-center bg-slate-100 dark:bg-slate-900 hairline-b py-2">
		<span>{sheetName}</span>
		<button
			class="absolute right-2 top-2 bg-slate-300 rounded-full p-1"
			on:click={(e) => closeSheet(e)}
		>
			<X class="w-3 h-3 text-slate-500" />
		</button>
	</div>

	<div class="h-full overflow-y-scroll">
		<slot />
	</div>
</Sheet>
