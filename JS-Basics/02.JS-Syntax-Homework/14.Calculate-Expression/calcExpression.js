function calculateExpression () {
	var regex = /\d|\+-\*\/%\(\)\./g;
	var expression = document.getElementById('exp').value;
	try {
        if (regex.test(expression)) {
            document.getElementById("result").innerHTML = eval(expression);
        } else {
            document.getElementById("result").innerHTML = "Invalid input data!";
        }
    } catch (err) {
        document.getElementById("result").innerHTML = "Invalid input data!";
    }
}