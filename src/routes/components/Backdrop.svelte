<script lang="ts">
	import { sidebarOpen, sheetContent } from '$stores/application';

	const close = () => {
		sidebarOpen.set(false);
		sheetContent.set(null);
	};
</script>

<button
	on:click={close}
	class="{$sidebarOpen || $sheetContent !== null ? 'opacity-20' : 'opacity-0 pointer-events-none'}
  absolute transition-all duration-400 ease-in-out backdrop-blur-sm top-0 bottom-0 left-0 right-0 bg-black dark:bg-white z-30"
/>
