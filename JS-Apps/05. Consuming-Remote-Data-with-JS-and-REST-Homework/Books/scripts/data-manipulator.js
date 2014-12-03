var application = application || {};

application.dataManipulator = (function () {
    function Manipulator(rootUrl) {
        this.books = new Books(rootUrl);
    }

    var Books = (function () {
        function Books(rootUrl) {
            this.targetUrl = rootUrl;
        }

        Books.prototype.getAllBooks = function () {
            return ajaxRequester.get(this.targetUrl);
        };

        Books.prototype.getSingleBook = function (filter) {
            return ajaxRequester.get(this.targetUrl + filter)
        };

        Books.prototype.addBook = function (book) {
            return ajaxRequester.post(this.targetUrl, book);
        };

        Books.prototype.editBook = function (bookId, data) {
            return ajaxRequester.put(this.targetUrl + '/' + bookId, data);
        };

        Books.prototype.deleteBook = function (bookId) {
            return ajaxRequester.delete(this.targetUrl + '/' + bookId);
        };

        return Books;
    }());

    function getManipulator(rootUrl) {
        return new Manipulator(rootUrl);
    }

    return{
        get: getManipulator
    }
}());