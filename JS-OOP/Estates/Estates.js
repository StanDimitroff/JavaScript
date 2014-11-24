function processEstatesAgencyCommands(commands) {

    'use strict';

    Object.prototype.extends = function (parent) {
        if (!Object.create) {
            Object.prototype.create = function (proto) {
                function F() {
                }

                F.prototype = proto;
                return new F;
            };
        }

        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };


    var Estate = (function () {
        function Estate(name, area, location, isFurnitured) {
            if (this.constructor === Estate) {
                throw new Error("Can't instantiate abstract class Estate!");
            }

            this.setName(name);
            this.setArea(area);
            this.setLocation(location);
            this.setIsFurnitured(isFurnitured);
        }

        Estate.prototype.getName = function () {
            return this._name;
        };

        Estate.prototype.setName = function (name) {
            if (name === '') {
                throw new Error('Name can not be empty!');
            }

            this._name = name;
        };

        Estate.prototype.getLocation = function () {
            return this._location;
        };

        Estate.prototype.setLocation = function (location) {
            if (location === '') {
                throw new Error('Location can not be empty!');
            }

            this._location = location;
        };

        Estate.prototype.getArea = function () {
            return this._area;
        };

        Estate.prototype.setArea = function (area) {
            if (area % 1 != 0) {
                throw new Error('Area should be integer!');
            }
            if (area < 1 || area > 10000) {
                throw new Error('Area should be in range 1 - 10000!');
            }

            this._area = area;
        };

        Estate.prototype.getIsFurnitured = function () {
            return this._isFurnitured;
        };

        Estate.prototype.setIsFurnitured = function (isFurnitured) {
            if (!typeof Boolean(isFurnitured)) {
                throw new Error('isFurnitured should be true or false!');
            }

            this._isFurnitured = isFurnitured;
        };

        Estate.prototype.toString = function () {
            var furnitured = this.getIsFurnitured() ? 'Yes' : 'No';
            return this.constructor.name + ': ' + 'Name = ' + this.getName() +
                ', Area = ' + this.getArea() +
                ', Location = ' + this.getLocation() + ', Furnitured = ' + furnitured;
        };

        return Estate;
    }());

    var BuildingEstate = (function () {
        function BuildingEstate(name, area, location, isFurnitured, rooms, hasElevator) {
            if (this.constructor === BuildingEstate) {
                throw new Error("Can't instantiate abstract class BuildingEstate!");
            }

            Estate.call(this, name, area, location, isFurnitured);
            this.setRooms(rooms);
            this._hasElevator = hasElevator;
        }

        BuildingEstate.extends(Estate);

        BuildingEstate.prototype.getRooms = function () {
            return this._rooms;
        };

        BuildingEstate.prototype.setRooms = function (rooms) {
            if (rooms % 1 != 0) {
                throw new Error('Rooms should be integer!');
            }
            if (rooms < 0 || rooms > 100) {
                throw new Error('Rooms should be in range 0 - 100!');
            }

            this._rooms = rooms;
        };

        BuildingEstate.prototype.toString = function () {
            var elevator = this._hasElevator ? 'Yes' : 'No';
            return Estate.prototype.toString.call(this) + ', Rooms: ' + this.getRooms() +
                ', Elevator: ' + elevator;
        };

        return BuildingEstate;
    }());

    var Apartment = (function () {
        function Apartment(name, area, location, isFurnitured, rooms, hasElevator) {
            BuildingEstate.call(this, name, area, location, isFurnitured, rooms, hasElevator);
        }

        Apartment.extends(BuildingEstate);

        Apartment.prototype.toString = function () {
            return BuildingEstate.prototype.toString.call(this);
        };

        return Apartment;
    }());

    var Office = (function () {
        function Office(name, area, location, isFurnitured, rooms, hasElevator) {
            BuildingEstate.call(this, name, area, location, isFurnitured, rooms, hasElevator);
        }

        Office.extends(BuildingEstate);

        Office.prototype.toString = function () {
            return  BuildingEstate.prototype.toString.call(this);
        };

        return Office;
    }());


    var House = (function () {
        function House(name, area, location, isFurnitured, floors) {
            Estate.call(this, name, area, location, isFurnitured);
            this.setFloors(floors);
        }

        House.extends(Estate);

        House.prototype.getFloors = function () {
            return this._floors;
        };

        House.prototype.setFloors = function (floors) {
            if (floors % 1 != 0) {
                throw new Error('Floors should be integer!');
            }
            if (floors < 1 || floors > 10) {
                throw new Error('Floors should be in range 1 - 10!');
            }

            this._floors = floors;
        };

        House.prototype.toString = function () {
            return Estate.prototype.toString.call(this) + ', Floors: ' + this.getFloors();
        };

        return House;
    }());

    var Garage = (function () {
        function Garage(name, area, location, isFurnitured, width, height) {
            Estate.call(this, name, area, location, isFurnitured);
            this.setWidth(width);
            this.setHeight(height);
        }

        Garage.extends(Estate);

        Garage.prototype.getWidth = function () {
            return this._width;
        };

        Garage.prototype.getHeight = function () {
            return this._height;
        };

        Garage.prototype.setWidth = function (width) {
            if (width % 1 != 0) {
                throw new Error('Width should be integer!');
            }
            if (width < 1 || width > 500) {
                throw  new Error('Width should be in range 1 - 500!');
            }

            this._width = width;
        };

        Garage.prototype.setHeight = function (height) {
            if (height % 1 != 0) {
                throw new Error('Height should be integer!');
            }
            if (height < 1 || height > 500) {
                throw  new Error('Height should be in range 1 - 500!');
            }

            this._height = height;
        };

        Garage.prototype.toString = function () {
            return Estate.prototype.toString.call(this) + ', Width: ' + this.getWidth() +
                ', Height: ' + this.getHeight();
        };

        return Garage;
    }());

    var Offer = (function () {
        function Offer(estate, price) {
            if (this.constructor === Offer) {
                throw new Error("Can't instantiate abstract class Offer!");
            }

            this.setEstate(estate);
            this.setPrice(price);
        }

        Offer.prototype.getEstate = function () {
            return this._estate;
        };

        Offer.prototype.setEstate = function (estate) {
            if (estate == undefined) {
                throw new Error('Invalid estate!');
            }

            this._estate = estate;
        };

        Offer.prototype.getPrice = function () {
            return this._price;
        };

        Offer.prototype.setPrice = function (price) {
            if (price % 1 != 0) {
                throw new Error('Price should be integer!');
            }
            if (price < 0 || price == null) {
                throw new Error('Price can not be negative or null!');
            }

            this._price = price
        };

        Offer.prototype.toString = function () {
            return 'Estate = ' + this._estate.getName() + ', Location = ' + this._estate._location +
                ', Price = ' + this._price;
        };

        return Offer;
    }());

    var RentOffer = (function () {
        function RentOffer(estate, price) {
            Offer.call(this, estate, price);
        }

        RentOffer.extends(Offer);

        RentOffer.prototype.toString = function () {
            return 'Rent: ' + Offer.prototype.toString.call(this);
        };

        return RentOffer;
    }());

    var SaleOffer = (function () {
        function SaleOffer(estate, price) {
            Offer.call(this, estate, price);
        }

        SaleOffer.extends(Offer);

        SaleOffer.prototype.toString = function () {
            return 'Sale: ' + Offer.prototype.toString.call(this);
        };

        return SaleOffer;
    }());


    var EstatesEngine = (function () {
        var _estates;
        var _uniqueEstateNames;
        var _offers;

        function initialize() {
            _estates = [];
            _uniqueEstateNames = {};
            _offers = [];
        }

        function executeCommand(command) {
            var cmdParts = command.split(' ');
            var cmdName = cmdParts[0];
            var cmdArgs = cmdParts.splice(1);
            switch (cmdName) {
                case 'create':
                    return executeCreateCommand(cmdArgs);
                case 'status':
                    return executeStatusCommand();
                case 'find-sales-by-location':
                    return executeFindSalesByLocationCommand(cmdArgs[0]);
                case 'find-rents-by-location':
                    return executeFindRentByLocationCommand(cmdArgs[0]);
                case 'find-rents-by-price':
                    return executeFindRentsByPriceCommand(cmdArgs[0], cmdArgs[1]);
                default:
                    throw new Error('Unknown command: ' + cmdName);
            }
        }

        function executeCreateCommand(cmdArgs) {
            var objType = cmdArgs[0];
            switch (objType) {
                case 'Apartment':
                    var apartment = new Apartment(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), parseBoolean(cmdArgs[6]));
                    addEstate(apartment);
                    break;
                case 'Office':
                    var office = new Office(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), parseBoolean(cmdArgs[6]));
                    addEstate(office);
                    break;
                case 'House':
                    var house = new House(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]));
                    addEstate(house);
                    break;
                case 'Garage':
                    var garage = new Garage(cmdArgs[1], Number(cmdArgs[2]), cmdArgs[3],
                        parseBoolean(cmdArgs[4]), Number(cmdArgs[5]), Number(cmdArgs[6]));
                    addEstate(garage);
                    break;
                case 'RentOffer':
                    var estate = findEstateByName(cmdArgs[1]);
                    var rentOffer = new RentOffer(estate, Number(cmdArgs[2]));
                    addOffer(rentOffer);
                    break;
                case 'SaleOffer':
                    estate = findEstateByName(cmdArgs[1]);
                    var saleOffer = new SaleOffer(estate, Number(cmdArgs[2]));
                    addOffer(saleOffer);
                    break;
                default:
                    throw new Error('Unknown object to create: ' + objType);
            }
            return objType + ' created.';
        }

        function parseBoolean(value) {
            switch (value) {
                case "true":
                    return true;
                case "false":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        function findEstateByName(estateName) {
            for (var i = 0; i < _estates.length; i++) {
                if (_estates[i].getName() == estateName) {
                    return _estates[i];
                }
            }

            return undefined;
        }

        function addEstate(estate) {
            if (_uniqueEstateNames[estate.getName()]) {
                throw new Error('Duplicated estate name: ' + estate.getName());
            }
            _uniqueEstateNames[estate.getName()] = true;
            _estates.push(estate);
        }

        function addOffer(offer) {
            _offers.push(offer);
        }

        function executeStatusCommand() {
            var result = '', i;
            if (_estates.length > 0) {
                result += 'Estates:\n';
                for (i = 0; i < _estates.length; i++) {
                    result += "  " + _estates[i].toString() + '\n';
                }
            } else {
                result += 'No estates\n';
            }

            if (_offers.length > 0) {
                result += 'Offers:\n';
                for (i = 0; i < _offers.length; i++) {
                    result += "  " + _offers[i].toString() + '\n';
                }
            } else {
                result += 'No offers\n';
            }

            return result.trim();
        }

        function executeFindSalesByLocationCommand(location) {
            if (!location) {
                throw new Error("Location cannot be empty.");
            }
            var selectedOffers = _offers.filter(function (offer) {
                return offer.getEstate().getLocation() === location &&
                    offer instanceof SaleOffer;
            });

            selectedOffers.sort(function (a, b) {
                return a.getEstate().getName().localeCompare(b.getEstate().getName());
            });

            return formatQueryResults(selectedOffers);
        }

        function executeFindRentByLocationCommand(location) {
            if (!location) {
                throw new Error("Location cannot be empty.");
            }
            var selectedOffers = _offers.filter(function (offer) {
                return offer.getEstate().getLocation() === location &&
                    offer instanceof RentOffer;
            });

            selectedOffers.sort(function (a, b) {
                return a.getEstate().getName().localeCompare(b.getEstate().getName());
            });

            return formatQueryResults(selectedOffers);
        }

        function executeFindRentsByPriceCommand(minPrice, maxPrice) {
            if (!minPrice || !maxPrice) {
                throw new Error('Price can not be empty!');
            }
            if (minPrice % 1 != 0 || maxPrice % 1 != 0) {
                throw new Error('Price should be integer!');
            }
            var selectedOffers = _offers.filter(function (offer) {
                return offer.getPrice() >= minPrice && offer.getPrice() <= maxPrice &&
                    offer instanceof RentOffer;
            });

            selectedOffers.sort(function (a, b) {
                return a.getPrice() - b.getPrice() ||
                    a.getEstate().getName().localeCompare(b.getEstate().getName());
            });

            return formatQueryResults(selectedOffers);
        }

        function formatQueryResults(offers) {
            var result = '';
            if (offers.length == 0) {
                result += 'No Results\n';
            } else {
                result += 'Query Results:\n';
                for (var i = 0; i < offers.length; i++) {
                    var offer = offers[i];
                    result += '  [Estate: ' + offer.getEstate().getName() +
                        ', Location: ' + offer.getEstate().getLocation() +
                        ', Price: ' + offer.getPrice() + ']\n';
                }
            }

            return result.trim();
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());

    // Process the input commands and return the results
    var results = '';
    EstatesEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != '') {
            try {
                var cmdResult = EstatesEngine.executeCommand(cmd);
                results += cmdResult + '\n';
            } catch (err) {
                //console.log(err);
                results += 'Invalid command.\n';
            }
        }
    });

    return results.trim();
}