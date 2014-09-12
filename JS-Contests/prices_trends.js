function solve(params) {
    console.log('<table>');
    console.log('<tr><th>Price</th><th>Trend</th></tr>');
    var prices = params;
    //round the numbers(result is string)
    for (var i in prices) {
        prices[i] = Number(prices[i]).toFixed(2);
    }
    console.log('<tr><td>' + prices[0] + '</td><td><img src="fixed.png"/></td></td>');
    for (var i = 0; i < prices.length; i++) {
        //cast to number
        var previous = Number(prices[i]);
        var next = Number(prices[i + 1]);
        if (next > previous) {
            console.log('<tr><td>' + next.toFixed(2) + '</td><td><img src="up.png"/></td></td>');
        } else if (next < previous) {
            console.log('<tr><td>' + next.toFixed(2) + '</td><td><img src="down.png"/></td></td>');
        } else if (next === previous) {
            console.log('<tr><td>' + next.toFixed(2) + '</td><td><img src="fixed.png"/></td></td>');
        }
    }

    console.log('</table>');
}

//solve(['50', '60']);
//solve(['36.333','36.5','37.019','35.4','35','35.001','36.225']);
//solve(['1.33', '1.35', '2.25', '13.00', '0.5', '0.51', '0.5', '0.5', '0.33', '1.05', '1.346', '20', '900', '1500.1', '1500.10', '2000']);