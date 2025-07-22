export function genVideoUrl(ref, dataset, urlParams = '') {
	const videoBaseUrl = `https://cdn.sanity.io/files/g2pdrwyj/${dataset}/`;
	const videoExtensions = ['mp4', 'webm', 'ogg'];
	const extension = ref.split('-').slice(-1)[0];
	const hasVideoExtension = videoExtensions.includes(extension);

	if (hasVideoExtension) {
		return videoBaseUrl + ref.replace('file-', '').replace(`-${extension}`, `.${extension}`) + urlParams;
	} else {
		return undefined;
	}
}