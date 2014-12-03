var application = application || {};

application.controller = function () {
    function Controller(dataManipulator) {
        this.manipulator = dataManipulator;
        this.addEventHandlers();
    }

    Controller.prototype.loadBooks = function () {
        this.manipulator.books.getAllBooks()
            .success(function (data) {
                listBooks(data);
            })
            .fail(function () {
                showMessage('Cannot load books', 'error');
            })
    };

    function listBooks(data) {
        for (var i = 0; i < data.results.length; i++) {
            var book = data.results[i];
            addBookToContainer(book, '#books-list');
        }
    }

    function addBookToContainer(book, selector) {
        var bookContainer = $('<div id="book"/>');
        bookContainer.append($('<div>').text(decodeURI(book.title)).addClass('title'));
        bookContainer.append($('<div>').text(decodeURI(book.author)).addClass('author'));
        bookContainer.append($('<div>').text(decodeURI(book.isbn)).addClass('isbn'));
        for (var i in book.tags) {
            bookContainer.append($('<div>').text(decodeURI(book.tags[i])).addClass('tag').append($('<div>').append($('<input type="button" class="delete-tag-button" value="x">'))));
        }
        bookContainer.append($('<div>').append($('<button class="edit-book-button">Edit</button>').addClass('options')));
        bookContainer.append($('<div>').append($('<button class="delete-book-button">Delete</button>').addClass('options')));
        bookContainer.attr('data-id', book.objectId);

        $(selector).append(bookContainer);
    }

    Controller.prototype.addEventHandlers = function () {
        var _this = this;

        // add book
        //todo add validation on input fields
        $('#add-book-button').on('click', function () {
            var title = $('#add-book-title');
            var author = $('#add-book-author');
            var isbn = $('#add-book-isbn');
            var tags = $('#add-book-tags');
            var book = {
                title: encodeURI(title.val()),
                author: encodeURI(author.val()),
                isbn: encodeURI(isbn.val()),
                tags: {"__op": "AddUnique", "objects": tags.val().split(', ')}
            };
            _this.manipulator.books.addBook(book)
                .success(function (data) {
                    _this.manipulator.books.getSingleBook('?where={"objectId":"' + data.objectId + '"}')
                        .success(function (data) {
                            listBooks(data);
                            title.val('');
                            author.val('');
                            isbn.val('');
                            tags.val('');
                        })
                        .fail(function () {
                            showMessage('Cannot show book', 'error');
                        })
                }, showMessage('Book successfully added', 'success'))
                .fail(function () {
                    showMessage('Cannot add book', 'error');
                })
        });

        // load data to edit
        $('#books-list').on('click', '.edit-book-button', function () {
            var bookId = $(this).parent().parent().attr('data-id');
            $('#edit-book').attr('book-id', bookId);
            var title = $('#edit-book-title').val($(this).parent().parent().children().first().text());
            var author = $('#edit-book-author').val($(this).parent().parent().children().first().next().text());
            var isbn = $('#edit-book-isbn').val($(this).parent().parent().children().first().next().next().text());

            $(this).parent().parent().addClass('remove');
        });

        // edit book
        $('#edit-book').click(function () {
            var title = $('#edit-book-title');
            var author = $('#edit-book-author');
            var isbn = $('#edit-book-isbn');
            var tags = $('#edit-book-tags');
            var book = {
                title: encodeURI(title.val()),
                author: encodeURI(author.val()),
                isbn: encodeURI(isbn.val()),
                tags: {"__op": "AddUnique", "objects": tags.val().split(', ')}
            };
            var bookId = $(this).attr('book-id');
            _this.manipulator.books.editBook(bookId, book)
                .success(function () {
                    _this.manipulator.books.getSingleBook('?where={"title":"' + encodeURI(book.title) + '"}')
                        .success(function (data) {
                            $('.remove').remove();
                            listBooks(data);
                            title.val('');
                            author.val('');
                            isbn.val('');
                            tags.val('');
                        })
                        .fail(function () {
                            showMessage('Cannot show book', 'error');
                        })
                }, showMessage('Book successfully edited', 'success'))
                .fail(function () {
                    showMessage('Cannot edit book', 'error')
                })
        });

        // delete book
        $('#books-list').on('click', '.delete-book-button', function (event) {
            var bookId = $(this).parent().parent().attr('data-id');
            _this.manipulator.books.deleteBook(bookId)
                .success(function () {
                    $(event.target).parent().parent().remove();
                }, showMessage('Book successfully deleted', 'success'))
                .fail(function () {
                    showMessage('Cannot delete book', 'error');
                })
        });

        // delete tag
        $('#books-list').on('click', '.delete-tag-button', function (event) {
            var bookId = $(this).parent().parent().parent().attr('data-id');
            var tag = $(this).parent().parent().text();
            var book = {
                tags: {"__op": "Remove", "objects": [tag]}
            };
            _this.manipulator.books.editBook(bookId, book)
                .success(function () {
                    $(event.target).parent().parent().remove();
                    showMessage('Tag successfully removed', 'success');
                })
                .fail(function () {
                    showMessage('Cannot remove tag', 'error');
                })
        })
    };

    function showMessage(message, type) {
        noty({
            text: '<h2>' + message + '<h2>',
            layout: 'center',
            timeout: 2000,
            type: type
        })
    }

    function getController(dataManipulator) {
        return new Controller(dataManipulator);
    }

    return {
        get: getController
    }
}();