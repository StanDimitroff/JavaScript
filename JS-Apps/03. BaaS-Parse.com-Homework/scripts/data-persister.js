var app = app || {};

app.dataPersister = (function () {
    function Persiter(rootUrl) {
        this.countries = new Countries(rootUrl);
        this.towns = new Towns(rootUrl);
    }

    var Countries = (function () {
        function Countries(rootUrl) {
            this.targetUrl = rootUrl + 'Country';
        }

        Countries.prototype.getAllCountries = function () {
            return ajaxRequester.get(this.targetUrl);
        };

        Countries.prototype.addCountry = function (countryName) {
            return ajaxRequester.post(this.targetUrl, countryName);
        };

        Countries.prototype.editCountry = function (countryId, data) {
            return ajaxRequester.put(this.targetUrl + '/' + countryId, data);
        };

        Countries.prototype.deleteCountry = function (countryId) {
            return ajaxRequester.delete(this.targetUrl + '/' + countryId);
        };

        return Countries;
    }());

    var Towns = (function () {
        function Towns(rootUrl) {
            this.targetUrl = rootUrl + 'Town';
        }

        Towns.prototype.getTownByCountry = function (filterUrl) {
            return ajaxRequester.get(this.targetUrl + filterUrl);
        };

        Towns.prototype.addTownToCountry = function (townData) {
            return ajaxRequester.post(this.targetUrl, townData);
        };

        Towns.prototype.editTown = function (townId, data) {
            return ajaxRequester.put(this.targetUrl + '/' + townId, data)
        };

        Towns.prototype.deleteTown = function (townId) {
            return ajaxRequester.delete(this.targetUrl + '/' + townId);
        };

        return Towns;
    }());

    function getPersister(rootUrl) {
        return new Persiter(rootUrl);
    }

    return{
        get: getPersister
    }
}());
