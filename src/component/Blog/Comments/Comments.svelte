<script lang="ts">
    export let slug: string;
    export let title: string;
</script>

{#if slug !== undefined && title !== undefined}
<section class="flex flex-col items-left text-left mx-2 md:mx-[15%] lg:mx-[18%] xl:mx-[22%] pt-5">
	<h2 class="py-2 font-customHeading font-medium text-2xl">What's your take?</h2>
	<p class="pb-4">A penny for your thoughts in the comments below.</p>
	<div
		id="cusdis_thread"
		data-host="https://cusdis-comments-4386.vercel.app"
		data-app-id="abef92dc-6c41-4f5f-8069-1d4fc045f773"
		data-page-id={slug}
		data-page-url="https://www.harrykelleher.com/blog/{slug}"
		data-page-title={title}
		data-theme="light"
	/>
</section>
{/if}