<script lang="ts">
	import { Navbar } from 'konsta/svelte';
	import { sidebarOpen } from '$stores/application';
	import { Menu } from 'lucide-svelte';

	const toggleMenu = () => {
		sidebarOpen.set(!$sidebarOpen);
	};
</script>

<Navbar transparent={true} class="absolute top-0 bg-slate-100 dark:bg-slate-800 h-12">
	<div class="flex flex-row w-full h-full justify-center items-center px-3 relative">
		<button
			class="{$sidebarOpen
				? 'opacity-0'
				: 'opacity-100'} duration-400 transition-all ease-in-out absolute left-2"
			on:click|stopPropagation={toggleMenu}><Menu /></button
		>

		<span>Reba (demo)</span>
	</div>
</Navbar>
