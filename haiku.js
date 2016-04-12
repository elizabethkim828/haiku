var fs = require('fs');
var cmudictFile = fs.readFileSync('./cmudict.txt').toString();

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

var parsedcmu = formatData(cmudictFile);
console.log(parsedcmu['HELLO'].numsyllables());


/*
var syllablesArr = [];

for (var key in parsedcmu) {
	var currentword = key;
	var currentindex = parsedcmu[key].numsyllables();
	if (syllablesArr[currentindex] === undefined) {
		syllablesArr[currentindex] = [];
		syllablesArr[currentindex].push(currentword);
	} else {
		syllablesArr[currentindex].push(currentword);
	}
}

console.log(syllablesArr);
*/


function createHaiku(structure, syllablesArr) {
	console.log('This should log a haiku with the structure [' + structure + ']');
}

module.exports = {
	createHaiku: createHaiku,
}