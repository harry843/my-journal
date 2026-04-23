import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, url }) => {
	const isLocal =
		url.hostname === 'localhost' || url.hostname === '127.0.0.1';

	// Allow manual override via query param (great for testing)
	let country = url.searchParams.get('country')?.toUpperCase();

	// If no override, try Vercel header (production only)
	if (!country) {
		country = request.headers.get('x-vercel-ip-country') || undefined;
	}

	// Final fallback for local dev
	if (!country && isLocal) {
		country = 'ES'; // 👈 change this to test different defaults
	}

	// Absolute fallback
	if (!country) {
		country = 'US';
	}

	const spanishSpeakingCountries = [
		'AR','BO','CL','CO','CR','CU','DO','EC','SV','GQ',
		'GT','HN','MX','NI','PA','PY','PE','ES','UY','VE'
	];

	const language = spanishSpeakingCountries.includes(country) ? 'es' : 'en';

	return {
		country,
		language
	};
};