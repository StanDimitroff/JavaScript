/*Create a function with no parameters. Perform the following operations:
 •	The function should print the number of its arguments and each of the arguments' type.
 o	Call the function with different number and type of arguments.
 •	The function should print the this object. Compare the results when calling the function from:
 o	Global scope
 o	Function scope
 o	Over the object
 o	Use call and apply to call the function with parameters and without parameters
 */

function parameterlessFunction() {
    console.log('Number of arguments: ' + arguments.length);
    for (var i in arguments) {
        console.log(typeof arguments[i]);
    }

    console.log();

    this._name = arguments[0];
}

parameterlessFunction.call(null);
parameterlessFunction.apply(null);
parameterlessFunction.call(null, 13, 'Baj Ivan', false);
parameterlessFunction.apply(null,[{}, 'Baba Ivanca', [], 7.8]);

var newFunction = new parameterlessFunction('Prokopi');
console.log(newFunction._name);