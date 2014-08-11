function solve(params) {
	var n = parseInt(params[0]);
	var arr = [];
	for (var i = 1; i <= n; i++) {
		arr.push(params[i]);
	}

	function orderBy(a, b) {
		return a - b;
	}
	arr.sort(orderBy);
	if (arr.length < 2) {
		return arr[arr.length - 1];
	} else if (arr.length < 3) {
		return arr[arr.length - 1] + '\n' + arr[arr.length - 2];
	} else return arr[arr.length - 1] + '\n' + arr[arr.length - 2] + '\n' + arr[arr.length - 3];

}
//console.log(solve(['1', '0']));
// console.log(solve(['5', '20', '50', '100', '10', '75']));
// console.log(solve(['2', '3', '4']));
// console.log(solve(['5', '1.500000000000', '25.55555555555', '-0.00000000001', '1.000000000001', '3.333333333333']));