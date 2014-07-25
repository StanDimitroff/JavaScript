//Write a JavaScript function checkBrackets(value) to check if in a given expression the brackets are put correctly. Write JS program bracketsChecker.js that invokes your function with the sample input data below and prints the output at the console.

function checkBrackets(str) {
	var parentheses = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i] == '(') {
			parentheses++;
		} else if (str[i] == ')') {
			parentheses--;
		}
		if (parentheses < 0) {
			return 'incorrect';
		}
	}
	if (parentheses > 0) {
		return 'incorrect';
	} else {
		return 'correct';
	}
}

console.log(checkBrackets('( ( a + b ) / 5 – d )'));
console.log(checkBrackets(') ( a + b ) )'));
console.log(checkBrackets('( b * ( c + d *2 / ( 2 + ( 12 – c / ( a + 3 ) ) ) )'));
console.log(checkBrackets(')(( ( a + b ) / 5 – d )'));
console.log(checkBrackets('(( ( a + b ) / 5 – d )('));