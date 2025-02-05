export default function averageReadingTime(array: any[], language: string): string {
	let totalCharacters = 0;
	const averageCharactersInWord = 6;
	const averageWordsPerMinute = 238;

	array.forEach((item) => {
		if (Array.isArray(item.children)) {
			item.children.forEach((child: { text: string }) => {
				if (typeof child.text === "string") {
					totalCharacters += child.text.length;
				}
			});
		}
		if (typeof item.text === "string") {
			totalCharacters += item.text.length;
		}
		if (typeof item.caption === "string") {
			totalCharacters += item.caption.length;
		}
	});

	const readingTime = Math.max(1, Math.round(totalCharacters / averageCharactersInWord / averageWordsPerMinute));

	if (language === "es") {
		return `Tiempo de lectura: ${readingTime} min`;
	}
	return `${readingTime} min read`;
}
