/*Create a module for working with the console object. The module should support the following functionality:
 •	Writing a line to the console
 •	Writing a line to the console using formatting (with placeholders)
 •	Writing to the console should call toString() to each element
 •	Writing errors and warnings to the console with and without format
 */

var specialConsole = (function () {

    var writeLine = function () {
        if (arguments.length == 1) {
            console.log(arguments[0].toString());
        }
        else {
            var result = arguments[0];

            for (var i = 0; i < arguments.length - 1; i++) {
                var placeHolder = '{' + i + '}';
                result = result.replace(placeHolder, arguments[i + 1])
            }

            // check for unused placeholders
            var index = result.lastIndexOf('{');
            if(index != -1){
                result = result.slice(0, index)
            }

            console.log(result);
        }
    };

    return{
        writeLine: writeLine,
        writeError: writeLine,
        writeWarning: writeLine
    }
}());

specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0}", "hello");
specialConsole.writeLine("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
specialConsole.writeWarning("Warning: {0} {1}", "You are not allowed to do that!", "Seriously!");
specialConsole.writeWarning("Warning: {0} {1} {2}", "You are not allowed to do that!", "Seriously!");
specialConsole.writeWarning("Warning: {0} {1} {2}", "You are not allowed to do that!", "Seriously!", "It's not a joke!");