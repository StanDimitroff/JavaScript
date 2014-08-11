function solve(params) {
	var beers = 0;
	var stacks = 0;
	var counter = 0;
	while (true) {
		var str = params[counter];
		var arr = str.split(' ');
		if (arr[1] == 'stacks') {
			stacks += parseInt(arr[0]);
		} else if (arr[1] == 'beers') {
			beers += parseInt(arr[0]);
			while (beers >= 20) {
				stacks++;
				beers -= 20;
			}
		}
		if (str === 'End') {
			break;
		}
		counter++;
	}
	return stacks + ' ' + 'stacks' + ' + ' + beers + ' ' + 'beers';
}

// console.log(solve(['4 stacks', '12 beers', '10 beers', '1 stacks', '1 beers', 'End']));
// console.log(solve(['41 beers', '1 stacks', '19 beers', 'End']));