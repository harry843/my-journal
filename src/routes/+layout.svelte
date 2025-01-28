<script lang="ts">
	import '../app.css';
	import NavBar from '../component/NavBar/NavBar.svelte';
	import Analytics from '../component/Analytics/Analytics.svelte';
	import { navigating } from '$app/stores';
	import { userHasNavigated } from '../stores/stores';
	$: outerWidth = 0;

	const onRouteChange = async () => {
		userHasNavigated.update(() => {
			return true;
		});
	};

	$: if ($navigating) onRouteChange();
</script>

<svelte:window bind:outerWidth />

<Analytics />

<NavBar />

<section
	class="px-2 xs:px-4 md:px-16 lg:px-32 xl:px-44 2xl:px-56 pt-20 py-4 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 dark:text-white"
>
	<slot />
</section>
