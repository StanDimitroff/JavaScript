//Write a JavaScript function findMaxSequence(value) that finds the maximal increasing sequence in an array of numbers and returns the result as an array. If there is no increasing sequence the function returns 'no'.Write JS program maxSequenceFinder.js that invokes your function with the sample input data below and prints the output at the console.

function findMaxSequence(arr) {
	var length = 1;
	var bestLength = 0;
	var bestIndex = 0;
	var j = 1;
	for (var i = 0; i < arr.length - 1; i++) {
		if (arr[i] < arr[j]) {
			length++;
		} else {
			if (length > bestLength) {
				bestLength = length;
				bestIndex = i;
			}
			length = 1;
		}
		j++;
	}

	if (length > bestLength) { //gets counter and index after last iteration
		bestLength = length;
		bestIndex = arr.length - 1;
	}

	var result = [];
	if (length == 1) {
		console.log('no');
	} else {
		for (i = bestIndex - bestLength + 1; i <= bestIndex; i++) {
			result.push(arr[i]);
		}
		console.log(result);
	}
}

findMaxSequence([3, 2, 3, 4, 2, 2, 4]);
findMaxSequence([3, 5, 4, 6, 1, 2, 3, 6, 10, 32]);
findMaxSequence([3, 2, 1]);