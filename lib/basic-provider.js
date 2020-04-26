'use babel';

// data source is a simple array of strings
import suggestions from '../data/basic';

class BasicProvider {
	constructor() {
		// offer suggestions when editing aoz files
		this.selector = '.source.aoz-pb';
		// disable for comments and strings
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

		// Get startsWith suggestions
		let matchingWordStart = suggestions.filter((suggestion) => {
			suggestionNoSpace = suggestion.replace(/\s+/g, '').toLowerCase();
			if (suggestionNoSpace.startsWith(prefixLower) == true) {
				return suggestion.toLowerCase();
			}
		});

		// Capitalise
		matchingWordStart = matchingWordStart.map((word) => {
			return word.replace(/\b[a-z]/g, match => match.toUpperCase());
		});

		// Get suggestions that contain the prefix
		let matchingWords = suggestions.filter((suggestion) => {
			suggestionNoSpace = suggestion.replace(/\s+/g, '').toLowerCase();
			if (suggestionNoSpace.indexOf(prefixLower) > 0) {
				return suggestion.toLowerCase();
			}
		});

		// Capitalise
		matchingWords = matchingWords.map((word) => {
			return word.replace(/\b[a-z]/g, match => match.toUpperCase());
		});

		// Sort the arrays
		matchingWordStart.sort();
		matchingWords.sort();

		// Combine the 2 arrays
		let matchingWordsCombined = matchingWordStart.concat(matchingWords);

		// convert the array of words into an array of objects with a text property
		let matchingSuggestions = matchingWordsCombined.map((word) => {
			return { text: word, type: 'keyword', rightLabel: 'AOZ' };
		});

		return matchingSuggestions;
	}
}
export default new BasicProvider();
