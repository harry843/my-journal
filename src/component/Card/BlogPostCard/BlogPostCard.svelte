<script lang="ts">
	import Card from '../Card.svelte';
	import Tag from '../../Tag/Tag.svelte';
	import Eye from '../../Icons/Eye.svelte';

	export let title: string | null = null;
	export let coverImage: string | undefined = undefined;
	export let altText: string | null | undefined = undefined;
	export let excerpt: string | null = null;
	export let slug: string;
	export let tags: (string | null)[] | null | undefined = null;
	export let readingTime: string | null = null;
	export let additionalClass: string | undefined = undefined;
	export let index: number | undefined = undefined;
</script>

<Card href="/{slug}" target="_self" {additionalClass} {index}>
	<div class="" slot="image">
		<img class={index === 0 ? 'items-center' : 'max-h-[300px] '} src={coverImage} alt={altText} />
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

<!-- <style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 0px;
		align-items: flex-start;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 1.2rem;
		font-family: var(--font--title);
		font-weight: 700;
	}

	.tags {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-wrap: wrap;
	}

	.note {
		font-size: 0.8rem;
		color: rgba(var(--color--text-rgb), 0.8);
	}

	.text {
		margin-top: 5px;
		font-size: 0.9rem;
		text-align: justify;
	}

	.footer {
		margin-top: 20px;
	}

	:global(.blog-post-card .image img) {
		object-fit: cover;
	}

	:global(.blog-post-card.no-image > .image) {
		display: none;
	}
</style> -->
