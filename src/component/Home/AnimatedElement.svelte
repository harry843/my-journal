<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
    // import SloganAnimation from './SloganAnimation.svelte'
	export let text: string = "";
	export let slogans = [];
	export let rootMargin = '-20%';
	export let delay = 125;
	export let duration = 600;

	function selectRandomSlogan(slogans) {
    if (slogans.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * slogans.length);
	console.log(randomIndex)
    return slogans[randomIndex];
}
	console.log(slogans.length)
	let isInView;
</script>

<div
	use:inview={{ unobserveOnEnter: true, rootMargin: rootMargin }}
	on:change={({ detail }) => {
		isInView = detail.inView;
	}}
>
	{#if isInView && text != ""}
		<div class="inline" in:fade={{ delay: delay, duration: duration }}>
			{text}
		</div>
	{:else if isInView && slogans.length > 0}
  <div class="inline" in:fade={{ delay: delay, duration: duration }}>
    <h3>{selectRandomSlogan(slogans)}</h3>
  </div>
  {/if}
</div>