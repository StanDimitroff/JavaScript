//You are given an HTML file holding a table of elements and a button titled "Hide Odd Rows". Write JavaScript code hideOddRows.js that attaches to the button lick event and hides the odd rows of the table when clicked.

function hideOddRows() {
	var rows = document.querySelectorAll('table tr:nth-child(odd)');
	for (var row in rows) {
		rows[row].style.display = 'none';
	}
}