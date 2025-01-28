<script lang="ts">
	import BlogPostCard from '../../component/Card/BlogPostCard/BlogPostCard.svelte';
</script>

<div class="mx-6 md:mt-8 w-16 h-0.5 bg-gray-300 md:mx-auto md:relative md:-left-24" />
<section class="flex flex-col items-center justify-center px-1">
	<div class="md:container grid md:grid-cols-6 gap-8 pt-5 md:pt-10 items-center">
		<div class="md:col-start-3 md:col-span-4">
			<h2
				class="inline-block bg-yellow-400 dark:text-gray-900 py-2 px-4 md:-ml-4 mb-2 rounded-sm text-lg font-bold font-customHeading uppercase"
			>
				Projects
			</h2>
		</div>
		<div class="md:col-start-2 md:col-span-4">
			<h1 class="font-customQuote xl:text-lg 2xl:text-xl">
				An example project that I've been proud to work on.
			</h1>
		</div>
		<BlogPostCard
			slug={'portfolio/sankey'}
			title={'Visualising Patient Flow'}
			coverImage={'/sankey.png'}
			altText={'A Sankey diagram showing patient flow through NHS services'}
			excerpt={'A Sankey diagram showing patient flow through NHS services following an NHS 111 call.'}
			tags={["D3.js","Svelte"]}
			readingTime={""}
			additionalClass={'col-span-full'}
			index={0}
		/>
	</div>
</section>
