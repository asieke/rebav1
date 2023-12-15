import { browser } from '$app/environment';
import { writable } from 'svelte/store';

//whether the theme is dark or light
export const darkMode = writable(
	browser ? localStorage.theme === 'dark' || !localStorage.theme : true
);
darkMode.subscribe((value) => {
	if (browser) {
		localStorage.theme = value ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', value);
	}
});
