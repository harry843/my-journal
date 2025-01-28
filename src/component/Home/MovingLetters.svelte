<script lang="ts">
	import { onMount } from 'svelte';

	export let text;

	onMount(() => {
		// Ensure anime.js is loaded
		const animeScript = document.createElement('script');
		animeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js';
		animeScript.onload = () => {
			// Wrap every letter in a span
			const textWrapper = document.querySelector('.letters');
			textWrapper.innerHTML = textWrapper.textContent.replace(
				/([^\x00-\x80]|\w)/g,
				"<span class='inline-block leading-none letter'>$&</span>"
			);

			const ml11 = document.querySelector('.ml11');
			const letter = document.querySelector('.letter');

			anime
				.timeline({ loop: false })
				.add({
					targets: '.line',
					scaleY: [0, 1],
					opacity: [0.5, 1],
					easing: 'easeOutExpo',
					duration: 700,
					begin: () => {
						ml11.style.opacity = '1';
					}
				})
				.add({
					targets: '.line',
					translateX: [0, textWrapper.getBoundingClientRect().width + 17],
					easing: 'easeOutExpo',
					duration: 800,
					delay: 250
				})
				.add({
					targets: '.letter',
					opacity: [0, 1],
					easing: 'easeOutExpo',
					duration: 900,
					offset: '-=790',
					begin: () => {
						letter.style.opacity = '1';
					},
					delay: (el, i) => 22 * (i + 1)
				})
				.add({
					targets: '.line',
					opacity: [1, 0],
					easing: 'easeOutExpo',
					duration: 750
				});
		};
		document.head.appendChild(animeScript);
	});
</script>

<h1 class="font-bold text-xl md:text-2xl ml11">
	<span class="relative inline-block pt-1 pr-0.5 pb-1.5">
		<span class="absolute top-0 left-0 h-full w-[2px] bg-slate-600 transform origin-left line" />
		<span class="letters">{text}</span>
	</span>
</h1>

<style>
	.ml11 {
		opacity: 0;
	}
	.letter {
		display: inline-block;
	}
</style>
