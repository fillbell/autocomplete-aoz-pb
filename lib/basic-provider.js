'use babel';

// data source is a simple array of strings
import suggestions from '../data/basic';

class BasicProvider {
	constructor() {
		// offer suggestions when editing any file type
		this.selector = '.source.aoz-pb';
	}

	getSuggestions(options) {
		const { prefix } = options;
		if (prefix.length >= 3) {
			return this.findMatchingSuggestions(prefix);
	  }
	}

	findMatchingSuggestions(prefix) {

		let prefixLower = prefix.toLowerCase();

		// filter list of words to those with a matching prefix
		let matchingWords = suggestions.filter((suggestion) => {
			let textLower = suggestion.toLowerCase();
			return textLower.includes(prefixLower);
		});

		// convert the array of words into an array of objects with a text property
		let matchingSuggestions = matchingWords.map((word) => {
			return { text: word.replace(/\b[a-z]/g, match => match.toUpperCase()) };
		});

		return matchingSuggestions;
	}
}
export default new BasicProvider();
