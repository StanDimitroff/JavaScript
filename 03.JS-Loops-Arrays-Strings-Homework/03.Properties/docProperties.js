//Write a JavaScript function displayProperties(value) that displays all the properties of the "document" object in alphabetical order. Write a JS program docProperties.js that invokes your function with the sample input data below and prints the output at the console.

function displayProperties (argument) {
	var properties = [];
	for(var prop in document){
		properties.push(prop);
	}
	properties.sort();
	for(var prop in properties){
		console.log(properties[prop]); //Open the HTML document and then the browser console to see the result
	}
}

displayProperties();