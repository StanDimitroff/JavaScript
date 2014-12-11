var app = app || {};

app.controller = function () {
    function Controller(dataPersister) {
        this.persister = dataPersister;
        this.addEventHandlers();
    }

    Controller.prototype.loadQuestions = function () {
        var _this = this;
        _this.persister.questions.getAllQuestions()
            .then(function (data) {
                _this.showQuestions(data);
            })
    };

    Controller.prototype.showQuestions = function (data) {
        $.each(data.results, function (_, value) {
            $('<li>').attr('question-id', value.objectId).append($('<div>').text(value.questionText)).appendTo($('#questions'));
            $('<form>').addClass('form').attr('question-id', value.objectId).appendTo($("li[question-id='" + value.objectId + "']"));
            $.each(value.answers, function (answer) {
                $('<input type="radio" name="answer">').addClass('answer').attr('value', answer).appendTo($("form[question-id='" + value.objectId + "']"));
                $('<label>').text(answer).appendTo($("form[question-id='" + value.objectId + "']"));
                $("form[question-id='" + value.objectId + "']").append($('<br>'));
            });

            $('<button id="voteButton">').addClass('submit').attr('question-id', value.objectId).text('Vote').appendTo("li[question-id='" + value.objectId + "']");
        })
    };

    Controller.prototype.voteForAnswer = function (data, answer) {
        var _this = this;
        $.each(data.answers, function (key, value) {
            if (key.indexOf(answer) !== -1) {
                data.answers[key] = value + 1;
            }
        });
        var questionData = {
            answers: data.answers
        };
        _this.persister.questions.editQuestion(data.objectId, questionData)
            .then(function () {
                _this.persister.questions.getSingleQuestion(data.objectId)
                    .then(function (data) {
                        _this.showVotes(data);
                    })
            })
    };

    Controller.prototype.showVotes = function (data) {
        var votesWrapper = $('#results');
        votesWrapper.html('');

        $('<div>').append($('<ul>').addClass('votes-list')).text(data.questionText).appendTo(votesWrapper);
        $.each(data.answers, function (key, value) {
            $('<li>').append($('<div class="answer">').text(key)).append($('<div class="percents">').text(value).css('width', value + '%')).appendTo(votesWrapper);
        });
        $('<button id="backButton">').text('Back to Polls').appendTo(votesWrapper);
    };

    Controller.prototype.addEventHandlers = function () {
        var _this = this;
        var answer;
        var questionId;
        var eventWrapper = $('#questions');
        eventWrapper.on('click', '.answer', function () {
            answer = $(this).val();
        });
        eventWrapper.on('click', '.submit', function () {
            questionId = $(this).attr('question-id');
            _this.persister.questions.getSingleQuestion(questionId)
                .then(function (data) {
                    _this.voteForAnswer(data, answer);
                });
        });
    };

    function getController(dataPersister) {
        return new Controller(dataPersister);
    }

    return {
        get: getController
    }
}();