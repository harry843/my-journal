<script lang="ts">
	import { page } from '$app/stores';
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

	let language = 'en'; // Default language
	let getAllPosts = buildQuery(language);

	// Function to build the GROQ query
	function buildQuery(language: string) {
		return `
		*[_type == 'personal' && language == '${language}']
		| order(_createdAt desc) {
		  title, "slug":slug.current, "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, "imageAlt":mainImage.alt, feature, tags, content
		}
	  `;
	}

	// Function to change the language and update the query
	function changeLanguage(newLanguage: string) {
		language = newLanguage;
		getAllPosts = buildQuery(language); // Update the query dynamically
	}

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
	{#if $blogData.length === 0}
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
