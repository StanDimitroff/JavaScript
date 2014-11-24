//Write a JavaScript function findYoungestPerson(persons) that accepts as parameter an array of persons, finds the youngest person and returns his full name. Write a JS program youngestPerson.js to execute your function for the below examples and print the result at the console.

function findYoungestPerson(persons) {
	var youngest = Number.MAX_VALUE;
	var fName = '';
	var lName = '';
	for (var i in persons) {
		if (persons[i].age < youngest) {
			youngest = persons[i].age;
			fName = persons[i].firstname;
			lName = persons[i].lastname;
		}
	}
	return 'The youngest person is ' + fName + ' ' + lName;
}

console.log(findYoungestPerson([{
	firstname: 'George',
	lastname: 'Kolev',
	age: 32
}, {
	firstname: 'Bay',
	lastname: 'Ivan',
	age: 81
}, {
	firstname: 'Baba',
	lastname: 'Ginka',
	age: 40
}]));