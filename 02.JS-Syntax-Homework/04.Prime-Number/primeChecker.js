//Write a JavaScript function isPrime(value) that checks if an integer number is prime. Write JS program primeChecker.js that checks if a few numbers are prime. The result should be printed on the console (true or false) on the console. Run the program through Node.js.

function isPrime(num) {
	for (i = 2; i < Math.floor(num/2); i++) {
		if (num % i != 0) {
			console.log(true);
			break;
		} else {
			console.log(false);
			break;
		}
	}
}

isPrime(7);
isPrime(254);
isPrime(587);