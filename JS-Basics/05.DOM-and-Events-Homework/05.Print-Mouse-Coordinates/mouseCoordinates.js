//Write a JavaScript code that prints the mouse coordinates in a text area when we move the mouse over the HTML document.

function getCoordinates() {
	var date = new Date();
	var str = 'X:' + window.event.clientX + '; Y:' + window.event.clientY + ' Time: ' + date +'\n';
	document.getElementById('text').innerHTML+=str ;
}