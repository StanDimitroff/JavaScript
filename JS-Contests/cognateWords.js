function solve(params) {
	var arr = params[0].split(/[^A-Za-z]+/);//excludes everthing except words
	var result = [];
	//check for empty elements
	if (arr[arr.length - 1] == '' || arr[0] =='') { 
		arr.pop();
	}
	var counter = 0;
	for (var a = 0; a < arr.length; a++) {
		for (var b = 0; b < arr.length; b++) {
			for (var c = 0; c < arr.length; c++) {
				if (a !== b) {
					if (arr[a] + arr[b] === arr[c]) {
						var str = arr[a] + '|' + arr[b] + '=' + arr[c];
						if (result.indexOf(str) == -1) {
							result.push(str);
						}
					}
				}
			}
		}
	}

	if (result.length == 0) {
		return 'No';
	} else {
		var outputString = result.join('\n');
	}
	return outputString;//required result in Judge system
}

// console.log(solve(['java..?|basics/*-+=javabasics']));
// console.log(solve(['Hi, Hi, Hihi']));
// console.log(solve(['Uni(lo,.ve=I love SoftUni (Soft)']));
// console.log(solve(['a a aa a']));
// console.log(solve(['x a ab b aba a hello+java a b aaaaa']));
// console.log(solve(['aa bb bbaa']));
// console.log(solve(['ho hoho']));