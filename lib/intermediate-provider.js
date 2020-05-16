'use babel';

// data source is an array of objects
import guidemap from '../data/guidemap';

//var guideMap = 
class IntermediateProvider {

	constructor() {
		// offer suggestions only when editing aoz files
		this.selector = '.source.aoz-pb';
		// diable for comments and strings
		this.disableForSelector = '.source.aoz-pb .comment, .source.aoz-pb .string';

		// build the suggestions list using tyhe guidemap
		this.suggestions = [];
		for (i = 0; i < guidemap.chapters.length ; i++) {
			if (guidemap.chapters[i].pages) {

				for (c = 0; c < guidemap.chapters[i].pages.length; c++) {

					let instructionText = guidemap.chapters[i].pages[c].name;
					let instructionDescription = instructionText;
					let instructionType = 'method';
					let instructionRight = 'INSTRUCTION';

					if (guidemap.chapters[i].pages[c].parameters && guidemap.chapters[i].pages[c].parameters.length > 0) {
						for (p = 0; p < guidemap.chapters[i].pages[c].parameters.length; p++) {
							instructionDescription = instructionDescription + ' ' + 	guidemap.chapters[i].pages[c].parameters[p].name;
							if ( p < guidemap.chapters[i].pages[c].parameters.length - 1) {
								instructionDescription = instructionDescription + ','
							}
						}
					}

					if (guidemap.chapters[i].pages[c].descriptions && guidemap.chapters[i].pages[c].descriptions.length > 0) {
						instructionDescription = instructionDescription + '\n' + guidemap.chapters[i].pages[c].descriptions[0].text;
					}

					if (guidemap.chapters[i].pages[c].return.length > 0) {
						instructionType = 'function';
						instructionRight = 'FUNCTION'
					}

					let instruction = { text: instructionText,
					 										description: instructionDescription,
															descriptionMoreURL: '',
														  type: instructionType,
														  rightLabel: instructionRight};

					this.suggestions.push(instruction);
				}
			}
		}
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

		let matchingWordStart = this.suggestions.filter((suggestion) => {
			suggestionNoSpace = suggestion.text.replace(/\s+/g, '').toLowerCase();
			if (suggestionNoSpace.startsWith(prefixLower) == true) {
				return suggestion;
			}
		});

		// Get suggestions that contain the prefix
		let matchingWords = this.suggestions.filter((suggestion) => {
			suggestionNoSpace = suggestion.text.replace(/\s+/g, '').toLowerCase();
			if (suggestionNoSpace.indexOf(prefixLower) > 0) {
				return suggestion;
			}
		});

		// Sort the sugesstions
		matchingWordStart.sort(function(a,b) {
  		return b.text.toLowerCase() < a.text.toLowerCase();
		});
		matchingWords.sort(function(a,b) {
  		return b.text.toLowerCase() < a.text.toLowerCase();
		});

		let matchingWordsCombined = matchingWordStart.concat(matchingWords);

		// run each matching suggestion through inflateSuggestion() and return
		return matchingWordsCombined.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		return {
			text: suggestion.text.replace(/\b[a-z]/g, match => match.toUpperCase()),
			description: suggestion.description,
			//descriptionMoreURL: suggestion.descriptionMoreURL,
			type: suggestion.type,
			rightLabel: suggestion.rightLabel
		};
	}
}
export default new IntermediateProvider();
