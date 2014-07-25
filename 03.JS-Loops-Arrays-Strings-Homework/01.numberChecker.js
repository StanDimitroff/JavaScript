//Write a JavaScript function printNumbers(n) that accepts as parameter integer n. The function finds all integer numbers from 1 to n that are not divisible by 4 or by 5. Write a JS program numberChecker.js that invokes your function with the sample input data below and prints the output at the console. 

function printNumbers(n) {
	if (n < 1) {
		console.log("no")
	} else {
		var numbers = [];
		for (var i = 1; i <= n; i++) {
			if (i % 20 != 0) {
				numbers.push(i);
			};
		};
		console.log(numbers.join(', '));
	};
}

printNumbers(20);
printNumbers(-5);
printNumbers(13);