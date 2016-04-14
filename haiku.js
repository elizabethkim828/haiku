var fs = require('fs');
var cmudictFile = fs.readFileSync('./cmudict.txt');

//Create Dictionary: each word is an object containing phoneme and number of syllables.
function formatData(data) {
	var lines = data.toString().split('\n');
	var parsedlines = {};
	lines.forEach(function(line) {
		var splitline = line.split("  ");
		var currentword = splitline[0];
		parsedlines[currentword] = {
			phoneme: splitline[1],
			numsyllables: function() {
				if (splitline[1].match(/\d/g) === null) {
					return 0;
				} else {
					return splitline[1].match(/\d/g).length;
				}
			}
		}
	});
	return parsedlines;
}
cmudictFile = formatData(cmudictFile);

//Create Syllables Array: each element of the array corresponds to # of syllables and contains words that fit that syllable number.
function createSyllables(parseddata) {
	var result = [];
	for (var key in parseddata) {
		var currentword = key;
		var currentindex = parseddata[key].numsyllables();
		if (result[currentindex] === undefined) {
			result[currentindex] = [];
			result[currentindex].push(currentword);
		} else {
			result[currentindex].push(currentword);
		}
	}
	return result;
}
var syllablesArr = createSyllables(cmudictFile);

//Creates Haikus from random words in the Dictionary
function createHaikuFromDictionary(structure, syllablesArr) {
	var result = structure.map(function(innerArray) {
		return innerArray.map(function(num) {
			return syllablesArr[num][Math.floor(Math.random(0,1)*syllablesArr[num].length)];
		}).join(' ');
	});
	console.log(result.join('\n'));
}

//Creates Haikus from phrases within a book.
function createHaikuFromBook(structure, dictionary, book) {
	book = book.toString().toUpperCase().replace(/\s+/g, " ").split(" ");

	function haikuLine(n) {
		var regex = /[\W+]$/g;
		var x, firstword, count, phrasearray;

		function initialize() {
			function firstword() {
				x = Math.floor(Math.random(0,1)*book.length);
				result = book[x].replace(regex, "");
				if (dictionary[result] === undefined) {
					return firstword();
				} else {
					return result;
				}
			}
			firstword = firstword();
			count = dictionary[firstword].numsyllables();
			phrasearray = [firstword];
		}

		function rec(currword, i) {
			i = i || 1;
			if (count === n) {
				var result = phrasearray.join(" ");
				console.log(result); // WHY DOES "console.log(result)" RETURN SUCCESSFULLY HERE BUT "RESULT" IS UNDEFINED BELOW?
				return result; // WHY DOES THIS RETURN UNDEFINED WHEN I RUN "console.log(haiku.join('\n'))" BELOW?
			} else if (count < n) {
				nextword = book[x+i].replace(regex, "");
				if (dictionary[nextword] === undefined) { // Edge case when there are no more words left or dictionary doesn't contain word.
					initialize();
					rec(firstword);
				} else {
					phrasearray.push(nextword);
					count += dictionary[nextword].numsyllables();
					i++;
					rec(nextword, i);	
				}
			} else {
				initialize();
				rec(firstword);
			}
		}
		
		initialize();
		rec(firstword);
	}
	
	var haiku = structure.map(function(innerArray) {
		return innerArray.map(function(n) {
			return n + ": " + haikuLine(n, book); // WHY DOES haikuLine(n, book) RETURN UNDEFINED?
		});
	});
	
	console.log(haiku.join('\n'));
}


module.exports = {
	createHaikuFromDictionary: createHaikuFromDictionary,
	createHaikuFromBook: createHaikuFromBook,
	syllablesArr: syllablesArr,
	cmudictFile: cmudictFile
}