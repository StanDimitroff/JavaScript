/*Create a jQuery plugin for creating a TreeView:
 •	A TreeView contains several items
 •	Each item may contain items of its own
 •	Clicking on an item shows/hides its direct children
 */

(function ($) {
    'use strict';
    $.fn.treeView = function () {
        var $this = $(this);
        $this.children().hide();

        $.each($this, function (key, value) {

            var element = $(value);

            element.click(function () {
                if (element.hasClass('opened')) {
                    element.children().hide('slow');
                    element.removeClass('opened');
                } else {
                    element.children().show('slow');
                    element.addClass('opened');
                }

                event.stopPropagation();
            });
        });
    }
}(jQuery));

$(document).ready(function () {
    $('li').treeView();
});