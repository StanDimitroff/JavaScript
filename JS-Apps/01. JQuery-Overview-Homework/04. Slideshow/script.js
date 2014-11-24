/*Create a slideshow using jQuery:
 The slider should have several slides
 Only one slide is visible at a time
 Each slide can contain HTML code
 It can contain images, forms, divs, headers, links, etc.
 Implement functionality for the visible slide to automatically change to the next one after 5 seconds
 Create buttons for next and previous slide
 */

$(document).ready(function () {
    'use strict';

    var interval = setInterval(function () {
        nextClick();

    }, 5000);

    function stopChange() {
        clearInterval(interval);
    }

    var firstSlide = $('img').first();
    var lastSlide = $('img').last();
    var currentSlide = $('.current');

    // hide all images except first
    $('img:not(.current)').hide();

    $('#prev').click(previousClick).click(stopChange);

    function previousClick() {
        if (!currentSlide.is(firstSlide)) {
            var prevSlide = $(currentSlide).prev();
            currentSlide.removeClass('current');
            $(currentSlide).fadeOut('slow');
            $(prevSlide).fadeIn('slow');
            currentSlide = prevSlide;
            currentSlide.addClass('current');
        }
    }

    $('#next').click(nextClick).click(stopChange);

    function nextClick() {
        if (!currentSlide.is(lastSlide)) {
            var nextSlide = $(currentSlide).next();
            currentSlide.removeClass('current');
            $(currentSlide).fadeOut('slow');
            $(nextSlide).fadeIn('slow');
            currentSlide = nextSlide;
            currentSlide.addClass('current');
        }
    }
});