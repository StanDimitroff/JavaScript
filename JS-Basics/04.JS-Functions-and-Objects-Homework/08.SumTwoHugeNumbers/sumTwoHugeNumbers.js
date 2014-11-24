//Write a JavaScript function sumTwoHugeNumbers(value) that accepts as parameter an array of the two numbers for summing. The input numbers are represented as strings. The result should be printed on the console.

//include library
var bigInt = require('./bignum.min.js');

function sumTwoHugeNumbers(arr) {
	var numOne = bigInt(arr[0]);
	var numTwo = bigInt(arr[1]);
	var sum = numOne.plus(numTwo).toString(10);
	return sum;
}

console.log(sumTwoHugeNumbers(['155', '65']));
console.log(sumTwoHugeNumbers(['123456789', '123456789']));
console.log(sumTwoHugeNumbers(['887987345974539', '4582796427862587']));
console.log(sumTwoHugeNumbers(['347135713985789531798031509832579382573195807',
	'817651358763158761358796358971685973163314321'
]));