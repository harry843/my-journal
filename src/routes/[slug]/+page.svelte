<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import CustomHeading from '../../component/Blog/PortableText/CustomHeading.svelte';
	import CustomParagraph from '../../component/Blog/PortableText/CustomParagraph.svelte';
	import CustomUrl from '../../component/Blog/PortableText/CustomURL.svelte';
	import CustomBullet from '../../component/Blog/PortableText/CustomBullet.svelte';
	import BlockQuote from '../../component/Blog/PortableText/BlockQuote.svelte';
	import CustomListItem from '../../component/Blog/PortableText/CustomOrderedListItem.svelte';
	import CustomQuote from '../../component/Blog/PortableText/CustomQuote.svelte';
	import CustomImage from '../../component/Blog/PortableText/CustomImage.svelte';
	import CustomIFrame from '../../component/Blog/PortableText/CustomIFrame.svelte';
	import CustomCodeBlock from '../../component/Blog/PortableText/CustomCodeBlock.svelte';
	import Tag from '../../component/Tag/Tag.svelte';
	import averageReadingTime from '../../component/Card/BlogPostCard/averageReadingTime';
	import dateformat from 'dateformat';
	import { PortableText } from '@portabletext/svelte';
	import Loading from '../../component/Loading/Loading.svelte';
	import Eye from '../../component/Icons/Eye.svelte';
	import { get } from 'svelte/store';
	import { slugData } from '../../stores/stores';
	import genImageUrl from '../../component/Sanity/utils/genImageUrl';
	import BlogMenu from '../../component/Blog/Menu/BlogMenu.svelte';
	import CustomOrderedList from '../../component/Blog/PortableText/CustomOrderedList.svelte';
	import CustomOrderedListItem from '../../component/Blog/PortableText/CustomOrderedListItem.svelte';

	export let data;

	let screenWidth: number = 0;

	$: slug = $page.params.slug;

	// Get the cached data from the store
	let cachedData = get(slugData)[slug];

	onMount(() => {
		// Ensure this code only runs on the client-side
		if (!cachedData) {
			slugData.update((store) => {
				store[slug] = data.blog;
				return store;
			});
		}

		// Any other DOM manipulation logic
		screenWidth = window.innerWidth;
	});

	// Set the current URL
	let isLocalOrStaging =
		$page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');
	const dataset =
		process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';

console.log(data.slugs)
</script>

<svelte:head>
	<title>{data.blog[0].title}</title>
	<meta property="og:title" content={data.blog[0].title} />
	<meta name="article:published_time" content={data.blog[0]._updatedAt} />
	<meta property="og:image" content={genImageUrl(data.blog[0].imageUrl, dataset, '?fit=max')} />
	<meta property="og:description" content={data.blog[0].feature} />
	<meta property="og:url" content={'https://blog.harrykelleher.com/' + data.blog[0].slug} />
	<meta property="og:type" content="article" />
	<meta name="author" content="Harry Kelleher" />
	<meta property="og:locale" content="en_GB" />
	<script src="https://cdn.jsdelivr.net/npm/prismjs@1.27.0/prism.js"></script>
</svelte:head>

<svelte:window bind:innerWidth={screenWidth} />

{#if data.blog[0] === undefined}
	<div class="flex h-screen items-center justify-center">
		<Loading />
	</div>
{:else}
	<section class="mx-2 sm:mx-5 md:mx-[15%] lg:mx-[18%] xl:mx-[22%]">
		{#if Object.keys(data.blog[0]).length > 0}
			{#if data.blog[0].title !== undefined}
				<h1 class="text-3xl font-semibold font-customHeading text-center pb-6">
					{data.blog[0].title}<a href="#top" />
				</h1>
			{/if}

			<div class="flex flex-row justify-center items-center">
				<img src="/blog-profile-2.jpg" class="h-14 mr-2 rounded-full" alt="Harry Kelleher" />
				<div class="flex flex-col justify-center text-center gap-y-1 font-customParagraph">
					<div class="text-sm text-opacity-80">by Harry Kelleher</div>
					<div class="flex flex-row text-sm gap-x-1 xxs:gap-x-1.5 text-opacity-80">
						{#if data.blog[0]._updatedAt !== undefined}
							<div>
								{dateformat(data.blog[0]._updatedAt, 'UTC:dd mmm yyyy')}
							</div>
						{/if}
						<div>&#x2022;</div>
						{#if data.blog[0].content !== undefined}
							<div>{averageReadingTime(data.blog[0].content)}</div>
						{/if}
					</div>
				</div>
			</div>

			{#if data.blog[0].tags !== undefined}
				<div class="pt-6 flex justify-center gap-3 flex-wrap">
					{#each data.blog[0].tags as tag}
						<Tag>{tag}</Tag>
					{/each}
				</div>
			{/if}
			{#if data.blog[0].imageUrl !== undefined}
				<figure class="py-4">
					<img
						src={genImageUrl(data.blog[0].imageUrl, dataset, '?fit=max')}
						alt={data.blog[0].imageAlt}
					/>
					{#if data.blog[0].imageCaption}
						<figcaption
							class="text-xs sm:text-sm text-center mx-[5%] text-gray-800 dark:text-slate-100 py-2"
						>
							{data.blog[0].imageCaption}
						</figcaption>
					{/if}
				</figure>
			{/if}

			{#if data.blog[0].content !== undefined}
				<BlogMenu {screenWidth} content={data.blog[0].content} />

				<PortableText
					components={{
						types: {
							quote: CustomQuote,
							imageWithAlt: CustomImage,
							iframe: CustomIFrame,
							code: CustomCodeBlock
						},
						block: {
							normal: CustomParagraph,
							blockquote: BlockQuote,
							h1: CustomHeading,
							h2: CustomHeading,
							h3: CustomHeading,
							h4: CustomHeading,
							h5: CustomHeading
						},
						marks: {
							link: CustomUrl
						},
						listItem: {
							bullet: CustomListItem,
							number: CustomOrderedListItem
						},
						list: {
							bullet: CustomBullet,
							number: CustomOrderedList
						}
					}}
					value={data.blog[0].content}
					onMissingComponent={false}
				/>
			{/if}
		{:else}
			<div class="text-red-500">An error occurred while fetching data. Please try again later.</div>
		{/if}
	</section>
{/if}
