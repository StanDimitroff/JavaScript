var app = app || {};
(function () {
    var rootUrl = 'https://api.parse.com/1/classes/';
    var persister = app.dataPersister.get(rootUrl);
    var controller = app.controller.get(persister);
    controller.loadCountries();
}());