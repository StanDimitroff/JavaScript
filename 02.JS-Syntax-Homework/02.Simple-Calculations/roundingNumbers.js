//Write a JavaScript function roundNumber(value) that rounds floating-point number using Math.round(), Math.floor(). Write a JS program roundingNumbers.js that rounds a few sample values. Run the program through Node.js.

function roundNumber(num) {
	return "Floored:" + Math.floor(num) + "\n" + "Rounded:" + Math.round(num);
}

console.log(roundNumber(22.7));
console.log(roundNumber(12.7));
console.log(roundNumber(58.7));