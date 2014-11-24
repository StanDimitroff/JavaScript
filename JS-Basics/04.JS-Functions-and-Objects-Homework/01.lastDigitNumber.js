//Write a JavaScript function lastDigitAsText(number) that returns the last digit of given integer as an English word. Write a JS program lastDigitOfNumber.js that invokes your function with the sample input data below and prints the output at the console.

function lastDigitAsText(number) {
	var digit = Math.abs(number) % 10;
	switch (digit) {
		case 0:
			return 'Zero';
			break;
		case 1:
			return 'One';
			break;
		case 1:
			return 'Two';
			break;
		case 3:
			return 'Three';
			break;
		case 4:
			return 'Four';
			break;
		case 5:
			return 'Five';
			break;
		case 6:
			return 'Six';
			break;
		case 7:
			return 'Seven';
			break;
		case 8:
			return 'Eight';
			break;
		case 9:
			return 'Nine';
			break;
	}
}
console.log(lastDigitAsText(6));
console.log(lastDigitAsText(-55));
console.log(lastDigitAsText(133));
console.log(lastDigitAsText(614567));