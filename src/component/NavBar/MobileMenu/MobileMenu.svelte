<script lang="ts">
	import Moon from '../../Icons/Moon.svelte';
	import Sun from '../../Icons/Sun.svelte';
	import LanguageDropdown from '../LanguageDropdown/LanguageDropdown.svelte';
	export let darkMode;
	export let handleSwitchDarkMode;
</script>

<ul
	class="flex rounded-lg bg-gray-50 space-x-4 dark:bg-gray-900  dark:border-gray-700"
>
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
