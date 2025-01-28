<script lang="ts">
	export let additionalClass: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let index: number | undefined = undefined;
	const isExternalLink = !!href && /^((http|https):\/\/)/.test(href);
	export let target: '_self' | '_blank' = isExternalLink ? '_blank' : '_self';
	export let rel = isExternalLink ? 'noopener noreferrer' : undefined;

	$: tag = href ? 'a' : 'article';
	$: linkProps = {
		href,
		target,
		rel
	};
</script>

<svelte:element
	this={tag}
	class="rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-400 relative w-full hover:shadow-lg dark:hover:scale-[1.02] dark:hover:ease-in dark:hover:duration-200 dark:hover:delay-75 {additionalClass}"
	{...linkProps}
	data-sveltekit-preload-data
	{...$$restProps}
>		
<div class={index === 0 ? "grid grid-cols-1 place-items-center lg:grid-cols-2 lg:gap-x-3 p-1 md:p-3" : "p-1 md:p-3"}>
{#if $$slots.image}
			<div class={index === 0 ? "max-w-lg md:max-w-2xl" : "grid grid-cols-1 place-items-center"} >
				<slot name="image" />
			</div>
		{/if}
	<div class="flex flex-col justify-between gap-10 px-2 lg:px-3 xl:px-6 py-6 flex-1/2">

		<div class="flex flex-col flex-1">
			<slot name="content" />
		</div>
		{#if $$slots.footer}
			<div class="">
				<slot name="footer" />
			</div>
		{/if}
	</div>
</div>

</svelte:element>