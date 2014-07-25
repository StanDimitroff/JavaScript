//Write a JavaScript function biggerThanNeighbors(index,  arr) that accept a number and an integer array as parameters. The function should return a Boolean number: whether the element at the given position in the array is bigger than its two neighbors (when such exist). It should return undefined when the index doesn't exist.

function biggerThanNeighbors(index, arr) {
	if (index > arr.length - 1 || index < 0) {
		return 'Invalid index';
	} else if (arr[index] >= arr[index - 1] + arr[index + 1]) {
		return 'bigger';
	} else if (index == 0 || index == arr.length - 1) {
		return 'only one neighbor'
	}else{
		return 'not bigger';
	}
}

console.log(biggerThanNeighbors(2, [1, 2, 3, 3, 5]));
console.log(biggerThanNeighbors(2, [1, 2, 5, 3, 4]));
console.log(biggerThanNeighbors(5, [1, 2, 5, 3, 4]));
console.log(biggerThanNeighbors(0, [1, 2, 5, 3, 4]));