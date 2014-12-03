$(document).ready(function () {
    var timer = 60;
    var answer1 = $('#answers1');
    var answer2 = $('#answers2');
    var answer3 = $('#answers3');
    var results = $('#results');
    results.hide();

    var interval = setInterval(function () {
        timer--;
        $('#timer').text('Time left: ' + timer + ' sec');
        if (timer < 0) {
            clearInterval(interval);
            $('#timer').text('Time out!');
            showAnswers();
        }
    }, 1000);

    $('#submit-btn').click(function () {
        clearInterval(interval);
        showAnswers();
    });

    answer1.change(function () {
        localStorage.answer1 = $(this).val();
    });
    answer2.change(function () {
        localStorage.answer2 = $(this).val();
    });
    answer3.change(function () {
        localStorage.answer3 = $(this).val();
    });

    function showAnswers() {
        if (localStorage.answer1) {
            $('#usr-answers').append($('<li>').text(localStorage.answer1));
        }
        if (localStorage.answer2) {
            $('#usr-answers').append($('<li>').text(localStorage.answer2));
        }
        if (localStorage.answer3) {
            $('#usr-answers').append($('<li>').text(localStorage.answer3));
        }

        $('#correct-answers').append($('<li>').text('C'));
        $('#correct-answers').append($('<li>').text('A'));
        $('#correct-answers').append($('<li>').text('B'));

        results.show();
    }
});