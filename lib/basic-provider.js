'use babel';

// data source is a simple array of strings
import suggestions from '../data/basic';

class BasicProvider {
	constructor() {
		// offer suggestions when editing aoz files
		this.selector = '.source.aoz-pb';
		this.disableForSelector = '.source.aoz-pb .comment, .source.aoz-pb .string';
	}

	getSuggestions(options) {
		const { prefix } = options;
		// only look for suggestions after 3 characters have been typed
		if (prefix.length >= 3) {
			return this.findMatchingSuggestions(prefix);
	  }
	}

	findMatchingSuggestions(prefix) {
		let prefixLower = prefix.toLowerCase().replace(/\s+/g, '');

		let matchingWords = suggestions.filter((suggestion) => {
			suggestionNoSpace = suggestion.replace(/\s+/g, '').toLowerCase();
			if (suggestionNoSpace.indexOf(prefixLower) !== -1) {
				return suggestion.toLowerCase();
			}
		});

		// Sort the array
		matchingWords.sort();

		// convert the array of words into an array of objects with a text property
		let matchingSuggestions = matchingWords.map((word) => {
			return { text: word.replace(/\b[a-z]/g, match => match.toUpperCase()) };
		});

		return matchingSuggestions;
	}
}
export default new BasicProvider();
