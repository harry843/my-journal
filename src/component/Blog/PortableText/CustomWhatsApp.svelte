<script lang="ts">
	export let portableText;
	$: messages = portableText?.value?.messages || [];

	function getBubbleClasses(msg) {
		return `
			relative max-w-[80%] p-3 rounded-2xl shadow-sm flex flex-col
			${
				msg.self
					? 'bg-[#dcf8c6] dark:bg-emerald-800 rounded-tr-none after:right-[-14px] after:border-l-[#dcf8c6] after:dark:border-l-emerald-800 after:border-r-transparent after:translate-x-[7px] '
					: 'bg-white dark:bg-gray-800 rounded-tl-none after:left-[-22px] after:border-r-white after:dark:border-r-gray-800 after:border-l-transparent'
			}
			after:absolute after:top-0 after:border-[12px] after:border-transparent after:content-[""] after:border-t-0
		`;
	}
</script>

<!-- Background wrapper -->
<div
	class="relative bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden my-6"
	style="background-image: url('whatsapp-background.jpg');"
>
	<!-- Optional: Dark mode overlay -->
	<div class="absolute inset-0 dark:bg-black/80 pointer-events-none" />

	<!-- Chat container -->
	<div class="relative p-4 space-y-3 max-w-2xl mx-auto font-sans">
		{#each messages as msg (msg._key)}
			<div class="flex {msg.self ? 'justify-end' : 'justify-start'}">
				<div class={getBubbleClasses(msg)}>
					<div
						class={`text-sm font-semibold mb-1 ${
							msg.self ? 'text-emerald-700 dark:text-emerald-50' : 'text-blue-700 dark:text-indigo-100'
						} dark:text-white`}
					>
						{msg.name}
					</div>
					<div class="text-base mb-1 dark:text-gray-100">{msg.message}</div>
					<div class="text-xs text-right text-gray-600 dark:text-gray-300">{msg.timestamp}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
