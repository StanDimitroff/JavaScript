//Write a JavaScript function findMaxSequence(value) that finds the maximal sequence of equal elements in an array and returns the result as an array. If there is more than one sequence with the same maximal length, print the rightmost one. Write JS program sequenceFinder.js that invokes your function with the sample input data below and prints the output at the console.

function findMaxSequence(arr) {
	var length = 1;
	var bestLength = 0;
	var bestIndex = 0;
	var j = arr.length - 2;
	//reversed iteration garantied the rightmost selection
	if (arr.length == 1) {
		console.log(arr);
	} else {
		for (var i = arr.length - 1; i > 0; i--) {
			if (arr[i] === arr[j]) {
				length++;
			} else {
				if (length > bestLength) {
					bestLength = length;
					bestIndex = i;
				}
				length = 1;
			}
			j--;
		}

		if (length > bestLength) { //gets counter and index after last iteration
			bestLength = length;
			bestIndex = arr.length - 1;
		}

		var result = [];
		for (i = bestIndex; i < bestIndex + bestLength; i++) {
			result.push(arr[i]);
		}
		console.log(result);
	}
}

findMaxSequence([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);
findMaxSequence(['happy']);
findMaxSequence([2, 'qwe', 'qwe', 3, 3, '3']);