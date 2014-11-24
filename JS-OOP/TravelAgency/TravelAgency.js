function processTravelAgencyCommands(commands) {
    'use strict';

    var Models = (function () {
        var Destination = (function () {
            function Destination(location, landmark) {
                this.setLocation(location);
                this.setLandmark(landmark);
            }

            Destination.prototype.getLocation = function () {
                return this._location;
            };

            Destination.prototype.setLocation = function (location) {
                if (location === undefined || location === "") {
                    throw new Error("Location cannot be empty or undefined.");
                }

                this._location = location;
            };

            Destination.prototype.getLandmark = function () {
                return this._landmark;
            };

            Destination.prototype.setLandmark = function (landmark) {
                if (landmark === undefined || landmark == "") {
                    throw new Error("Landmark cannot be empty or undefined.");
                }

                this._landmark = landmark;
            };

            Destination.prototype.toString = function () {
                return this.constructor.name + ": " +
                    "location=" + this.getLocation() +
                    ",landmark=" + this.getLandmark();
            };

            return Destination;
        }());

        Object.prototype.inherits = function (parent) {
            this.prototype = Object.create(parent.prototype);
            this.prototype.constructor = this;
        };

        Object.prototype.isNumber = function (field) {
            if (field ^ 0 == field) {
                return true;
            }

            return false;
        };

        var Travel = (function () {
            function Travel(name, startDate, endDate, price) {
                if (this.constructor === Travel) {
                    throw new Error('Cannot instantiate abstract class Travel.');
                }

                this.setName(name);
                this.setStartDate(startDate);
                this.setEndDate(endDate);
                this.setPrice(price);
            }

            Travel.prototype.getName = function () {
                return this._name;
            };

            Travel.prototype.setName = function (name) {
                if (name === undefined || name === '') {
                    throw new Error('The field name should be a non-empty string.');
                }

                this._name = name;
            };

            Travel.prototype.getStartDate = function () {
                return formatDate(this._startDate);
            };

            Travel.prototype.setStartDate = function (startDate) {
                if (startDate === undefined || !startDate instanceof Date) {
                    throw new Error('Start date should be a non-empty date object.');
                }

                this._startDate = startDate;
            };

            Travel.prototype.getEndDate = function () {
                return formatDate(this._endDate);
            };

            Travel.prototype.setEndDate = function (endDate) {
                if (endDate === undefined || !endDate instanceof Date) {
                    throw new Error('End date should be a non-empty date object.');
                }

                this._endDate = endDate;
            };

            Travel.prototype.getPrice = function () {
                return this._price.toFixed(2);
            };

            Travel.prototype.setPrice = function (price) {
                if (price === undefined || !this.isNumber(price)) {
                    throw new Error('The field price should be numeric.');
                }
                if (price < 0) {
                    throw new Error('The field price can not be negative.');
                }

                this._price = price;
            };

            Travel.prototype.toString = function () {
                return '* ' + this.constructor.name + ': ' +
                    'name=' + this.getName() +
                    ',start-date=' + this.getStartDate() +
                    ',end-date=' + this.getEndDate() +
                    ',price=' + this.getPrice();
            };

            return Travel;
        })();

        var Excursion = (function () {
            function Excursion(name, startDate, endDate, price, transport) {
                Travel.call(this, name, startDate, endDate, price);
                this.setTransport(transport);
                this._destinations = [];
            }

            Excursion.inherits(Travel);

            Excursion.prototype.getTransport = function () {
                return this._transport;
            };

            Excursion.prototype.setTransport = function (transport) {
                if (transport === undefined || transport === '') {
                    throw new Error('The field transport should be a non-empty string.')
                }

                this._transport = transport;
            };

            Excursion.prototype.getDestinations = function () {
                return this._destinations;
            };

            Excursion.prototype.addDestination = function (destination) {
                this.getDestinations().push(destination);
            };

            Excursion.prototype.removeDestination = function (destination) {
                if (this.getDestinations().indexOf(destination) === -1) {
                    throw new Error('This destination not exist.');
                }

                this.getDestinations().splice(this.getDestinations().indexOf(destination), 1);
            };

            Excursion.prototype.toString = function () {
                var result = '\n** Destinations: ';
                if (this.getDestinations().length === 0) {
                    result += '-';
                }
                else {
                    for (var i = 0; i < this.getDestinations().length; i++) {
                        result += this.getDestinations()[i];

                        if (i != this.getDestinations().length - 1) {
                            result += ';';
                        }
                    }
                }

                return Travel.prototype.toString.call(this) +
                    ',transport=' + this.getTransport() + result;
            };

            return Excursion;
        }());

        var Vacation = (function () {
            function Vacation(name, startDate, endDate, price, location, accommodation) {
                Travel.call(this, name, startDate, endDate, price);
                this.setLocation(location);
                this.setAccommodation(accommodation);
            }

            Vacation.inherits(Travel);

            Vacation.prototype.getLocation = function () {
                return this._location;
            };

            Vacation.prototype.setLocation = function (location) {
                if (location === undefined || location === '') {
                    throw new Error('The field location should be a non-empty string.');
                }

                this._location = location;
            };

            Vacation.prototype.getAccommodation = function () {
                return this._accommodation;
            };

            Vacation.prototype.setAccommodation = function (accommodation) {
                if (accommodation === '') {
                    throw new Error('The field accommodation should be a non-empty string.');
                }

                this._accommodation = accommodation;
            };

            Vacation.prototype.toString = function () {
                if (this.getAccommodation() === undefined) {
                    return Travel.prototype.toString.call(this) +
                        ',location=' + this.getLocation()
                }

                return Travel.prototype.toString.call(this) +
                    ',location=' + this.getLocation() +
                    ',accommodation=' + this.getAccommodation();
            };

            return Vacation;
        })();

        var Cruise = (function () {
            var CRUISE_TRANSPORT = "cruise liner";

            function Cruise(name, startDate, endDate, price, transport, startDock) {
                Excursion.call(this, name, startDate, endDate, price, CRUISE_TRANSPORT, startDock);
                this.setStartDock(startDock);
            }

            Cruise.inherits(Excursion);

            Cruise.prototype.getStartDock = function () {
                return this._startDock;
            };

            Cruise.prototype.setStartDock = function (startDock) {
                if (startDock !== undefined || startDock === '') {
                    throw new Error('The field startDock should be a non-empty string.');
                }

                this._startDock = startDock;
            };

            Cruise.prototype.toString = function () {

                return Excursion.prototype.toString.call(this);
            };

            return Cruise;
        }());

        return {
            Destination: Destination,
            Travel: Travel,
            Excursion: Excursion,
            Vacation: Vacation,
            Cruise: Cruise
        }
    }());


    var TravellingManager = (function () {
        var _travels;
        var _destinations;

        function init() {
            _travels = [];
            _destinations = [];
        }

        var CommandProcessor = (function () {

            function processInsertCommand(command) {
                var object;

                switch (command["type"]) {
                    case "excursion":
                        object = new Models.Excursion(
                            command["name"],
                            parseDate(command["start-date"]),
                            parseDate(command["end-date"]),
                            parseFloat(command["price"]),
                            command["transport"]);
                        _travels.push(object);
                        break;
                    case "vacation":
                        object = new Models.Vacation(
                            command["name"],
                            parseDate(command["start-date"]),
                            parseDate(command["end-date"]),
                            parseFloat(command["price"]),
                            command["location"],
                            command["accommodation"]);
                        _travels.push(object);
                        break;
                    case "cruise":
                        object = new Models.Cruise(
                            command["name"],
                            parseDate(command["start-date"]),
                            parseDate(command["end-date"]),
                            parseFloat(command["price"]),
                            command["start-dock"]);
                        _travels.push(object);
                        break;
                    case "destination":
                        object = new Models.Destination(
                            command["location"],
                            command["landmark"]);
                        _destinations.push(object);
                        break;
                    default:
                        throw new Error("Invalid type.");
                }

                return object.constructor.name + " created.";
            }

            function processDeleteCommand(command) {
                var object,
                    index,
                    destinations;

                switch (command["type"]) {
                    case "destination":
                        object = getDestinationByLocationAndLandmark(
                            command["location"],
                            command["landmark"]);
                        _travels.forEach(function (t) {
                            if (t instanceof Models.Excursion &&
                                t.getDestinations().indexOf(object) !== -1) {
                                t.removeDestination(object);
                            }
                        });
                        index = _destinations.indexOf(object);
                        _destinations.splice(index, 1);
                        break;
                    case "excursion":
                    case "vacation":
                    case "cruise":
                        object = getTravelByName(command["name"]);
                        index = _travels.indexOf(object);
                        _travels.splice(index, 1);
                        break;
                    default:
                        throw new Error("Unknown type.");
                }

                return object.constructor.name + " deleted.";
            }

            function processListCommand(command) {
                return formatTravelsQuery(_travels);
            }

            function processAddDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(
                        command["location"],
                        command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }

                travel.addDestination(destination);

                return "Added destination to " + travel.getName() + ".";
            }

            function processRemoveDestinationCommand(command) {
                var destination = getDestinationByLocationAndLandmark(
                        command["location"],
                        command["landmark"]),
                    travel = getTravelByName(command["name"]);

                if (!(travel instanceof Models.Excursion)) {
                    throw new Error("Travel does not have destinations.");
                }

                travel.removeDestination(destination);

                return "Removed destination from " + travel.getName() + ".";
            }

            function getTravelByName(name) {
                var i;

                for (i = 0; i < _travels.length; i++) {
                    if (_travels[i].getName() === name) {
                        return _travels[i];
                    }
                }

                throw new Error("No travel with such name exists.");
            }

            function getDestinationByLocationAndLandmark(location, landmark) {
                var i;

                for (i = 0; i < _destinations.length; i++) {
                    if (_destinations[i].getLocation() === location
                        && _destinations[i].getLandmark() === landmark) {
                        return _destinations[i];
                    }
                }

                throw new Error("No destination with such location and landmark exists.");
            }

            function processFilterTravelsCommand(command) {
                function checkType(type) {
                    switch (type) {
                        case 'excursion':
                            return 'Excursion';
                        case 'vacation':
                            return 'Vacation';
                        case 'cruise':
                            return 'Cruise';
                    }
                }

                var type = command['type'];
                var minPrice = parseFloat(command['price-min']);
                var maxPrice = parseFloat(command['price-max']);
                var filteredByType;
                if (type !== 'all') {
                    filteredByType = _travels.filter(function (travel) {
                        return  travel.constructor.name === checkType(type);
                    });
                }
                else {
                    filteredByType = _travels;
                }

                var filteredByPrice = filteredByType.filter(function (travel) {
                    return travel.getPrice() >= minPrice && travel.getPrice() <= maxPrice;
                });
                filteredByPrice.sort(function (a, b) {
                    return a.getStartDate() - b.getStartDate()
                        || a.getName().localeCompare(b.getName());
                });

                return formatTravelsQuery(filteredByPrice);
            }

            function formatTravelsQuery(travelsQuery) {
                var queryString = "";

                if (travelsQuery.length > 0) {
                    queryString += travelsQuery.join("\n");
                } else {
                    queryString = "No results.";
                }

                return queryString;
            }

            return {
                processInsertCommand: processInsertCommand,
                processDeleteCommand: processDeleteCommand,
                processListCommand: processListCommand,
                processAddDestinationCommand: processAddDestinationCommand,
                processRemoveDestinationCommand: processRemoveDestinationCommand,
                processFilterTravelsCommand: processFilterTravelsCommand
            }
        }());

        var Command = (function () {
            function Command(cmdLine) {
                this._cmdArgs = processCommand(cmdLine);
            }

            function processCommand(cmdLine) {
                var parameters = [],
                    matches = [],
                    pattern = /(.+?)=(.+?)[;)]/g,
                    key,
                    value,
                    split;

                split = cmdLine.split("(");
                parameters["command"] = split[0];
                while ((matches = pattern.exec(split[1])) !== null) {
                    key = matches[1];
                    value = matches[2];
                    parameters[key] = value;
                }

                return parameters;
            }

            return Command;
        }());

        function executeCommands(cmds) {
            var commandArgs = new Command(cmds)._cmdArgs,
                action = commandArgs["command"],
                output;

            switch (action) {
                case "insert":
                    output = CommandProcessor.processInsertCommand(commandArgs);
                    break;
                case "delete":
                    output = CommandProcessor.processDeleteCommand(commandArgs);
                    break;
                case "add-destination":
                    output = CommandProcessor.processAddDestinationCommand(commandArgs);
                    break;
                case "remove-destination":
                    output = CommandProcessor.processRemoveDestinationCommand(commandArgs);
                    break;
                case "list":
                    output = CommandProcessor.processListCommand(commandArgs);
                    break;
                case "filter":
                    output = CommandProcessor.processFilterTravelsCommand(commandArgs);
                    break;
                default:
                    throw new Error("Unsupported command.");
            }

            return output;
        }

        return {
            init: init,
            executeCommands: executeCommands
        }
    }());

    var parseDate = function (dateStr) {
        if (!dateStr) {
            return undefined;
        }
        var date = new Date(Date.parse(dateStr.replace(/-/g, ' ')));
        var dateFormatted = formatDate(date);
        if (dateStr != dateFormatted) {
            throw new Error("Invalid date: " + dateStr);
        }

        return date;
    };

    var formatDate = function (date) {
        var day = date.getDate();
        var monthName = date.toString().split(' ')[1];
        var year = date.getFullYear();
        return day + '-' + monthName + '-' + year;
    };

    var output = "";
    TravellingManager.init();

    commands.forEach(function (cmd) {
        var result;
        if (cmd != "") {
            try {
                result = TravellingManager.executeCommands(cmd) + "\n";
            } catch (e) {
                result = "Invalid command." + "\n";
            }

            output += result;
        }
    });

    return output;
}