//Write a JavaScript function group(persons) that groups an array of persons by age, first or last name. Create a Person constructor to add every person in the person array. The group(persons) function must return an associative array, with keys – the groups (age, firstName and lastName) and values – arrays with persons in this group. Print on the console every entry of the returned associative array. Use function overloading (i.e. just one function). You may need to find how to use constructors.

var persons = [];
//create persons 
function personConstructor(fname, lname, personAge) {
	this.firstName = fname;
	this.lastName = lname;
	this.age = personAge;
}

persons.push(new personConstructor('Scott', 'Guthrie', 38));
persons.push(new personConstructor('Scott', 'Johns', 36));
persons.push(new personConstructor('Scott', 'Hanselman', 39));
persons.push(new personConstructor('Jesse', 'Johns', 57));
persons.push(new personConstructor('Jon', 'Skeet', 38));

function group(arr, prop) {
	var result = {};
	var person;
	for (i in arr) {
		person = arr[i];
		if (!(prop in person)) {
			continue;
		}
		//if person's property exists add new person with same property
		if (person[prop] in result) {
			result[person[prop]].push(person);
			//otherwise add new person with different property
		} else {
			result[person[prop]] = [person];
		}
	}
	console.log(result);
	console.log();
}

group(persons, 'firstName');
group(persons, 'age');
group(persons, 'lastName');