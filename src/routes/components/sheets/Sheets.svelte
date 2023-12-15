<script lang="ts">
	import { Page } from 'konsta/svelte';
	import { SheetItem, Profile, Accounts, Privacy, Settings } from '$components/sheets';
</script>

<Page>
	<SheetItem sheetName="My Profile">
		<Profile />
	</SheetItem>
	<SheetItem sheetName="My Accounts">
		<Accounts />
	</SheetItem>
	<SheetItem sheetName="Privacy">
		<Privacy />
	</SheetItem>
	<SheetItem sheetName="Settings">
		<Settings />
	</SheetItem>
</Page>
