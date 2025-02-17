<script lang="ts">
	import { isAuthenticated } from '../../../stores/stores';
import Moon from '../../Icons/Moon.svelte';
	import Sun from '../../Icons/Sun.svelte';
	import LanguageDropdown from '../LanguageDropdown/LanguageDropdown.svelte';
	import SubscribeButton from '../SubscribeButton/SubscribeButton.svelte';
	export let darkMode;
	export let handleSwitchDarkMode;
	export let width;
</script>

<ul class="flex rounded-lg space-x-3 dark:bg-gray-900 dark:border-gray-700">
	{#if $isAuthenticated}
	<SubscribeButton {width} />
	{/if}
	<LanguageDropdown />

	<label class="relative flex items-center justify-center cursor-pointer">
		<input
			type="checkbox"
			checked={darkMode}
			value=""
			class="sr-only peer"
			on:change={handleSwitchDarkMode}
		/>

		<div class="ms-2">
			{#if darkMode}
				<Moon />
			{:else}
				<Sun />
			{/if}
		</div>
	</label>
</ul>
