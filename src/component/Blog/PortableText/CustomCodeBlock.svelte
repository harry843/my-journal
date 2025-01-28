<script lang="ts">
	import Tick from '../../Icons/Tick.svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-sql.js';
	import 'prismjs/components/prism-python.js';
	import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
	import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
	import { onMount } from 'svelte';
	import copyToClipboard from '../utils/copyToClipboard';
	import countNumberofLines from '../utils/countNumberofLines';
	import CopyToClipboard from '../../Icons/CopyToClipboard.svelte';

	export let portableText;

	$: isCopied = false;
	$: onClick = false

	$: expandCodeCss = onClick ? "overflow-hidden" : "overflow-hidden max-h-72"
	$: expandButtonText = onClick ? "Contract code" : "Expand code"

	function setIsCopied() {
		isCopied = true;
		setTimeout(() => (isCopied = false), 1800);
	}

	function expandCode() {
		onClick = !onClick
	}

	onMount(() => {
		Prism.highlightAll();
	});

</script>

<div
	class="border dark:border-slate-600 shadow-lg dark:shadow-none bg-gray-50 dark:bg-slate-900 dark:bg-accent-5/25 px-3 pb-3 pt-1 rounded-xl my-6"
>
	<div class="flex justify-between border-b dark:border-0 p-1 pb-1.5">
		<div class="flex gap-x-1 md:gap-x-3">
			{#if portableText.value.language !== 'batchfile'}
				<div
					class="bg-indigo-50 text-indigo-700 dark:bg-sky-300 dark:text-gray-900 rounded-md text-sm md:text-base font-medium py-0.5 px-1 sm:px-2 pr-1 first-line:xxs:pr-2 border dark:border-slate-500"
				>
					{portableText.value.language === 'mysql' ? 'SQL' : (portableText.value.language).toUpperCase()}
				</div>
			{/if}
			{#if portableText.value.filename}
				<div
					class=" pl-1 xxs:pl-2 text-[0.7rem] md:text-sm text-gray-700 dark:text-slate-200 flex items-center justify-center"
				>
					{portableText.value.filename}
				</div>
			{/if}
		</div>

		<button
			type="button"
			class="bg-accent-solid-white dark:bg-slate-800 border border-gray-200 dark:border-slate-500 rounded-md hover:fill-indigo-600 hover:text-indigo-700 hover:border-indigo-200 dark:hover:border-gray-200 dark:text-gray-300 dark:hover:text-white p-0.5 dark:fill-gray-300 dark:hover:fill-white"
			on:click={async () => {
				await copyToClipboard(portableText.value.code);
				setIsCopied();
			}}
			on:keydown={async () => {
				await copyToClipboard(portableText.value.code);
				setIsCopied();
			}}
		>
			{#if isCopied}
				<span class="flex flex-row text-[0.7rem] md:text-sm items-center gap-x-1 pr-1"
					><Tick />Copied</span
				>
			{:else}
				<span class="flex flex-row text-[0.7rem] md:text-sm items-center gap-x-1 pr-1"
					><CopyToClipboard />Copy</span
				>
			{/if}
		</button>
	</div>
	<div class="relative">
	<div
		class="{expandCodeCss} text-sm bg-gray-100 shadow dark:bg-accent-5/50 rounded-lg"
	>
		<pre class="line-numbers"><code
				class="language-{portableText.value.language === 'mysql'
					? 'sql'
					: portableText.value.language}">{portableText.value.code}</code
			></pre>
		{#if countNumberofLines(portableText.value.code) > 12}
			<button on:click={expandCode} type="button" class="absolute bottom-0 left-0 py-2 px-5 w-full text-sm font-medium text-gray-900 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 hover:text-indigo-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{expandButtonText}</button>
		{/if}
	</div>
</div>
</div>
