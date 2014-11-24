/*Create a jQuery plugin for fading in/fading out a message box. The plugin should support:
 •	Creating a message box (a div holding some text)
 •	Showing a success/error message in the box
 o	Showing is done by setting the opacity of the message from 0 to 1 in an interval of 1 second
 o	The message should disappear after 3 seconds
 */

(function ($) {
    $.fn.messageBox = function () {
        var $this = $(this);

        function createBox() {
            return $('<div></div>');
        }

        function success(message) {
            var successBox = createBox();
            successBox.addClass('success').css('background', 'green');
            successBox.append('<p>' + message + '</p>').hide();
            $this.append(successBox);
        }

        function error(message) {
            var errorBox = createBox();
            errorBox.addClass('error').css('background', 'red');
            errorBox.append('<p>' + message + '</p>').hide();
            $this.append(errorBox);
        }

        $('#success').click(function () {
            var box = $('.success');
            box.fadeIn('slow');
            setTimeout(function () {
                box.fadeOut('slow')
            }, 3000)
        });

        $('#error').click(function () {
            var box = $('.error');
            box.fadeIn('slow');
            setTimeout(function () {
                box.fadeOut('slow')
            }, 3000)
        });

        return{
            success: success,
            error: error
        }
    }
}(jQuery));

$(document).ready(function () {
    var messageBox = $('#message-box').messageBox();
    messageBox.success('Success message');
    messageBox.error('Error message');
});