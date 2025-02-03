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

	// Function to fetch translation slugs based on the original slug
	const getTranslationSlugs = async (slug) => {
		const query = `*[_type == "personal" && translationMetadata._ref == *[_type == "personal" && slug.current == $slug][0].translationMetadata._ref]{
      "slug": slug.current,
      language
    }`;
		try {
			const result = await client.fetch(query, { slug });
			return result;
		} catch (error) {
			console.error('Error fetching translation slugs:', error);
			return [];
		}
	};

	// Fetch blog post data based on the given slug
	const query = `*[_type == 'personal' && slug.current == $slug] {
    _createdAt, _updatedAt, title, "slug":slug.current, 
    "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, "imageAlt":mainImage.alt, 
    feature, tags, content
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

	// Fetch translations slugs for the current blog post
	const translationSlugs = await getTranslationSlugs(params.slug);

	// Return the blog data along with translation slugs
	return {
		blog: sanityData,
		slugs: translationSlugs
	};
}
