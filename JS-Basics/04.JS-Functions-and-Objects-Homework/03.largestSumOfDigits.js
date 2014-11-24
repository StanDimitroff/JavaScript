//Write a JavaScript function findLargestBySumOfDigits(nums) that takes as an input a sequence of positive integer numbers and returns the element with the largest sum of its digits. The function should take a variable number of arguments. It should return undefined when 0 arguments are passed or when some of the arguments is not an integer number. Write a JS program largestSumOfDigits.js that invokes your function with the sample input data below and prints its output at the console.

function findLargestBySumOfDigits(nums) {
	if (arguments.length == 0) {
		return undefined;
	}
	var sum = 0;
	var bestSum = 0;
	var bestNum = 0;
	for (var i = 0; i < arguments.length; i++) {
		//check argument's type 
		if (typeof(arguments[i]) !== 'number' || arguments[i] % 1 != 0) {
			return undefined;
		}
	}
	for (var i = 0; i < arguments.length; i++) {
		var temp = arguments[i].toString().replace('-', '');
		if (temp.length > 1) {
			while (Number(temp) > 0) {
				sum = sum + temp % 10;
				temp = Math.floor(temp / 10);
			}
		} else {
			sum = temp;
		}

		if (sum > bestSum) {
			bestSum = sum;

			bestNum = arguments[i];
		}
		sum = 0;
	}
	return bestNum;
}

console.log(findLargestBySumOfDigits(5, 10, 15, 111));
console.log(findLargestBySumOfDigits(33, 44, -99, 0, 20));
console.log(findLargestBySumOfDigits());
console.log(findLargestBySumOfDigits('hello'));
console.log(findLargestBySumOfDigits(5, 3.3));