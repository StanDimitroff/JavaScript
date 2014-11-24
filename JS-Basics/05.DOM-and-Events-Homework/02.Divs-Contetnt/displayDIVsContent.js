//You are given a HTML file holding several <div> elements. Write a JavaScript code to print the text content of all <div> elements as unordered list.

function getContent() {
	var content = getElementsByTagName('div');
	var fragment = document.createDocumentFragment();
	var ul = document.getElementById('result');
	for (var i in content) {
		var li = document.createElement('li');

		li.innerHTML = content[i].textContent.replace('\n', '</br>');
		fragment.appendChild(li);

	}
	ul.appendChild(fragment);
}
getContent();