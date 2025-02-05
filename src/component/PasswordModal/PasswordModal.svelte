<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_APP_PASSWORD } from '$env/static/public';
	import { isAuthenticated, currentLanguage } from '../../stores/stores';

	let passwordInput = '';
	let isCheckingAuth = true;
	let showPassword = false;
    $: passwordText = $currentLanguage === 'es' ? 'Contraseña incorrecta. Inténtelo de nuevo.' : 'Incorrect password. Try again.'

	// Check localStorage for authentication status
	onMount(() => {
		if (browser) {
			const storedAuth = localStorage.getItem('authenticated') === 'true';
			isAuthenticated.set(storedAuth);
			isCheckingAuth = false;
		}
	});

	function checkPassword() {
		if (passwordInput === PUBLIC_APP_PASSWORD) {
			isAuthenticated.set(true);
			localStorage.setItem('authenticated', 'true');
		} else {
			alert(passwordText);
			passwordInput = '';
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			checkPassword();
		}
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

{#if !isCheckingAuth && !$isAuthenticated}
	<div class="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
		<div class="bg-white p-6 rounded-lg shadow-xl text-center w-80">
			<h2 class="text-lg font-bold mb-4">{$currentLanguage === 'es' ? "Introduzca la contraseña" : "Enter Password"}</h2>
			<div class="relative w-full">
				<!-- Separate inputs to avoid dynamic type binding issue -->
				{#if showPassword}
					<input
						type="text"
						bind:value={passwordInput}
						class="w-full p-2 border rounded mb-4 pr-10"
						placeholder="Enter password"
						on:keydown={handleKeyDown}
					/>
				{:else}
					<input
						type="password"
						bind:value={passwordInput}
						class="w-full p-2 border rounded mb-4 pr-10"
						placeholder={$currentLanguage === 'es' ? "Introduzca la contraseña" : "Enter password"}
						on:keydown={handleKeyDown}
					/>
				{/if}
				<!-- Eye Icon Button -->
				<button
					type="button"
					class="absolute right-3 top-3.5 text-gray-600"
					on:click={togglePasswordVisibility}
				>
					{#if showPassword}
						<svg
							class="h-4 w-4 fill-gray-900"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
							/>
							<path
								d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
							/>
							<path
								d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
							/>
						</svg>
					{:else}
						<svg
							class="h-4 w-4 fill-gray-900"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							enable-background="new 0 0 512 512"
						>
							<g>
								<path
									d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"
								/>
							</g>
						</svg>
					{/if}
				</button>
			</div>
			<button
				on:click={checkPassword}
				class="bg-indigo-600 text-white font-semibold px-4 py-2 rounded w-full"
			>
            {$currentLanguage === 'es' ? "Enviar" : "Submit"}
			</button>
		</div>
	</div>
{/if}
