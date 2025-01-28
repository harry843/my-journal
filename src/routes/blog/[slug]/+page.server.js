import {
    GOOGLE_APPLICATION_CREDENTIALS,
    propertyId,
    startDate,
    dimensionName,
    metricName
} from '$env/static/private';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { formatTooltipValue } from '../../portfolio/sankey/utils';
import { createClient } from '@sanity/client';
import { slugData } from '../../../stores/stores';
import genImageUrl from '../../../component/Sanity/utils/genImageUrl';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
    // Google Analytics Client Setup
    const analyticsDataClient = new BetaAnalyticsDataClient({
        credentials: JSON.parse(GOOGLE_APPLICATION_CREDENTIALS)
    });
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: startDate,
                endDate: 'today'
            }
        ],
        dimensions: [
            {
                name: dimensionName
            }
        ],
        metrics: [
            {
                name: metricName
            }
        ]
    });

    // Calculate reads
    let reads = 0;
    response.rows.forEach((row) => {
        if (row.dimensionValues[0].value.startsWith(`/blog/${params.slug}`)) {
            reads += parseInt(row.metricValues[0].value);
        }
    });

    // Sanity Client Setup
    let isLocalOrStaging = url.href.includes('localhost') || url.href.includes('staging.harrykelleher.com');
    const dataset = process.env.NODE_ENV === "development" || isLocalOrStaging ? "development" : "production";

    const client = createClient({
        projectId: 'g2pdrwyj',
        dataset: dataset,
        useCdn: true,
        apiVersion: '2024-02-04'
    });

    // Define your query
    const query = `
	*[_type == 'post' && slug.current == '${params.slug}'] {
		_createdAt, _updatedAt, title, "slug":slug.current, "imageUrl":mainImage.image.asset._ref, "imageCaption":mainImage.caption, "imageAlt":mainImage.alt, feature, tags, content
	}
  `;

  let sanityData;
  slugData.subscribe((value) => {
	  sanityData = value[params.slug];
  });

  if (!sanityData) {
	  sanityData = await client.fetch(query);
	  slugData.update((store) => {
		  store[params.slug] = sanityData;
		  return store;
	  });
  }

    // // Extract the image URL from the data as needed
    // const imageUrl = sanityData.length > 0 ? sanityData[0].yourImageFieldUrl : '';

    return {
        reads: formatTooltipValue(reads),
        blog: sanityData
    };
}
