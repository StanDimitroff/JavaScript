var app = app || {};

app.controller = function () {
    function Controller(dataPersister) {
        this.persister = dataPersister;
        this.addEventHandlers();
    }

    Controller.prototype.loadCountries = function () {
        var _this = this;
        _this.persister.countries.getAllCountries()
            .then(function (data) {
                _this.showCountries(data);
            })
    };

    Controller.prototype.showCountries = function (data) {
        var countriesWrapper = $('#countries');
        countriesWrapper.html('');
        $.each(data.results, function (_, value) {
            var country = $('<div>').addClass('country').appendTo(countriesWrapper);
            $('<button>').addClass('country-name').attr('country-id', value.objectId).text(value.name).appendTo(country);
            $('<button>').addClass('add-town').attr('country-id', value.objectId).text('Add Town').appendTo(country);
            $('<input type="text">').attr('placeholder', 'Town name').hide().appendTo(country);
            $('<button>').addClass('save-town').attr('country-id', value.objectId).text('Save').hide().appendTo(country);
            $('<button>').addClass('edit-country').text('Edit').appendTo(country);
            $('<input type="text">').attr('placeholder', 'Country name').hide().appendTo(country);
            $('<button>').addClass('save-country').attr('country-id', value.objectId).text('Save').hide().appendTo(country);
            $('<button>').addClass('delete-country').attr('country-id', value.objectId).text('Delete').appendTo(country);
        })
    };

    Controller.prototype.loadTownsByCountry = function(countryId){
        var _this = this;
        _this.persister.towns.getTownByCountry('?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}')
            .then(function(data){
                _this.showTowns(data);
            })
    };

    Controller.prototype.showTowns = function(data){
        var townsWrapper =  $('#towns');
        townsWrapper.html('');
        $.each(data.results, function(_, value){
            var town = $('<div>').addClass('town').appendTo(townsWrapper);
            $('<button>').addClass('town-name').attr('town-id', value.objectId).text(value.name).appendTo(town);
            $('<button>').addClass('edit-town').text('Edit').appendTo(town);
            $('<input type="text">').attr('placeholder', 'Town name').hide().appendTo(town);
            $('<button>').addClass('save-town').attr('town-id', value.objectId).data('country', value.country).text('Save').hide().appendTo(town);
            $('<button>').addClass('delete-town').attr('town-id', value.objectId).data('country', value.country).text('Delete').appendTo(town);
            townsWrapper.fadeIn('slow');
        })
    };

    Controller.prototype.addEventHandlers = function () {
        var _this = this;
        var eventCountriesWrapper = $('#countries');
        var eventTownsWrapper = $('#towns');

        // add country
        $('#add-country').click(function () {
            $(this).next().fadeIn('slow');
            $(this).next().next().fadeIn('slow');
        });

        $('#add').click(function () {
            var countryName = {
                name: htmlEntities($(this).prev().val())
            };
            _this.persister.countries.addCountry(countryName)
                .then(function () {
                    _this.loadCountries();

                });
            $(this).hide();
            $(this).prev().hide();
        });

        // edit country
        eventCountriesWrapper.on('click', '.edit-country', function () {
            $(this).next().fadeIn('slow');
            $(this).next().next().fadeIn('slow');
        });

        eventCountriesWrapper.on('click', '.save-country', function () {
            var countryId = $(this).attr('country-id');
            var countryData = {
                name: htmlEntities($(this).prev().val())
            };
            _this.persister.countries.editCountry(countryId, countryData)
                .then(function () {
                    _this.loadCountries();
                })
        });

        // delete country
        eventCountriesWrapper.on('click', '.delete-country', function () {
            var countryId = $(this).attr('country-id');
            _this.persister.countries.deleteCountry(countryId)
                .then(function () {
                    _this.loadCountries();
                })
        });

        // load towns by country
        eventCountriesWrapper.on('click','.country-name', function(){
            var countryId = $(this).attr('country-id');
            _this.loadTownsByCountry(countryId);
        });

        // add town
        eventCountriesWrapper.on('click', '.add-town', function(){
           $(this).next().fadeIn('slow');
           $(this).next().next().fadeIn('slow');
        });

        eventCountriesWrapper.on('click', '.save-town', function(){
           var townName = htmlEntities( $(this).prev().val());
            var countryId = $(this).attr('country-id');
            var townData = {
                'name': townName,
                'country': {
                    "__type": "Pointer",
                    "className": "Country",
                    "objectId": countryId
                }
            };
            _this.persister.towns.addTownToCountry(townData)
                .then(function(){
                    _this.loadTownsByCountry(countryId);
                });
            $(this).hide();
            $(this).prev().hide();
        });

        // edit town
        eventTownsWrapper.on('click', '.edit-town', function(){
            $(this).next().fadeIn('slow');
            $(this).next().next().fadeIn('slow');
        });

        eventTownsWrapper.on('click', '.save-town', function(){
            var townId = $(this).attr('town-id');
            var countryId = $(this).data('country').objectId;
            var townName = $(this).prev().val();
            var townData = {
               name:htmlEntities(townName)
            };
            _this.persister.towns.editTown(townId, townData)
                .then(function(){
                    _this.loadTownsByCountry(countryId);
                })
        });

        // delete town
        eventTownsWrapper.on('click', '.delete-town', function(){
            var townId = $(this).attr('town-id');
            var countryId = $(this).data('country').objectId;
            _this.persister.towns.deleteTown(townId)
                .then(function(){
                    _this.loadTownsByCountry(countryId);
                })
        })
    };

    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getController(dataPersister) {
        return new Controller(dataPersister);
    }

    return {
        get: getController
    }
}();