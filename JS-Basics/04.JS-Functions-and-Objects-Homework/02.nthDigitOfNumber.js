//Write a JavaScript function findNthDigit(arr) that accepts as a parameter an array of two numbers num and n and returns the n-th digit of given decimal number num counted from right to left. Return undefined when the number does not have n-th digit. Write a JS program nthDigitOfNumber.js that invokes your function with the sample input data below and prints the output at the console.

function findNthDigit(arr) {
	var str = arr[1].toString();
	//remove unwanted symbols
	str = str.replace('-', '').replace('.', '');
	if (str.length < arr[0]) {
		return "The number doesn't have " + arr[0] + " digits";
	}

	return str[str.length - arr[0]];
}

console.log(findNthDigit([1, 6]));
console.log(findNthDigit([2, -55]));
console.log(findNthDigit([6, 923456]));
console.log(findNthDigit([3, 1451.78]));
console.log(findNthDigit([6, 888.88]));