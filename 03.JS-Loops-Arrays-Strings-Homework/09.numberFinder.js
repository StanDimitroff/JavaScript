//Write a JavaScript function findMostFreqNum(value) that finds the most frequent number in an array. If multiple numbers appear the same maximal number of times, print the leftmost of them. Write JS program numberFinder.js that invokes your function with the sample input data below and prints the output at the console.

function findMostFreqNum(arr) {
	arr.sort(function orderBy(a, b) { // sort the array with function
		return a - b;
	});
	var counter = 1;
	var bestCounter = 0;
	var bestIndex = 0;
	var j = 1;
	for (var i = 0; i < arr.length - 1; i++) { //find the biggest counter
		if (arr[i] === arr[j]) {
			counter++;
		} else {
			if (counter > bestCounter) {
				bestCounter = counter;
				bestIndex = i;
			}
			counter = 1;
		}
		j++;
	};
	if (counter > bestCounter) { //gets counter and index after last iteration
            bestCounter = counter;
            bestIndex = arr.length - 1;
        }
	console.log(arr[bestIndex] + ' (' + bestCounter + ' times)');
}

findMostFreqNum([4, 1, 1, 4, 2, 3, 4, 4, 1, 2, 4, 9, 3]);
findMostFreqNum([2, 1, 1, 5, 7, 1, 2, 5, 7, 3, 87, 2, 12, 634, 123, 51, 1]);
findMostFreqNum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);