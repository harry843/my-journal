import { writable } from 'svelte/store';

export const hoverStore = writable({ link: false, node: false });
export const clickStore = writable({ node: false });

export const userHasNavigated =  writable<boolean>(false)

export const blogData = writable([])
export const slugData = writable([])
export const homeData = writable([])

export const blogViews = writable<number>(0)
