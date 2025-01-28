import {
	GOOGLE_APPLICATION_CREDENTIALS,
	propertyId,
	startDate,
	dimensionName,
	metricName
} from '$env/static/private';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Function to flag matching substrings
function flagMatchingSubstrings(lst) {
    const matches = [];

    lst.forEach((elem, i) => {
        if (elem.startsWith('/blog/')) {
            lst.forEach((otherElem, j) => {
                if (i !== j && otherElem.includes(elem)) {
                    matches.push({ url: elem, index: i }, { url: otherElem, index: j });
                }
            });
        } 
    });

    return matches;
}

/** @type {import('./$types').PageServerLoad} */
// export async function load() {
// 	const analyticsDataClient = new BetaAnalyticsDataClient({
// 		keyFilename: GOOGLE_APPLICATION_CREDENTIALS
// 	});
// 	const [response] = await analyticsDataClient.runReport({
// 		property: `properties/${propertyId}`,
// 		dateRanges: [
// 			{
// 				startDate: startDate,
// 				endDate: 'today'
// 			}
// 		],
// 		dimensions: [
// 			{
// 				name: dimensionName
// 			}
// 		],
// 		metrics: [
// 			{
// 				name: metricName
// 			}
// 		]
// 	});

// 	let reads = 0;
// 	response.rows.forEach((row) => {
// 		if (row.dimensionValues[0].value.startsWith(`/blog/`)) {
// 			reads += parseInt(row.metricValues[0].value);
// 		}
// 	});
// 	console.log("Reads:",reads)
// 	return { "reads" : reads };
// }