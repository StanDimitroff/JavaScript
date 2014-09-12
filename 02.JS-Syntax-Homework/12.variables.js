//Write a JavaScript function variablesTypes(value) that accepts the following parameters: name, age, isMale (true or false), array of your favorite foods. The function must return the values of the variables and their types.

function variablesTypes(arguments) {
	return "My name:" + arguments[0] + " //type is " + typeof(arguments[0]) + "\n" + "My age:" + arguments[1] + " //type is " + typeof(arguments[1]) + "\n" + "I am a male:" + arguments[2] + " //type is " + typeof(arguments[2]) + "\n" + "My favourite foods are:" + arguments[3] + " //type is " + typeof(arguments[3]);
}

console.log(variablesTypes(['Pesho', 22, true, ['fries', 'banana', 'cake']]));