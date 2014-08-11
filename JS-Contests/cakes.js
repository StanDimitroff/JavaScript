function solve(params) {
	var money = parseInt(params[0]),
		c1 = parseInt(params[1]),
		c2 = parseInt(params[2]),
		c3 = parseInt(params[3]);

	var sumMax = 0;
	var sumTemp = 0;
	//round the values
	var limitC1 = Math.floor(money / c1);
	var limitC2 = Math.floor(money / c2);
	var limitC3 = Math.floor(money / c3);
	for (var i = limitC1; i >= 0; i--) {
		sumTemp = i * c1;
		if (sumTemp > sumMax && sumTemp <= money) {
			sumMax = sumTemp;
		}
		for (var j = limitC2; j >= 0; j--) {
			sumTemp = i * c1 + j * c2;
			if (sumTemp > sumMax && sumTemp <= money) {
				sumMax = sumTemp;
			}
			for (var k = limitC3; k >= 0; k--) {
				sumTemp = i * c1 + j * c2 + k * c3;
				if (sumTemp > sumMax && sumTemp <= money) {
					sumMax = sumTemp;
				}
			}
		}
	}
	return sumMax; //required result in Judge system
}
// console.log(solve([110, 13, 15, 17]));
// console.log(solve([20, 11, 200, 300]));
// console.log(solve([110, 19, 29, 39]));