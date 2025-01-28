<script lang="ts">
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	export let portableText;
	
    // Find whether the current URL is local host or staging
	let isLocalOrStaging = $page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');

    const dataset = process.env.NODE_ENV === "development" || isLocalOrStaging ? "development" : "production"

	const urlStem = `https://cdn.sanity.io/images/g2pdrwyj/${dataset}/`;

	$: image = portableText?.value;
	$: ref = image?.image?.asset?._ref;
	$: parts = ref?.split('-');

	$: imageUrl = urlStem + `${parts[1]}-${parts[2]}.${parts[3]}`;

	afterUpdate(() => {
		isLocalOrStaging =  $page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');
	});
</script>

<br />
<div class="flex flex-col items-center py-2">
	<slot name="image"><img src={imageUrl + '?fit=max'} alt={image.alt} /></slot>
</div>
{#if image?.caption}
	<slot name="caption"><p class="pb-8 text-center text-xs md:text-sm text-gray-800 dark:text-slate-100 mx-[5%]">{image?.caption}</p></slot>
{/if}
