var haiku = require('./haiku.js');
var fs = require('fs');
var currbook = fs.readFileSync('./dollhouse.txt')

console.log('');
console.log('***Haiku from Dictionary***');
haiku.createHaikuFromDictionary([[2,2,1],[2,3,2],[2,2,1]], haiku.syllablesArr);

console.log('');
console.log('***Haiku from Book***');
haiku.createHaikuFromBook([[5],[7],[5]], haiku.cmudictFile, currbook);