import { writable } from 'svelte/store';

export const hoverStore = writable({ link: false, node: false });
export const clickStore = writable({ node: false });

export const userHasNavigated = writable<boolean>(false);

export const blogData = writable([]);
export const slugData = writable([]);
export const translationSlugs = writable([]);
export const homeData = writable([]);

export const currentLanguage = writable('en');
export const languages = writable([
	{ code: 'en', name: 'English', flag: 'fi fi-gb' },
	{ code: 'es', name: 'Español', flag: 'fi fi-es' }
]);

export const blogViews = writable<number>(0);
