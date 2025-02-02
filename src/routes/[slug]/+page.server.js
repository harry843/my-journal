import { createClient } from '@sanity/client';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
	// Sanity Client Setup
	let isLocalOrStaging =
		url.href.includes('localhost') || url.href.includes('staging.harrykelleher.com');
	const dataset =
		process.env.NODE_ENV === 'development' || isLocalOrStaging ? 'development' : 'production';

	const client = createClient({
		projectId: 'g2pdrwyj',
		dataset: dataset,
		useCdn: true,
		apiVersion: '2024-02-04'
	});

	const query = `*[_type == 'personal' && slug.current == $slug] {
        _createdAt, _updatedAt, title, "slug":slug.current, 
        "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, 
        "imageAlt":mainImage.alt, feature, tags, content
    }`;

	let sanityData = null;
	try {
		sanityData = await client.fetch(query, { slug: params.slug });
		if (!sanityData || sanityData.length === 0) {
			console.warn('Sanity returned no data for slug:', params.slug);
		}
	} catch (error) {
		console.error('Sanity API error:', error);
		return { blog: [] };
	}

	return {
		blog: sanityData
	};
}
