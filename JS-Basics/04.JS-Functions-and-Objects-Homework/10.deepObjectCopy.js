//Write a JavaScript function clone(obj) that accept as parameter an object of reference type.  The function should return a deep copy of the object. Write a second function compareObjects(obj, objCopy) that compare the two objects by reference (==) and print on the console the output given below. Read in Internet about "deep copy" of an object and how to create it.

function clone(obj) {
	return JSON.parse(JSON.stringify(obj)); //clone the object
}

function compareObjects(obj, copy) {
	console.log('a == b --> '+ (obj == copy));
}

var a = {
	name: 'Pesho',
	age: 21
}
var b = clone(a); // a deep copy 
compareObjects(a, b);

var c = {
	name: 'Pesho',
	age: 21
};
var d = c; // not a deep copy
compareObjects(c, d);