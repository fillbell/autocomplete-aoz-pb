'use babel';

// data source is an array of objects
import suggestions from '../data/intermediate';

class IntermediateProvider {
	constructor() {
		// offer suggestions only when editing aoz files
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

		let matchingSuggestions = suggestions.filter((suggestion) => {
			suggestionNoSpace = suggestion.text.replace(/\s+/g, '').toLowerCase();
			if (suggestionNoSpace.indexOf(prefixLower) !== -1) {
				return suggestion;
			}
		});

		// Sort the sugesstions
		matchingSuggestions.sort(function(a,b) {
  		return b.text.toLowerCase() < a.text.toLowerCase();
		});

		// run each matching suggestion through inflateSuggestion() and return
		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		return {
			text: suggestion.text.replace(/\b[a-z]/g, match => match.toUpperCase()),
			description: suggestion.description,
			descriptionMoreURL: suggestion.descriptionMoreURL,
			type: 'value',
			rightLabel: 'Hero'
		};
	}
}
export default new IntermediateProvider();
