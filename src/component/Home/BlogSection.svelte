<script lang="ts">
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	import BlogPostCard from '../../component/Card/BlogPostCard/BlogPostCard.svelte';
	import averageReadingTime from '../../component/Card/BlogPostCard/averageReadingTime';
	import genImageUrl from '../Sanity/utils/genImageUrl';

	export let latestPost;

	// Find whether the current URL is local host or staging
	let isLocalOrStaging =
		$page.url.href.includes('localhost') ||
		$page.url.href.includes('staging.journal.harrykelleher.com');

	const dataset =
		process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';

	$: imageUrlParams = '?fm=webp&max-h=300&max-w=500&min-h=240&min-w=400';

	afterUpdate(() => {
		isLocalOrStaging =
			$page.url.href.includes('localhost') ||
			$page.url.href.includes('staging.journal.harrykelleher.com');
	});
</script>

<div class="mx-6 md:mt-8 w-16 h-0.5 bg-gray-300 md:mx-auto md:relative md:-left-24" />
<section class="flex flex-col items-center justify-center px-1">
	<div class="md:container grid md:grid-cols-6 gap-8 pt-5 md:pt-10 items-center">
		<div class="md:col-start-3 md:col-span-4">
			<h2
				class="inline-block bg-yellow-400 dark:text-gray-900 py-2 px-4 md:-ml-4 mb-2 rounded-sm text-lg font-bold font-customHeading uppercase"
			>
				Blog
			</h2>
		</div>
		<div class="md:col-start-2 md:col-span-4">
			<p class="ml-px pb-1 font-customQuote xl:text-lg 2xl:text-xl">
				Every now and then, I write about something that interests me.
			</p>
			<h1 class="font-customHeading font-semibold text-left text-xl pt-5">↓ Latest Blog Post ↓</h1>
		</div>
		<BlogPostCard
			slug={'blog/' + latestPost.slug}
			title={latestPost.title}
			coverImage={genImageUrl(latestPost.imageUrl, dataset, imageUrlParams)}
			altText={latestPost.imageAlt}
			excerpt={latestPost.feature}
			tags={latestPost?.tags}
			readingTime={averageReadingTime(latestPost?.content)}
			additionalClass={'col-span-full'}
			index={0}
		/>
	</div>
	<div class="pb-10" />
</section>
