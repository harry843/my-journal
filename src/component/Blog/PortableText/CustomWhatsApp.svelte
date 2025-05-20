<script lang="ts">
	export let portableText;
	$: rawMessages = portableText?.value?.messages || [];

	// Define a colour palette for participants
	const nameColors = [
		'text-blue-700 dark:text-cyan-300',
		'text-purple-700 dark:text-purple-300',
		'text-pink-700 dark:text-pink-300',
		'text-yellow-700 dark:text-yellow-400',
		'text-red-700 dark:text-red-400',
		'text-orange-700 dark:text-orange-400',
		'text-teal-700 dark:text-teal-300',
		'text-cyan-700 dark:text-cyan-300'
	];

	// Step 1: Generate name -> colour mapping
	$: uniqueNames = [...new Set(rawMessages.filter(msg => !msg.self).map(msg => msg.name))];
	$: nameColorMap = new Map(uniqueNames.map((name, index) => [name, nameColors[index % nameColors.length]]));

	// Step 2: Preprocess messages
	$: messages = rawMessages.map((msg, index) => {
		const prevMsg = rawMessages[index - 1];
		const nextMsg = rawMessages[index + 1];

		const firstOfGroup = index === 0 || msg.self !== prevMsg?.self || msg.name !== prevMsg?.name;
		const lastOfGroup = index === rawMessages.length - 1 || msg.self !== nextMsg?.self || msg.name !== nextMsg?.name;

		return { ...msg, firstOfGroup, lastOfGroup };
	});

	function getBubbleClasses(msg) {
	return `
		relative max-w-[80%] py-1.5 px-2.5 rounded-lg shadow-sm flex flex-col
		${msg.self
			? `bg-[#dcf8c6] dark:bg-emerald-800 ${msg.firstOfGroup ? 'rounded-tr-none after:right-[-14px] after:border-l-[#dcf8c6] after:dark:border-l-emerald-800 after:border-r-transparent after:translate-x-[10px]' : ''}`
			: `bg-white dark:bg-gray-800 ${msg.firstOfGroup ? 'rounded-tl-none after:left-[-24px] after:border-r-white after:dark:border-r-gray-800 after:border-l-transparent' : ''}`
		}
		${msg.firstOfGroup ? 'after:absolute after:top-0 after:border-[12px] after:border-transparent after:content-[""] after:border-t-0' : ''}
	`.trim().replace(/\s+/g, ' ');
}

</script>

<!-- Background wrapper -->
<div
	class="relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden pt-3.5 my-6"
	style="background-image: url('whatsapp-background.jpg');"
>
	<!-- Optional: Dark mode overlay -->
	<div class="absolute inset-0 dark:bg-black/80 pointer-events-none" />

	<!-- Chat container -->
	<div class="relative px-2 py-2 xl:py-4 max-w-2xl mx-[2%] xl:mx-auto font-sans">
		{#each messages as msg (msg._key)}
			<div
				class="flex {msg.self ? 'justify-end' : 'justify-start'} 
					{msg.lastOfGroup ? 'mb-4' : 'mb-1'}"
			>
				<div class={getBubbleClasses(msg)}>
					{#if msg.firstOfGroup}
						<div
							class={`text-sm font-semibold mb-1 ${
								msg.self
									? 'text-emerald-700 dark:text-emerald-50'
									: nameColorMap.get(msg.name) ?? 'text-blue-700 dark:text-cyan-300'
							}`}
						>
							{msg.name}
						</div>
					{/if}
					<div class="text-base mb-1 dark:text-slate-50">{msg.message}</div>
					<div class="text-xs text-right text-gray-600 dark:text-gray-300">{msg.timestamp}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
