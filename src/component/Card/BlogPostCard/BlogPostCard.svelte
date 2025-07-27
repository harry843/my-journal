<script lang="ts">
	import Card from '../Card.svelte';
	import Tag from '../../Tag/Tag.svelte';
	import { currentLanguage } from '../../../stores/stores';

	export let title: string | null = null;
	export let coverImage: string | undefined = undefined;
	export let altText: string | null | undefined = undefined;
	export let excerpt: string | null = null;
	export let slug: string;
	export let tags: (string | null)[] | null | undefined = null;
	export let readingTime: string | null = null;
	export let additionalClass: string | undefined = undefined;
	export let index: number | undefined = undefined;

	$: urlParams = '?lang=' + $currentLanguage;
</script>

<Card href="/{slug}{urlParams}" target="_self" {additionalClass} {index}>
	<div class="" slot="image">
		<img class={index === 0 ? 'items-center max-h-[300px] ' : 'max-h-[300px] '} src={coverImage} alt={altText} />
	</div>
	<div class="gap-0 items-start" slot="content">
		<h1 class="flex items-center justify-between w-full text-2xl font-semibold">
			{title}
		</h1>
		{#if readingTime}
			<div class="text-sm text-slate-600 dark:text-gray-300">{readingTime}</div>
		{/if}
		{#if excerpt}
			<p class="mt-5 text-base text-justify">
				{excerpt}
			</p>
		{/if}
	</div>
	<div class="" slot="footer">
		{#if tags?.length}
			<div class="flex items-center gap-5 flex-wrap">
				{#each tags as tag}
					<Tag>{tag}</Tag>
				{/each}
			</div>
		{/if}
	</div>
</Card>