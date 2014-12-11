var app = app || {};

app.dataPersister = (function () {
    function Persiter(rootUrl) {
        this.questions = new Questions(rootUrl);
    }

    var Questions = (function () {
        function Questions(rootUrl) {
            this.targetUrl = rootUrl;
        }

        Questions.prototype.getAllQuestions = function () {
            return ajaxRequester.get(this.targetUrl);
        };

        Questions.prototype.getSingleQuestion = function(questionId){
            return ajaxRequester.get(this.targetUrl + '/' + questionId );
        };

        Questions.prototype.editQuestion = function (questionId, data) {
            return ajaxRequester.put(this.targetUrl + '/' + questionId, data);
        };


        return Questions;
    }());

    function getPersister(rootUrl) {
        return new Persiter(rootUrl);
    }

    return{
        get: getPersister
    }
}());