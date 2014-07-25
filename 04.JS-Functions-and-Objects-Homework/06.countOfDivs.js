////Write a JavaScript function countDivs(html) to count the number of all DIVs in given HTML fragment passed as string. Write a JS program countOfDivs.js that invokes your function and prints the output at the console.

function countDivs(html) {
	var counter = 0;
	for (var i = 0; i < html.length; i++) {
		if (html[i] == '<' && html[i + 1] === 'd' && html[i + 2] === 'i' && html[i + 3] === 'v') {
			counter++;
		}
	};
	return counter;
}

console.log(countDivs('<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8"><title>index</title><script src="/yourScript.js" defer></script></head><body><div id="outerDiv"><div class="first"><div><div>hello</div></div><div>hi<div></div></div><div>I am a div</div></div></body></html>'));