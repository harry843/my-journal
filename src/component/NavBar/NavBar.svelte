<script lang="ts">
	import DesktopMenu from './DesktopMenu/DesktopMenu.svelte';
	import MobileMenu from './MobileMenu/MobileMenu.svelte';
	import { browser } from '$app/environment';
	import ProgressBar from '../Blog/ProgressBar/ProgressBar.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	$: open = false;
	let width = 0;
	let progress = 10;

	const handleOpen = () => {
		open = !open;
	};

	const handleClose = () => {
		open = false;
	};

	let darkMode = false;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}

	onMount(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;

      // Calculate scroll progress as a percentage
      progress = (scrollPosition / (documentHeight - windowHeight)) * 100;
    };

    // Attach scroll event listener to update progress on scroll
    window.addEventListener("scroll", calculateScrollProgress);

    // Initial calculation
    calculateScrollProgress();

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  });
</script>

<nav id="navbar"
	bind:clientWidth={width}
	class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
>
	<div
		class="px-2 xs:px-4 md:px-16 lg:px-32 xl:px-44 2xl:px-56 flex flex-wrap items-center justify-between mx-auto py-2"
	>
		<a href="/" class="flex items-center">
			<img src="blog-profile-head.png" class="h-10 w-10" alt="logo" />
			{#if width != 0 && width >= 375}
				<span
					class="px-3 self-center text-xl xs:text-2xl font-semibold whitespace-nowrap font-customHeading dark:text-white hover:underline"
					>Harry Kelleher</span
				>
			{/if}
		</a>
		<div class="flex flex-row items-center gap-x-5">
			{#if width > 767}
				<DesktopMenu {darkMode} {handleSwitchDarkMode} {width} />
			{:else if width != 0}
				<MobileMenu {darkMode} {handleSwitchDarkMode} {width} />
			{/if}
			
		</div>
	</div>
	{#if $page.url.pathname.startsWith('/blog/') && width >= 640}
		<ProgressBar height={0.5} {progress}/>
	{/if}
</nav>
