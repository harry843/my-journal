<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import BlogPostCard from '../component/Card/BlogPostCard/BlogPostCard.svelte';
	import averageReadingTime from '../component/Card/BlogPostCard/averageReadingTime';
	import Loading from '../component/Loading/Loading.svelte';
	import DataFetcher from '../component/Sanity/DataFetcher.svelte';
	import genImageUrl from '../component/Sanity/utils/genImageUrl';
	import { blogData, currentLanguage, isAuthenticated } from '../stores/stores';

	// Find whether the current URL is local host or staging
	let isLocalOrStaging =
		$page.url.href.includes('localhost') ||
		$page.url.href.includes('staging.journal.harrykelleher.com');
	const dataset =
		process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';
	
	console.log($page.url.href, dataset);

	// List of Spanish-speaking country shortcodes (ISO 3166-1 alpha-2)
	const spanishSpeakingCountries = [
		'AR',
		'BO',
		'CL',
		'CO',
		'CR',
		'CU',
		'DO',
		'EC',
		'SV',
		'GQ',
		'GT',
		'HN',
		'MX',
		'NI',
		'PA',
		'PY',
		'PE',
		'ES',
		'UY',
		'VE'
	];

	// Function to build the GROQ query
	function buildQuery(lang) {
		return `
      *[_type == 'personal' && language == '${lang}']
      | order(_createdAt desc) {
        title, "slug":slug.current, "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, "imageAlt":mainImage.alt, feature, tags, content
      }
    `;
	}

	let getAllPosts = buildQuery($currentLanguage);

	$: {
		getAllPosts = buildQuery($currentLanguage);
	}

	// Fetch user's country and set language
	async function detectUserCountry() {
		try {
			const response = await fetch('https://ipapi.co/json/');
			const ipData = await response.json();
			console.log('User Country Code:', ipData.country_code);

			// Set language based on country code
			if (spanishSpeakingCountries.includes(ipData.country_code)) {
				currentLanguage.set('es');
			} else {
				currentLanguage.set('en');
			}
			console.log($currentLanguage);
			getAllPosts = buildQuery($currentLanguage);
		} catch (error) {
			console.error('Error fetching user country:', error);
			currentLanguage.set('en'); // Default to English if error occurs
			getAllPosts = buildQuery($currentLanguage);
		}
	}

	let headerHeight = 0;

	// Set default language on mount
	onMount(() => {
		detectUserCountry();
		const header = document.getElementById('main-header');
		if (header) {
			headerHeight = header.offsetHeight;
		}
	});

	// Function to handle data from DataFetcher
	function handleData(data) {
		blogData.set(data);
	}
</script>

<section class="flex flex-col items-center justify-center">
	<!-- DataFetcher Component -->
	<DataFetcher query={getAllPosts} onData={handleData} store={blogData} />

	<header
		id="main-header"
		class="flex flex-col gap-y-3 py-6 items-start justify-start border border-t-slate-200 border-b-slate-200 dark:border-t-slate-600 dark:border-b-slate-600 border-r-0 border-l-0 w-full"
	>
		<div class="font-serif px-2.5 py-1 border border-slate-300 text-sm italic rounded-full">
			{$currentLanguage === 'es' ? 'Blog Personal' : 'Personal Blog'}
		</div>
		<div class="font-customHeading text-3xl font-bold">
			{$currentLanguage === 'es' ? 'Relatos y Reflexiones' : 'Stories and Reflections'}
		</div>
	</header>

	<!-- Blog Posts -->
	{#if $blogData.length > 0 && $isAuthenticated}
		<div class="pt-5 grid grid-cols-2 gap-6">
			{#each $blogData as post, index}
				<BlogPostCard
					slug={post.slug}
					title={post.title}
					coverImage={genImageUrl(post.imageUrl, dataset, '?fit=max')}
					altText={post.imageAlt}
					excerpt={post.feature}
					tags={post.tags}
					readingTime={averageReadingTime(post.content, $currentLanguage)}
					additionalClass={index === 0 ? 'col-span-full' : ''}
					{index}
				/>
			{/each}
		</div>
	{:else if ($blogData.length == 0 || !$blogData) && $isAuthenticated}
		<div
			class="flex items-center justify-center w-full"
			style="height: calc(100vh - {headerHeight}px);"
		>
			<Loading />
		</div>
	{:else}
		<div
			class="flex items-center justify-center w-full"
			style="height: calc(100vh - {headerHeight}px);"
		/>
	{/if}
</section>
