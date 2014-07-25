//Write a JavaScript function findMostFreqWord(value) that finds the most frequent word in a text and prints it, as well as how many times it appears in format "word -> count". Consider any non-letter character as a word separator. Ignore the character casing. If several words have the same maximal frequency, print all of them in alphabetical order. Write JS program frequentWord.js that invokes your function with the sample input data below and prints the output at the console.

function findMostFreqWord (str) {
	var words = str.toLowerCase().split(/[\s.,]+/);
	 if (words[words.length - 1] === '') {
        words.pop();
    }
 	var count=[];
	for (var i in words) {
		if (words[i] in count == true) {
			count[words[i]]++;
		} else {
			count[words[i]] = 1;
		}
	}
	var maxCount = 0,
        resultWords = [];

    for (var key in count) {
        if (maxCount < count[key]) {
            maxCount = count[key];
            resultWords = [];
            resultWords.push(key);
        } else if (maxCount === count[key]) {
            resultWords.push(key);
        }
    }

    resultWords.sort();
    for (i in resultWords) {
        console.log(resultWords[i] + ' -> ' + maxCount + ' times') 
    }

}

findMostFreqWord('in the middle of the night');
findMostFreqWord('Welcome to SoftUni. Welcome to Java. Welcome everyone.');
findMostFreqWord('Hello my friend, hello my darling. Come on, come here. Welcome, welcome darling.');