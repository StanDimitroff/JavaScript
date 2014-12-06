/*Using Underscore.js, perform the following operations on the student collection given below:
 •	Get all students with age between 18 and 24
 •	Get all students whose first name is alphabetically before their last name
 •	Get only the names of all students from Bulgaria
 •	Get the last five students
 •	Get the first three students who are not from Bulgaria and are male
 */

_ = require('./node_modules/underscore/underscore.js');

var students = [
    {"gender": "Male", "firstName": "Joe", "lastName": "Riley", "age": 22, "country": "Russia"},
    {"gender": "Female", "firstName": "Lois", "lastName": "Morgan", "age": 41, "country": "Bulgaria"},
    {"gender": "Male", "firstName": "Roy", "lastName": "Wood", "age": 33, "country": "Russia"},
    {"gender": "Female", "firstName": "Diana", "lastName": "Freeman", "age": 40, "country": "Argentina"},
    {"gender": "Female", "firstName": "Bonnie", "lastName": "Hunter", "age": 23, "country": "Bulgaria"},
    {"gender": "Male", "firstName": "Joe", "lastName": "Young", "age": 16, "country": "Bulgaria"},
    {"gender": "Female", "firstName": "Kathryn", "lastName": "Murray", "age": 22, "country": "Indonesia"},
    {"gender": "Male", "firstName": "Dennis", "lastName": "Woods", "age": 37, "country": "Bulgaria"},
    {"gender": "Male", "firstName": "Billy", "lastName": "Patterson", "age": 24, "country": "Bulgaria"},
    {"gender": "Male", "firstName": "Willie", "lastName": "Gray", "age": 42, "country": "China"},
    {"gender": "Male", "firstName": "Justin", "lastName": "Lawson", "age": 38, "country": "Bulgaria"},
    {"gender": "Male", "firstName": "Ryan", "lastName": "Foster", "age": 24, "country": "Indonesia"},
    {"gender": "Male", "firstName": "Eugene", "lastName": "Morris", "age": 37, "country": "Bulgaria"},
    {"gender": "Male", "firstName": "Eugene", "lastName": "Rivera", "age": 45, "country": "Philippines"},
    {"gender": "Female", "firstName": "Kathleen", "lastName": "Hunter", "age": 28, "country": "Bulgaria"}
];


function filterByAge(students) {
    _.chain(students)
        .filter(function (student) {
            return student.age >= 18 && student.age <= 24;
        })
        .each(function (student) {
            console.log(student.firstName + ' ' + student.lastName + ' ' + student.age);
        });
}

function filterByName(students) {
    _.chain(students)
        .filter(function (student) {
            return student.firstName < student.lastName;
        })
        .each(function (student) {
            console.log(student.firstName + ' ' + student.lastName);
        });
}

function getBulgarianStudentsNames(students) {
    _.chain(students)
        .where({country: 'Bulgaria'})
        .each(function (student) {
            console.log(student.firstName + ' ' + student.lastName);
        })
}

function getLastFiveStudents(students) {
    _.chain(students)
        .last(5)
        .each(function (student) {
            console.log(student.firstName + ' ' + student.lastName);
        })
}

function getFirstThreeStudents(students) {
    _.chain(students)
        .filter(function (student) {
            return student.country !== 'Bulgaria' && student.gender === 'Male';
        })
        .first(3)
        .each(function (student) {
            console.log(student.firstName + ' ' + student.lastName + ' ' + student.country + ' ' + student.gender)
        })
}

// uncomment the commented lines one by one to see the result

//filterByAge(students);
//filterByName(students);
//getBulgarianStudentsNames(students);
//getLastFiveStudents(students);
//getFirstThreeStudents(students);