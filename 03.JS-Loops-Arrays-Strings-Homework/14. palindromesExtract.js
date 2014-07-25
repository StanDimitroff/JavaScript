//Write a JavaScript function findPalindromes(value) that extracts from a given text all palindromes, e.g. "ABBA", "lamal", "exe". Write JS program palindromesExtract.js that invokes your function with the sample input data below and prints the output at the console.

function findPalindromes(str) {
	var arr = str.toLowerCase().split(/\W+/);
	var result = [];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == arr[i].split('').reverse().join('')) {
			result.push(arr[i]);
		}
	}
	result.pop();
	return result = result.join(', ');
}
console.log(findPalindromes('There is a man, his name was Bob.'));