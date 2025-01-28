export default function averageReadingTime(array: JSON) {
	let totalCharacters = 0;
	// Average Characters per Word including spaces and punctuation
	const averageCharactersInWord = 6;
	const averageWordsPerMinute = 238;

	array.forEach((item) => {
		if (item.children) {
			item.children.forEach((child: { text: string | any[] }) => {
				totalCharacters += child.text.length;
			});
		} else if (item.text) {
			totalCharacters += item.text.length;
		} else if (item.caption) {
			totalCharacters += item.caption.length;
		}
	});

	if (Math.round(totalCharacters / averageCharactersInWord / averageWordsPerMinute) === 0) {
		return '1 min read';
	}

	return `${Math.round(
		totalCharacters / averageCharactersInWord / averageWordsPerMinute
	)} min read`;
}
