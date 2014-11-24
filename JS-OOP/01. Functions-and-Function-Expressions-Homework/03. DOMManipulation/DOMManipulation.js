/*Create an IIFE module for working with the DOM tree. The module should support the following operations:
 •	Adding а DOM element to a parent element specified by selector
 •	Removing a child element from a parent specified by selector
 •	Attaching an event to a given selector by given event type and event handler
 •	Retrieving elements by a given CSS selector
 The module should reveal only its methods (i.e. everything else should be encapsulated).
 */

var domModule = (function () {

    var appendChildElement = function (element, selector) {
        var parent = document.querySelector(selector);
        parent.appendChild(element);
    };

    var removeChildElement = function (parentSelector, childSelector) {
        var parent = document.querySelector(parentSelector);
        var child = document.querySelector(childSelector);
        parent.removeChild(child);
    };

    var addEventHandler = function (selector, event, executedFunction) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(event, executedFunction);
        }
    };

    var retrieveElements = function (selector) {
        return document.querySelectorAll(selector);
    };

    return{
        appendChildElement: appendChildElement,
        removeChildElement: removeChildElement,
        addEventHandler: addEventHandler,
        retrieveElements: retrieveElements
    }
}());

var liElement = document.createElement("li");

domModule.appendChildElement(liElement, '.birds-list');
domModule.removeChildElement('ul.birds-list', 'li:first-child');
domModule.addEventHandler('li.bird', 'click', function () {
    alert("I'm a bird!")
});

var elements = domModule.retrieveElements(".bird");
for (var i in elements) {
    console.log(elements[i]);
}