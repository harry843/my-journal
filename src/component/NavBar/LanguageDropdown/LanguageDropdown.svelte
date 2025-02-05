<script lang="ts">
	import { writable, get } from 'svelte/store';
	import { currentLanguage, languages, translationSlugs } from '../../../stores/stores';
	import { page } from '$app/stores';

	const isOpen = writable(false);

	// // Reactive slug detection
	// $: currentSlug = get(page).url.pathname.replace(/^\/|\/$/g, '');
	// $: isSlugPage = !!currentSlug && !currentSlug.includes('/');

	function changeLanguage(lang: string) {
		const currentPage = get(page);
		const currentSlug = currentPage.url.pathname.split('/').pop(); // Get the last part of the URL

		// Check if we're on the home page
		const isHomePage = currentPage.url.pathname === '/';

		if (isHomePage) {
			// If on the home page, just update the store and fire the API request
			currentLanguage.set(lang);
			isOpen.set(false);
			return;
		}

		// If on a slug page, get the translated slug
		const translations = get(translationSlugs)[currentSlug] || [];
		const translatedEntry = translations.find(entry => entry.language === lang);

		if (translatedEntry) {
			const newUrl = `/${translatedEntry.slug}?lang=${lang}`;
			window.open(newUrl, '_blank'); // Open translated page in new tab
		}
		
		// Update language store
		currentLanguage.set(lang);
		isOpen.set(false);
	}
</script>

<div class="relative">
	<!-- Dropdown Button -->
	<button
		on:click={() => isOpen.update((n) => !n)}
		class="flex items-center px-2 py-1 border border-gray-300 dark:border-gray-800 rounded-md bg-white hover:bg-gray-100 text-gray-700 justify-between"
	>
		{#each $languages as lang}
			{#if lang.code === $currentLanguage}
				<span class="{lang.flag} mr-2" />
			{/if}
		{/each}
		<span class="ml-1">
			<svg class="fill-gray-800 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
				<path
					d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
            c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
            s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
				/>
			</svg>
		</span>
	</button>

	<!-- Dropdown Menu -->
	{#if $isOpen}
		<div class="absolute mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-md">
			{#each $languages as lang}
				<button
					on:click={() => changeLanguage(lang.code)}
					class="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium text-sm"
				>
					<span class="{lang.flag} mr-2" />
					{lang.name}
				</button>
			{/each}
		</div>
	{/if}
</div>
