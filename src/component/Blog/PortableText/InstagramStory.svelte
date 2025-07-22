<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import CustomQuote from './CustomQuote.svelte';
	import CustomImage from './CustomImage.svelte';
	import CustomIFrame from './CustomIFrame.svelte';
	import CustomCodeBlock from './CustomCodeBlock.svelte';
	import BlockQuote from './BlockQuote.svelte';
	import CustomHeading from './CustomHeading.svelte';
	import CustomUrl from './CustomURL.svelte';
	import CustomListItem from './CustomListItem.svelte';
	import CustomOrderedListItem from './CustomOrderedListItem.svelte';
	import CustomBullet from './CustomBullet.svelte';
	import CustomOrderedList from './CustomOrderedList.svelte';
	import CustomAdmonitionParagraph from './CustomAdmonitionParagraph.svelte';
	import { onDestroy, onMount } from 'svelte';
	import genImageUrl from '../../Sanity/utils/genImageUrl';
	import { genVideoUrl } from '../../Sanity/utils/genVideoUrl';
	import { page } from '$app/stores';

	export let portableText;

	let isLocalOrStaging =
		$page.url.href.includes('localhost') || $page.url.href.includes('staging.harrykelleher.com');

	const dataset =
		process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';

	let videoEl: HTMLVideoElement | null = null;
	let observer: IntersectionObserver;
	let isPlaying = false;
	let isMuted = true;

	const handleClick = () => {
		if (!videoEl) return;

		videoEl.muted = false;
		isMuted = false;

		if (videoEl.paused) {
			videoEl.play();
			isPlaying = true;
		} else {
			videoEl.pause();
			isPlaying = false;
		}
	};

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (videoEl) {
						if (entry.isIntersecting) {
							videoEl.play().catch(() => {});
							isPlaying = true;
						} else {
							videoEl.pause();
							isPlaying = false;
						}
					}
				});
			},
			{
				threshold: 0.5
			}
		);

		if (videoEl) {
			observer.observe(videoEl);
		}
	});

	onDestroy(() => {
		if (videoEl && observer) {
			observer.unobserve(videoEl);
		}
	});
</script>

<div class="w-full max-w-sm mx-auto bg-white border border-slate-100 dark:border-none dark:bg-slate-950 rounded-3xl shadow-lg overflow-hidden md:max-w-md my-8">
	<div class="px-4 pt-4 pb-1 flex items-center space-x-3">
		<img
			src={genImageUrl(portableText?.value?.profileImage?.asset?._ref, dataset, '')}
			alt="Profile"
			class="w-6 h-6 rounded-full object-cover"
		/>
		<span class="text-sm font-semibold text-gray-800 dark:text-white">@{portableText.value.userHandle}</span>
	</div>

	<div class="px-4 pb-2 text-sm text-gray-700 dark:text-white">
		<PortableText
			components={{
				types: {
					quote: CustomQuote,
					imageWithAlt: CustomImage,
					iframe: CustomIFrame,
					code: CustomCodeBlock
				},
				block: {
					normal: CustomAdmonitionParagraph,
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
			value={portableText.value.postText}
			onMissingComponent={false}
		/>
	</div>

	<div
		class="w-full aspect-auto relative dark:bg-slate-950 bg-white px-0.5 pb-0.5"
		on:click={handleClick}
		on:keydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				handleClick();
			}
		}}
		aria-pressed={isPlaying}
		role="button"
		tabindex="0"
	>
		<video
			bind:this={videoEl}
			src={genVideoUrl(portableText.value.video.asset._ref, dataset, '')}
			class="w-full h-full object-cover"
			playsinline
			muted={isMuted}
			loop
			preload="metadata"
			controls={false}
		/>
	</div>
</div>

<style>
	video::-webkit-media-controls {
		display: none !important;
	}
</style>
