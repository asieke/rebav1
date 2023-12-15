<script lang="ts">
	import { Page, Panel, List, ListItem, Toggle, BlockTitle } from 'konsta/svelte';
	import { sidebarOpen, sheetContent } from '$stores/application';
	import { darkMode } from '$stores/settings';

	const showSheet = (sheet: string) => {
		sidebarOpen.set(false);
		sheetContent.set(sheet);
	};
</script>

<Panel
	side="left"
	backdrop={false}
	opened={$sidebarOpen}
	onBackdropClick={() => sidebarOpen.set(false)}
>
	<Page class="bg-slate-100 dark:bg-slate-950 pt-16">
		<div class="px-4 pt-4 flex flex-row h-16 space-x-2 items-center align-middle">
			<button class="h-full">
				<img src="/user.png" class="w-10 h-10 rounded-full" alt="user" />
			</button>
			<div class="flex flex-col text-sm">
				<span>Alex Sieke</span>
				<span>asieke@gmail.com</span>
			</div>
		</div>

		<BlockTitle>My Profile</BlockTitle>

		<List strong inset>
			<ListItem title="My Profile" onClick={() => showSheet('My Profile')} />
			<ListItem title="Financial Accounts" onClick={() => showSheet('My Accounts')} />
			<ListItem title="Privacy" onClick={() => showSheet('Privacy')} />
		</List>

		<BlockTitle>Settings</BlockTitle>

		<List strong inset>
			<ListItem title="Dark Mode">
				<Toggle slot="after" checked={$darkMode} onChange={() => darkMode.set(!$darkMode)} />
			</ListItem>

			<ListItem title="All Settings" onClick={() => showSheet('Settings')} />
		</List>
	</Page>
</Panel>
