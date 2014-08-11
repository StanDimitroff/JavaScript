//Write a JavaScript function compareChars(value) that compares two arrays of chars lexicographically (letter by letter). Write JS program charComparer.js that invokes your function with the sample input data below and prints the output at the console.

function compareChars(arrayOne, arrayTwo) {
	if (arrayOne.length != arrayTwo.length) {
		console.log("Not Equal");
	} else {
		var equal = true;
		for (var i = 0; i < arrayOne.length; i++) {
			if (arrayOne[i] === arrayTwo[i]) {
				equal = true;
			} else {
				equal = false;
				break;
			}
		}
		if (equal && true) {
			console.log("Equal");
		} else {
			console.log("Not equal");
		}
	}
}

compareChars(['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q'],
['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']
);
compareChars(['3', '5', 'g', 'd'], 
['5', '3', 'g', 'd']
);
compareChars(['q', 'g', 'q', 'h', 'a', 'k', 'u', '8', '}', 'q', '.', 'h', '|', ';'],
['6', 'f', 'w', 'q', ':', '”', 'd', '}', ']', 's', 'r']
);