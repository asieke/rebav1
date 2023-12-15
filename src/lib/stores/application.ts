import { writable } from 'svelte/store';

export const suggestionsShowing = writable(false);
export const sidebarOpen = writable(false);
export const sheetContent = writable<null | string>(null);
