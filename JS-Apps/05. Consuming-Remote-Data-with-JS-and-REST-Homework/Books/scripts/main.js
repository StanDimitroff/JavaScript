(function(){
    var rootUrl = 'https://api.parse.com/1/classes/Book';
    var manipulator = application.dataManipulator.get(rootUrl);
    var controller = application.controller.get(manipulator);
    controller.loadBooks('#books-list');
}());