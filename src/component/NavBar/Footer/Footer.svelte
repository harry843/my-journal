<script>
	import { currentLanguage } from '../../../stores/stores';
</script>

<footer class="rounded-lg shadow-sm dark:bg-gray-900 px-4 py-2">
	<div class="w-full max-w-screen-xl mx-auto px-4 py-2 md:py-4">
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
			>© {new Date().getFullYear()} <a href="/" class="hover:underline">Harry Kelleher™</a>. {$currentLanguage ===
			'es'
				? 'Todos los derechos reservados'
				: 'All Rights Reserved'}.</span
		>
	</div>
</footer>
