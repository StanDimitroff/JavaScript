var application = application || {};
(function () {
    var rootUrl = 'https://api.parse.com/1/classes/Book';
    var manipulator = application.dataManipulator.get(rootUrl);
    var controller = application.controller.get(manipulator);

    application.router = Sammy(function () {
        this.get('#/', function () {
            controller.loadBooks();
        });
    });

    application.router.run('#/');
}());