//Write a JavaScript function divisionBy3(value) that finds the sum of digits of integer number n (n > 9) and checks if the sum is divided by 3 without remainder. Write JS program divisionChecker.js to check a few numbers. The result should be printed on the console (“the number is divided by 3 without remainder” or “the number is not divided by 3 without remainder”). Run the program through Node.js. 

function divisionBy3(num) {
	var sum = 0;
	var str = num.toString();
	for (var i = 0; i < str.length; i++) {
		sum += Number(str[i]);
	};
	console.log(sum % 3 == 0 ? "The number is divided by 3 without remainder" : "The number is not divided by 3 without remainder");
}

divisionBy3(12);
divisionBy3(189);
divisionBy3(591);