/*You are given an array of books. Using Underscore.js, perform the following operations:
 •	Group all books by language and sort them by author (if two books have the same author, sort by price)
 •	Get the average book price for each author
 •	Get all books in English or German, with price below 30.00, and group them by author
 */

_ = require('./node_modules/underscore/underscore.js');

var books = [
    {"book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "34,24", "language": "French"},
    {"book": "The Great Gatsby", "author": "F. Scott Fitzgerald", "price": "39,26", "language": "English"},
    {"book": "Nineteen Eighty-Four", "author": "George Orwell", "price": "15,39", "language": "English"},
    {"book": "Ulysses", "author": "James Joyce", "price": "23,26", "language": "German"},
    {"book": "Lolita", "author": "Vladimir Nabokov", "price": "14,19", "language": "German"},
    {"book": "Catch-22", "author": "Joseph Heller", "price": "47,89", "language": "German"},
    {"book": "The Catcher in the Rye", "author": "J. D. Salinger", "price": "25,16", "language": "English"},
    {"book": "Beloved", "author": "Toni Morrison", "price": "48,61", "language": "French"},
    {"book": "Of Mice and Men", "author": "John Steinbeck", "price": "29,81", "language": "Bulgarian"},
    {"book": "Animal Farm", "author": "George Orwell", "price": "38,42", "language": "English"},
    {"book": "Finnegans Wake", "author": "James Joyce", "price": "29,59", "language": "English"},
    {"book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "42,94", "language": "English"}
];

function groupByLanguage(books) {
    _.chain(books)
        .sortBy(function (book) {
            return book.author || book.price;
        })
        .groupBy('language')
        .each(console.log)
}

function getAverageBookPriceByAuthor(books) {
    var averagePrices = {};
    var groupedByAuthor = _.groupBy(books, 'author');

    for (var i in groupedByAuthor) {
        averagePrices[i] = getAveragePrice(groupedByAuthor[i]);
    }

    function getAveragePrice(authorBooks) {
        var bookPrice = 0;
        for (var i in authorBooks) {
            bookPrice += parseFloat(authorBooks[i].price.replace(',', '.'));
        }

        return (bookPrice / authorBooks.length).toFixed(2);
    }

    _.each(averagePrices, function (averagePrice, author) {
        console.log(author + ': ' + averagePrice)
    })
}

function groupByAuthor(books) {
    _.chain(books)
        .filter(function (book) {
            return (book.language === 'English' || book.language === 'German') && parseFloat(book.price) < 30.00;
        })
        .groupBy('author')
        .each(function (book) {
            console.log(book)
        })
}

// uncomment the commented lines one by one to see the result

//groupByLanguage(books);
//getAverageBookPriceByAuthor(books);
//groupByAuthor(books);