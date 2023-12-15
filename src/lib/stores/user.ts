import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

type UserData = Record<string, string | number>;

export const summaryData = writable<string>((browser && localStorage.summaryData) || '');

export const userData = writable<UserData>(
	browser && localStorage.userData ? JSON.parse(localStorage.userData) : {}
);

export const userInterviewComplete = writable<boolean>(
	browser ? localStorage.userInterviewComplete === 'true' : false
);

userInterviewComplete.subscribe((value) => {
	if (browser) {
		localStorage.userInterviewComplete = value ? 'true' : 'false';
	}
});

summaryData.subscribe((value) => {
	if (browser) localStorage.summaryData = value;
});

export const getUserDataString = () => {
	const data = get(userData);
	const keys = Object.keys(data);
	let str = '';
	for (let i = 0; i < keys.length; i++) {
		str += `${i + 1}: ${keys[i]} => ${data[keys[i]]}\n`;
	}

	return str;
};

export const addElement = (element: Record<string, string | number>) => {
	userData.update((data) => {
		const newData = { ...data, ...element };
		localStorage.userData = JSON.stringify(newData);
		return newData;
	});
};
