<script lang="ts">
	import { PortableText } from "@portabletext/svelte";
	import BlockQuote from "./BlockQuote.svelte";
	import CustomBullet from "./CustomBullet.svelte";
	import CustomCodeBlock from "./CustomCodeBlock.svelte";
	import CustomHeading from "./CustomHeading.svelte";
	import CustomIFrame from "./CustomIFrame.svelte";
	import CustomImage from "./CustomImage.svelte";
	import CustomLineBreak from "./CustomLineBreak.svelte";
	import CustomListItem from "./CustomListItem.svelte";
	import CustomOrderedList from "./CustomOrderedList.svelte";
	import CustomOrderedListItem from "./CustomOrderedListItem.svelte";
	import CustomParagraph from "./CustomParagraph.svelte";
	import CustomUrl from "./CustomURL.svelte";
	import CustomWhatsApp from "./CustomWhatsApp.svelte";
	import InstagramStory from "./InstagramStory.svelte";

	export let portableText;
	$: quote = portableText?.value
	$: blockquoteOnlyTextSize = quote.author === undefined ? 'text-base' : 'text-base md:text-lg'
</script>
<br>
<figure
	class="{blockquoteOnlyTextSize} font-customParagraph font-thin bg-gray-100 border-l-8 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 m-0 py-3 px-10"
>
	<blockquote>
		<PortableText
					components={{
						types: {
							imageWithAlt: CustomImage,
							iframe: CustomIFrame,
							code: CustomCodeBlock,
							whatsapp: CustomWhatsApp,
							break: CustomLineBreak,
							instagramStory : InstagramStory
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
					value={portableText.value.text}
					onMissingComponent={false}
				/>
	</blockquote>

	{#if quote.author !== undefined}
	<figcaption class="text-right not-italic text-sm md:text-base pt-2 dark:text-white">
		<slot name="author">{quote.author}</slot>
	</figcaption>
	{/if}
</figure>
<br>
