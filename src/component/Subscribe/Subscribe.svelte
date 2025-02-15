<script lang="ts">
	import { currentLanguage, languages } from '../../stores/stores';

    let isOpen = false;

	const ariaLabel =
		$currentLanguage === 'es' ? 'Suscríbete a mi boletín' : 'Subscribe to my newsletter';
	const subscribeHeader =
		$currentLanguage === 'es'
			? 'Reflexiones ligeramente entretenidas, directamente para ti'
			: 'Mildly entertaining musings, straight to you';
	const subscribeText =
		$currentLanguage === 'es'
			? 'Recibe mis últimas anécdotas directamente en tu buzón de entrada: nada de spam, sólo historias frescas en cuanto se publican. ¡Suscríbete abajo!'
			: 'Get my latest anecdotes delivered straight to your inbox — no spam, just fresh stories as soon as they’re published. Subscribe below!';
	const unsubscribeText =
		$currentLanguage === 'es'
			? 'Pueded darte de baja en cualquier momento. Desarrollado por'
			: 'You can unsubscribe at any time. Powered by';

	$: defaultLanguage = $currentLanguage === 'es' ? 'Español' : 'English';

    function selectLanguage(lang) {
		currentLanguage.set(lang);
	}
</script>

<aside
	class="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
	aria-label={ariaLabel}
>
	<h3 class="mb-3 text-2xl font-medium text-gray-900 dark:text-white">
		{subscribeHeader}
	</h3>
	<p class="mb-5 text-base font-medium text-gray-500 dark:text-gray-300">
		{subscribeText}
	</p>

	<form
		action="https://buttondown.com/api/emails/embed-subscribe/harrys-journal"
		method="post"
		target="popupwindow"
		onsubmit="window.open('https://buttondown.com/harrys-journal', 'popupwindow')"
		class="embeddable-buttondown-form flex flex-col items-start w-full max-w-md"
	>
		<div class="flex flex-col xs:flex-row items-start justify-start gap-x-1">
			<div class="relative min-w-[235px] xxs:min-w-[300px] lg:min-w-[350px] mb-3 flex flex-col gap-y-2">
				<label
					class="flex flex-row items-center justify-between text-sm font-medium text-gray-900 dark:text-slate-50 md:py-0.5 lg:py-1 xl:py-1.5 2xl:py-2"
					>Preferred Language:
                    <select
                    bind:value={defaultLanguage}
                    name="metadata__language"
                    id="language"
                    class="px-2 py-1 md:min-w-[120px] text-gray-900 ml-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-28"
                >
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                </select>
				</label>

				<label
					for="bd-email"
					class="flex flex-row items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-300 md:py-0.5 lg:py-1 xl:py-1.5 2xl:py-2"
					>Email:
				<div class="absolute inset-y-0 left-12 flex items-center pl-3.5 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 16"
					>
						<path
							d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
						/>
						<path
							d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
						/>
					</svg>
				</div>

				<input
					id="bd-email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full xl:mb-1 pl-10 p-2.5 ml-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					type="email"
					name="email"
					placeholder={$currentLanguage === 'es'
						? 'Tu correo electrónico...'
						: 'Your email address...'}
					required
				/>
                </label
				>
                <button
				type="submit"
				value="Subscribe"
				class="px-5 py-3 translate-y-1 text-sm font-medium text-white bg-emerald-600 rounded-lg cursor-pointer hover:bg-emerald-700"
			>
				{$currentLanguage === 'es' ? 'Suscríbete' : 'Subscribe'}
			</button>
			</div>

			<!-- <button
				type="submit"
				value="Subscribe"
				class="px-5 py-3 text-sm font-medium text-white bg-emerald-600 rounded-lg cursor-pointer hover:bg-emerald-700"
			>
				{$currentLanguage === 'es' ? 'Suscríbete' : 'Subscribe'}
			</button> -->
		</div>
	</form>

	<p class="text-sm font-normal text-gray-500 dark:text-gray-300 mt-3">
		{unsubscribeText}
		<a
			class="text-[#00BFA5] underline underline-offset-2 hover:no-underline"
			href="https://buttondown.com/refer/harry-kelleher"
			target="_blank">Buttondown.</a
		>
	</p>
</aside>
