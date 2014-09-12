function solve(params) {
	var start = parseInt(params[0]);
	var end = parseInt(params[1]);
	var change = '';
	var fib = '';

	function fibonacci(n) {
		var phi = 0.5 + 0.5 * Math.sqrt(5.0);
		var a = phi * n;
		return n == 0 || Math.abs(Math.round(a) - a) < 1.0 / n;
	}

	for (var i = start; i <= end; i++) {
		var isFib = fibonacci(i);
		if (isFib == true) {
			fib = 'yes';
		} else {
			fib = 'no';
		}

		change += '<tr><td>' + i + '</td>' + '<td>' + i * i + '</td>' + '<td>' + fib + '</td></tr>' + '\n';
	}

	return '<table>' + '\n' +
		'<tr><th>Num</th><th>Square</th><th>Fib</th></tr>' + '\n' + change + '</table>';
}

//console.log(solve(['2', '6']));
//console.log(solve(['55', '56']));
//console.log(solve(['5', '10']));
//console.log(solve(['999999', '1000000']));