//Write a JavaScript function findCardFrequency(value) that that accepts the following parameters: array of several cards (face + suit), separated by a space. The function calculates and prints at the console the frequency of each card face in format "card_face -> frequency". The frequency is calculated by the formula appearances / N and is expressed in percentages with exactly 2 digits after the decimal point. The card faces with their frequency should be printed in the order of the card face's first appearance in the input. The same card can appear multiple times in the input, but its face should be listed only once in the output. Write JS program cardFrequencies.js that invokes your function with the sample input data below and prints the output at the console.

function findCardFrequency(str) {


	function extractUniqueFaces(arr) {

		var uniqueFaces = [];
		for (var i in arr) {
			if (uniqueFaces.indexOf(arr[i]) === -1) {
				uniqueFaces.push(arr[i]);
			}
		}
		return uniqueFaces;
	}

	var cardFaces = str.split(/[♣♦♥♠ ]+/);
	var count = [];

	cardFaces.pop();//removes the empty element at

	for (var i in cardFaces) {
		if (cardFaces[i] in count == true) {
			count[cardFaces[i]]++;
		} else {
			count[cardFaces[i]] = 1;
		}
	}

	var n = cardFaces.length;

	cardFaces = extractUniqueFaces(cardFaces);

	for (var i in cardFaces) {
		console.log(cardFaces[i] + ' -> ' + (count[cardFaces[i]] / n * 100).toFixed(2) + '%');
	}
}

findCardFrequency('8♥ 2♣ 4♦ 10♦ J♥ A♠ K♦ 10♥ K♠ K♦');
findCardFrequency('J♥ 2♣ 2♦ 2♥ 2♦ 2♠ 2♦ J♥ 2♠');
findCardFrequency('10♣ 10♥');