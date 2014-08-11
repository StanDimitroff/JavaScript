function solve(params) {
	var str = '';
	if (params.length > 1) {
		str = params.join('');
	} else {
		str = params[0];
	}
	var links = [];
	var found = '';

	for (var i = 0; i < str.length - 1; i++) {
		if (str[i] == '<' && str[i + 1] == 'a') {
			for (var j = i; j < str.length - 1; j++) {
				found += str[j];
				if (str[j] == '>') {
					links.push(found);
					found = '';
					break;
				}
			}

		}
	}
	var res = '';
	var arr = [];
	for (var i = 0; i < links.length; i++) {
		if (links[i].indexOf('href=') != -1) {
			var pos = links[i].indexOf('href=');
			for (var k = pos + 6; k < links[i].length; k++) {

				if (links[i][k] == '\"' || links[i][k] == '\'') {
					if (links[i][k - 1] == '(') {
						var index = links[i].indexOf('(');
						var index2 = links[i].indexOf(')');
						for (var i = index; i < index2; i++) {
							res+= links[i][index];
						}
				} else {
					arr.push(res);
					res = '';
				}



				break;
			} else {
				res += links[i][k];
			}
		}
	} else if (links[i].indexOf('href =') != -1) {

		var pos = links[i].indexOf('href =');
		for (var k = pos + 7; k < links[i].length; k++) {

			if (links[i][k] == '\"' || links[i][k] == '\'') {

				arr.push(res);
				res = '';

				break;
			} else {
				res += links[i][k];
			}
		}

	}
}
for (var link in arr) {
	console.log(arr[link]);
}
}


solve(['<li><a id="js" href =', '"javascript:alert(\'hi\')" class="new">click</a></li>']);