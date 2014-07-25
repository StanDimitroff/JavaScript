//Write a JavaScript function reverseWordsInString(str) to reverse the characters of every word in the string but leaves the words in the same order. Words are considered to be sequences of characters separated by spaces. Write a JavaScript program reverseWords.js that prints on the console the output.

function reverseWordsInString(str) {
	var arr = str.split(' ');
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split("").reverse().join("");
	};
	var result = arr.join(' ');
	return result;
}

console.log(reverseWordsInString('Hello, how are you.'));
console.log(reverseWordsInString('Life is pretty good, isn’t it?'));