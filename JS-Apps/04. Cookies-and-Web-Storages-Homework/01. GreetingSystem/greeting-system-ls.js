$(document).ready(function () {

    if (!localStorage.counter) {
        localStorage.counter = 0;
    }
    if (!sessionStorage.counter) {
        sessionStorage.counter = 0;
    }

    localStorage.counter++;
    $('body').append($('<p>Total visits: ' + localStorage.counter + '</p>'));

    if (localStorage.name) {
        $('#login').hide();
        sessionStorage.counter++;
        $('body').append($('<p>Hello ' + localStorage.name + ' !' + '</p>'));
        $('body').append($('<p>Session visits: ' + sessionStorage.counter + '</p>'));
    }
    else {
        $('body').append($('<p>Please login</p>'));
    }

    $('#login').click(logIn);
    function logIn() {
        var name = $('#name').val();
        localStorage.name = name;
    }

    // imitate open the page in another tab or window only
    $('#clear-ss').click(function () {
        sessionStorage.clear();
    });

    // imitate open the page in another browser
    $('#clear-ls').click(function () {
        localStorage.clear();
    })
});