$(document).ready(function () {

    if (!localStorage['counter']) {
        localStorage['counter'] = 0;
    }
    if (!sessionStorage['counter']) {
        sessionStorage['counter'] = 0;
    }

    localStorage['counter']++;
    $('body').append($('<p>Total visits: ' + localStorage['counter'] + '</p>'));

    if (sessionStorage['name']) {
        $('#login').hide();
        sessionStorage['counter']++;
        $('body').append($('<p>Hello ' + sessionStorage['name'] + ' !' + '</p>'));
        $('body').append($('<p>Session visits: ' + sessionStorage['counter'] + '</p>'));
    }
    else {
        $('body').append($('<p>Please login</p>'));
    }

    $('#login').click(logIn);
    function logIn() {
        var name = $('#name').val();
        sessionStorage['name'] = name;
    }

    // imitate open the page in another tab, window or browser
    $('#clear-ss').click(function () {
        sessionStorage.clear();
    })
});