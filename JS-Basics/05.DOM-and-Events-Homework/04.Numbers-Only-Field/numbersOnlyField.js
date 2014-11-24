//Write a HTML page holding a form and a text field. Using JavaScript make the text field to accept numbers only. When a non-number character is entered through the keyboard (or by any other way), make the field red for a while and do not accept the change (preserve the previous value of the field).

var previousValue = '';

function checkInput() {
	var input = document.getElementById('text');
	var num = Number(input.value);
	if (isNaN(num)) {
		changeBgColor('red');
		setTimeout(function() {
			changeBgColor('white')
		}, 300);
		input.value = previousValue;

	} else {
		//hold previous value of text field
		previousValue = input.value;
	}

	function changeBgColor(color) {
		document.getElementById("text").style.backgroundColor = color;
	}
}