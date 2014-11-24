function processRestaurantManagerCommands(commands) {
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

    String.prototype.isNullOrEmpty = function (varName) {
        if (typeof (this.valueOf()) != 'string') {
            throw new Error(varName + "must be String");
        }
        if (!this.valueOf()) {
            throw new Error(varName + " cannot be undefined or empty");
        }
    };

    var RestaurantEngine = (function () {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        var Restaurant = (function () {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this._recipes = [];
            }

            Restaurant.prototype.getName = function () {
                return this._name;
            };

            Restaurant.prototype.setName = function (name) {
                name.isNullOrEmpty('Restaurant name');
                this._name = name;
            };

            Restaurant.prototype.getLocation = function () {
                return this._location;
            };

            Restaurant.prototype.setLocation = function (location) {
                location.isNullOrEmpty('Location');
                this._location = location;
            };

            Restaurant.prototype.getRecipes = function () {
                return this._recipes;
            };

            Restaurant.prototype.addRecipe = function (recipe) {
                this.getRecipes().push(recipe);
            };

            Restaurant.prototype.removeRecipe = function (recipe) {
                this.getRecipes().splice(this._recipes.indexOf(recipe), 1);
            };

            Restaurant.prototype.printRestaurantMenu = function () {
                var result = '***** ' + this.getName()
                    + ' - ' + this.getLocation() + ' *****\n';
                if (this.getRecipes().length === 0) {
                    result += 'No recipes... yet\n';
                }
                else {
                    var ordered = this.getRecipes().sort(function (a, b) {
                        return a.getName().localeCompare(b.getName());
                    });

                    printExistingRecipeTypes(Drink, '~~~~~ DRINKS ~~~~~\n');
                    printExistingRecipeTypes(Salad, '~~~~~ SALADS ~~~~~\n');
                    printExistingRecipeTypes(MainCourse, '~~~~~ MAIN COURSES ~~~~~\n');
                    printExistingRecipeTypes(Dessert, '~~~~~ DESSERTS ~~~~~\n');
                }

                function printExistingRecipeTypes(recipe, header) {
                    var isHeaderPrinted;
                    for (var i in ordered) {
                        if (ordered[i] instanceof recipe) {
                            if (!isHeaderPrinted) {
                                result += header;
                                isHeaderPrinted = true;
                            }

                            result += ordered[i];
                        }
                    }
                }

                return result;
            };

            return Restaurant;
        }());

        var Recipe = (function () {
            function Recipe(name, price, calories, quantity, time) {
                if (this.constructor === Recipe) {
                    throw new Error("Can't instantiate abstract class Recipe");
                }

                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this.setTime(time);
            }

            Recipe.prototype.getName = function () {
                return this._name;
            };

            Recipe.prototype.setName = function (name) {
                name.isNullOrEmpty('Recipe name');
                this._name = name;
            };

            Recipe.prototype.getPrice = function () {
                return this._price.toFixed(2);
            };

            Recipe.prototype.setPrice = function (price) {
                if (price < 0) {
                    throw new Error('Price can not be negative!');
                }

                this._price = price;
            };

            Recipe.prototype.getCalories = function () {
                return this._calories;
            };

            Recipe.prototype.setCalories = function (calories) {
                if (calories < 0) {
                    throw new Error('Calories can not be negative!');
                }
                if (this instanceof Drink) {
                    if (calories > 100) {
                        throw new Error('Drink calories can not be greater than 100!');
                    }
                }

                this._calories = calories;
            };

            Recipe.prototype.getQuantity = function () {
                return this._quantity;
            };

            Recipe.prototype.setQuantity = function (quantity) {
                if (quantity < 0) {
                    throw new Error('Quantity can not be negative!');
                }

                this._quantity = quantity;
            };

            Recipe.prototype.getTime = function () {
                return this._time;
            };

            Recipe.prototype.setTime = function (time) {
                if (time < 0) {
                    throw new Error('Time to prepare can not be negative!');
                }
                if (this instanceof Drink) {
                    if (time > 20) {
                        throw new Error('Drink time to prepare can not be greater than 20!')
                    }
                }

                this._time = time;
            };

            Recipe.prototype.getUnit = function () {
                if (this instanceof Drink) {
                    return ' ml';
                }

                return ' g';
            };

            Recipe.prototype.toString = function () {
                return '==  ' + this.getName() + ' == $' + this.getPrice() + '\n'
                    + 'Per serving: ' + this.getQuantity()
                    + this.getUnit() + ', ' + this.getCalories() + ' kcal\n'
                    + 'Ready in ' + this.getTime() + ' minutes\n';
            };

            return Recipe;
        }());

        var Meal = (function () {
            function Meal(name, price, calories, quantity, time, isVegan) {
                if (this.constructor === Meal) {
                    throw new Error("Can't instantiate abstract class Meal");
                }

                Recipe.call(this, name, price, calories, quantity, time);
                this.setIsVegan(isVegan);
            }

            Meal.extends(Recipe);

            Meal.prototype.getIsVegan = function () {
                return this._isVegan;
            };

            Meal.prototype.setIsVegan = function (isVegan) {
                this._isVegan = isVegan;
            };

            Meal.prototype.toggleVegan = function () {
                if (this instanceof Salad) {
                    throw new Error('Salad should be always vegan!');
                }
                if (this.getIsVegan() === true) {
                    this.setIsVegan(false);
                } else {
                    this.setIsVegan(true);
                }
            };

            Meal.prototype.toString = function () {
                var vegan = this.getIsVegan() ? '[VEGAN] ' : '';
                return vegan + Recipe.prototype.toString.call(this);
            };

            return Meal;
        }());

        var Drink = (function () {
            function Drink(name, price, calories, quantity, time, isCarbonated) {

                Recipe.call(this, name, price, calories, quantity, time);
                this.setIsCarbonated(isCarbonated);
            }

            Drink.extends(Recipe);

            Drink.prototype.getIsCarbonated = function () {
                return this._isCarbonated;
            };

            Drink.prototype.setIsCarbonated = function (isCarbonated) {
                this._isCarbonated = isCarbonated;
            };

            Drink.prototype.toString = function () {
                var carbonated = this.getIsCarbonated() ? 'yes' : 'no';
                return Recipe.prototype.toString.call(this)
                    + 'Carbonated: ' + carbonated + '\n';
            };

            return Drink;
        }());

        var Salad = (function () {
            function Salad(name, price, calories, quantity, time, pasta) {

                Meal.call(this, name, price, calories, quantity, time);
                this.setPasta(pasta);
                this._isVegan = true;
            }

            Salad.extends(Meal);

            Salad.prototype.getPasta = function () {
                return this._pasta;
            };

            Salad.prototype.setPasta = function (pasta) {
                this._pasta = pasta;
            };

            Salad.prototype.toString = function () {
                var pasta = this.getPasta() ? 'yes' : 'no';
                return Meal.prototype.toString.call(this)
                    + 'Contains pasta: ' + pasta + '\n';
            };

            return Salad;
        }());

        var MainCourse = (function () {
            function MainCourse(name, price, calories, quantity, time, isVegan, type) {

                Meal.call(this, name, price, calories, quantity, time, isVegan);
                this.setType(type);
            }

            MainCourse.extends(Meal);

            MainCourse.prototype.getType = function () {
                return this._type;
            };

            MainCourse.prototype.setType = function (type) {
                this._type = type;
            };

            MainCourse.prototype.toString = function () {

                return Meal.prototype.toString.call(this)
                    + 'Type: ' + this.getType() + '\n';
            };

            return MainCourse;
        }());

        var Dessert = (function () {
            function Dessert(name, price, calories, quantity, time, isVegan) {

                Meal.call(this, name, price, calories, quantity, time, isVegan);
                this._withSugar = true;
            }

            Dessert.extends(Meal);

            Dessert.prototype.getWithSugar = function () {
                return this._withSugar;
            };

            Dessert.prototype.setWithSugar = function (sugar) {
                this._withSugar = sugar;
            };

            Dessert.prototype.toggleSugar = function () {
                if (this.getWithSugar() === true) {
                    this.setWithSugar(false);
                } else {
                    this.setWithSugar(true);
                }
            };

            Dessert.prototype.toString = function () {
                var hasSugar = this.getWithSugar() ? '' : '[NO SUGAR] ';
                return hasSugar + Meal.prototype.toString.call(this);
            };

            return Dessert;
        }());

        var Command = (function () {

            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function (commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function (e) {
                        return true
                    });

                parametersKeysAndValues.forEach(function (p) {
                    var split = p
                        .split("=")
                        .filter(function (e) {
                            return true;
                        });
                    self._params[split[0]] = split[1];
                });
            };

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
            }
        }
    });

    return results.trim();
}