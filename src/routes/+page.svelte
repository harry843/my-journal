<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import BlogPostCard from '../component/Card/BlogPostCard/BlogPostCard.svelte';
	import averageReadingTime from '../component/Card/BlogPostCard/averageReadingTime';
	import Loading from '../component/Loading/Loading.svelte';
	import DataFetcher from '../component/Sanity/DataFetcher.svelte';
	import genImageUrl from '../component/Sanity/utils/genImageUrl';
	import { blogData } from '../stores/stores';

	// Find whether the current URL is local host or staging
	let isLocalOrStaging =
		$page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');
	const dataset =
		process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';

	  // List of Spanish-speaking country shortcodes (ISO 3166-1 alpha-2)
	  const spanishSpeakingCountries = [
    "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ", "GT", "HN",
    "MX", "NI", "PA", "PY", "PE", "ES", "UY", "VE"
  ];

  let language = 'en'; // Default language
  let getAllPosts;

  // Function to build the GROQ query
  function buildQuery(language: string) {
    return `
      *[_type == 'personal' && language == '${language}']
      | order(_createdAt desc) {
        title, "slug":slug.current, "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, "imageAlt":mainImage.alt, feature, tags, content
      }
    `;
  }

  // Fetch user's country and set language
  async function detectUserCountry() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const ipData = await response.json();
      console.log("User Country Code:", ipData.country_code);

      // Set language based on country code
      if (spanishSpeakingCountries.includes(ipData.country_code)) {
        language = 'es';
      } else {
        language = 'en';
      }

      getAllPosts = buildQuery(language);
    } catch (error) {
      console.error("Error fetching user country:", error);
      language = 'en'; // Default to English if error occurs
      getAllPosts = buildQuery(language);
    }
  }

  // Function to change language manually
  function changeLanguage(newLanguage: string) {
    language = newLanguage;
    getAllPosts = buildQuery(language);
  }

  // Set default language on mount
  onMount(() => {
    detectUserCountry();
  });

  // Function to handle data from DataFetcher
  function handleData(data) {
    blogData.set(data);
  }
</script>

<section class="flex flex-col items-center justify-center">
	<!-- Language Selection Buttons -->
	<div class="flex space-x-4 my-4">
		<button
			on:click={() => changeLanguage('en')}
			class="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-gray-700"
		>
			<span class="fi fi-gb mr-2" /> English
		</button>
		<button
			on:click={() => changeLanguage('es')}
			class="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-gray-700"
		>
			<span class="fi fi-es mr-2" /> Español
		</button>
	</div>

	<!-- DataFetcher Component -->
	<DataFetcher query={getAllPosts} onData={handleData} store={blogData} />

	<!-- Blog Posts -->
	{#if $blogData.length === 0 || !$blogData}
		<Loading />
	{:else}
		<div class="grid grid-cols-2 gap-6">
			{#each $blogData as post, index}
				<BlogPostCard
					slug={'blog/' + post.slug}
					title={post.title}
					coverImage={genImageUrl(post.imageUrl, dataset, '?fit=max')}
					altText={post.imageAlt}
					excerpt={post.feature}
					tags={post.tags}
					readingTime={averageReadingTime(post.content)}
					additionalClass={index === 0 ? 'col-span-full' : ''}
				/>
			{/each}
		</div>
	{/if}
</section>
