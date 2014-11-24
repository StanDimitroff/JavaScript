//Sorting an array means to arrange its elements in increasing order. Write a JavaScript function sortArray(value) to sort an array. Use the "selection sort" algorithm: find the smallest element, move it at the first position, find the smallest from the rest, move it at the second position, etc. Write JS program arraySorter.js that invokes your function with the sample input data below and prints the output at the console. Use a second array.

function sortArray(arr) {
	var replaceIndex = 0;
	var select = arr;
	Array.min = function findMin(arr) {
			return Math.min.apply(Math, select);
		};
	for (var i = 0; i < arr.length; i++) {
		select = select.slice(0);// this is the rest of the array after last iteration
		
		var minimum = Array.min(select);
		var position = select.indexOf(minimum);
		arr[replaceIndex] = select[position];
		replaceIndex++;
		select.splice(position, 1);//remove sorted element
	}
	console.log(arr.join(', '));
}
sortArray([5, 4, 3, 2, 1]);
sortArray([12, 12, 50, 2, 6, 22, 51, 712, 6, 3, 3]);