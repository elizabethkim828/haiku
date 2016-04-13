var haiku = require('./haiku');

console.log('Simple Haiku:');
haiku.createHaiku([[5],[7],[5]], haiku.syllablesArr);
console.log('');
console.log('Multi-word Haiku:');
haiku.createHaiku([
  [2,3],
  [1,3,3],
  [3,2]
], haiku.syllablesArr);