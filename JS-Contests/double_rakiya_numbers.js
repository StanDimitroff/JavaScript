function solve(params) {
    var arr = [];
    var counter = 1;
    var start = parseInt(params[0]);
    var end = parseInt(params[1]);
    for (var i = start; i <= end; i++) {
        var str = i.toString();
        for (var j = 0; j < str.length - 2; j++) {
            if (str.substring(j + 2).indexOf(str.substring(j, j + 2)) !== -1) {
                counter++;
            }
        }
        if (counter > 1) {
            arr.push('<li><span class=\'rakiya\'>' + i + '</span><a href="view.php?id=' + i + '>View</a></li>');

        }
        if (counter === 1) {
            arr.push('<li><span class=\'num\'>' + i + '</span></li>');
        }
        counter = 1;
    }
    console.log("<ul>");
    for (var num in arr) {
        console.log(arr[num]);
    }
    console.log("</ul>")
}
//solve(['5','8']);
//solve(['11210','11215']);
//solve(['55555','55560'])