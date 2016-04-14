// When running this module, add a book as one of the arguments in the terminal command line. Ex. $ node haiku_generator doriangray.txt

var haiku = require('./haiku.js');
var fs = require('fs');
var currbook = fs.readFileSync('./' + process.argv[2]);

console.log('');
console.log('***Haiku from Dictionary***');
haiku.createHaikuFromDictionary([[2,2,1],[2,3,2],[2,2,1]], haiku.syllablesArr);

console.log('');
console.log('***Haiku from Book***');
haiku.createHaikuFromBook([[5],[7],[5]], haiku.cmudictFile, currbook);