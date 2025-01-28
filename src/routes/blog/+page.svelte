<script lang="ts">
	import BlogPostCard from '../../component/Card/BlogPostCard/BlogPostCard.svelte';
	import averageReadingTime from '../../component/Card/BlogPostCard/averageReadingTime';
	import Loading from '../../component/Loading/Loading.svelte';
	import DataFetcher from '../../component/Sanity/DataFetcher.svelte';
	import genImageUrl from '../../component/Sanity/utils/genImageUrl';
	import { blogData } from '../../stores/stores';
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	// Find whether the current URL is local host or staging
	let isLocalOrStaging = $page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');

	const dataset = process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';

	let language = 'en';

	const getAllPosts = `
	  *[_type == 'personal' && language == 'en']
	  | order(_createdAt desc) {
		  title, "slug":slug.current, "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, "imageAlt":mainImage.alt, feature, tags, content
	  }
	`;

	// Function to receive data from DataFetcher component
	function handleData(data) {
		$blogData = data;
		console.log($blogData)
	}

	// Set it as soon as pages update
	afterUpdate(() => {
		isLocalOrStaging =  $page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');
	});
</script>

<svelte:head>
	<title>Blog | Harry Kelleher</title>
</svelte:head>

<section
	class={Object.keys($blogData).length == 0
		? 'flex h-screen items-center justify-center'
		: 'px-1 xs:px-2 md:px-4 flex flex-col items-center justify-center text-sm'}
>
	<DataFetcher query={getAllPosts} onData={handleData} store={blogData} />
	{#if Object.keys($blogData).length == 0}
		<Loading />
	{:else if Object.keys($blogData).length > 0}
		<div class="grid grid-cols-2 space-y-6 gap-x-6 rounded-md">
			<h1 class="font-customHeading font-semibold text-left text-2xl">Blog Posts</h1>
			{#each $blogData as post, index}
				<BlogPostCard
					slug={'blog/' + post.slug}
					title={post.title}
					coverImage={genImageUrl(post.imageUrl, dataset, '?fit=max')}
					altText={post.mainImage?.alt}
					excerpt={post.feature}
					tags={post?.tags}
					readingTime={averageReadingTime(post?.content)}
					additionalClass={index === 0 ? 'col-span-full' : 'col-span-full md:col-span-1'}
					{index}
				/>
			{/each}
		</div>
	{:else}
		<div class="text-lg text-red-500">
			An error occurred whilst fetching data. Please refresh the page or try.
		</div>
	{/if}
</section>
