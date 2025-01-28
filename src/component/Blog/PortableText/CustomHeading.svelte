<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import handleAnchorClick from '../utils/handleAnchorClick';
	export let portableText: BlockComponentProps;

	const headers = portableText.value.style;
	const precededByHeading = headers ? ['h1', 'h2', 'h3'].includes(headers) : undefined;

	$: anchorId = headers ? `section-${portableText.value._key}` : undefined;

</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-10 mb-6' : 'mt-2'}" id={anchorId}>
	{#if portableText.value.style === 'h1'}
		<h1 class="text-4xl pb-6"><slot /></h1>
	{:else if portableText.value.style === 'h2'}
		<h2 class="text-3xl"><slot /></h2>
	{:else if portableText.value.style === 'h3'}
		<h3 class="text-xl xl:text-2xl font-bold">
			<slot />
			<a href="#{anchorId}" aria-hidden="true"
			tabIndex={-1}
			on:click={handleAnchorClick}>
				<span class="sr-only">Link to this heading</span>
					🔗
			</a>
		</h3>
	{:else if portableText.value.style === 'h4'}
		<h4 class="text-xl font-medium text-gray-600 pt-6"><slot /></h4>
	{:else}
		<br />
		<h5 class="text-xl font-medium"><slot /></h5>
		<br />
	{/if}
</div>
