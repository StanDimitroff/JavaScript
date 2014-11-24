/*You are given an HTML file. Write a function that traverses all child elements of an element by a given CSS
 selector and prints all found elements in the format:
 <Element name>: id="<id>", class="<class>"
 Print each element on a new line. Indent child elements.
 */

function traverseChildElements(selector) {
    var element = document.querySelector(selector);
    const parentElement = element;

    traverseNode(element, '');
    function traverseNode(element, spacing) {
        spacing = spacing || '  ';

        var result = spacing + element.tagName.toLowerCase() + ': ';
        if (element.hasAttribute('id')) {
            result += 'id="' + element.id + '"' + ' ';
        }
        if (element.hasAttribute('class')) {
            result += 'class="' + element.className + '"' + ' ';
        }
        if(parentElement !== element){
            console.log(result);
        }

        var length = element.childNodes.length;
        for (var i = 0; i < length; i++) {
            var child = element.childNodes[i];
            if (child.nodeType === document.ELEMENT_NODE) {
                traverseNode(child, spacing + '  ');
            }
        }
    }
}

traverseChildElements('.birds');