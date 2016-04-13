var fs = require('fs');
var cmudictFile = fs.readFileSync('./cmudict.txt');

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

function createHaiku(structure, syllablesArr) {
	var result = structure.map(function(innerArray) {
		return innerArray.map(function(num) {
			return syllablesArr[num][Math.floor(Math.random(0,1)*syllablesArr[num].length)];
		}).join(' ');
	});
	console.log(result.join('\n'));
}

var syllablesArr = createSyllables(formatData(cmudictFile));

module.exports = {
	createHaiku: createHaiku,
	syllablesArr: syllablesArr
}