function solve(params) {
	var str = params[0];
	var arr = str.split(' ');
	var concat = '';

	function isEmpty(array) {
		for (var i = 0; i < array.length - 1; i++) {
			if (array[i] != array[i + 1]) {
				return false;
			}
		}
		return true;
	}
	// Array.prototype.insert = function(index, item) {
	//     this.splice(index, 0, item);
	// }

	while (true) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] !== '') {
				concat += arr[i][arr[i].length - 1];
				arr[i] = arr[i].slice(0, arr[i].length - 1);
			}
			var empty = isEmpty(arr);

		};
		if (empty == true) {
			break;
		}

	}
	var result = concat.split(/(?!$)/);
	var end = result.length - 1;
	var place = 0;
	var move = 0;
	for (var i = 0; i < result.length; i++) {
		if (result[i] == result[i].toLowerCase()) {
			move = result[i].charCodeAt(result[i]) - 96;
		} else {
			move = result[i].charCodeAt(result[i]) - 64;

		}
		if (i + move > end) {
			//place = move - (result.length - 1) + i;
			while (true) {
				//place = move - (result.length - 1 - i);
				move = i + move - (end - i);
				if (i + move < end) {
					break;
				}
				// if (i + move > result.length) {
				//     move = move - result.length;
				// }

			}
			place = move;

		} else {
			place = i + move + 1;
		}

		result.splice(place, 0, result[i]);
		result.splice(i, 1);
	};
	var output = result.join('');
	return output;
}



console.log(solve(['Fun exam right']));
console.log(solve(['Hi exam']));