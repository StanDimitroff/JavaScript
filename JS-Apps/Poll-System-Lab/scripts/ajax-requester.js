var ajaxRequester = (function () {
    var headers = {
        "X-Parse-Application-Id": "iBituPKwCXbf6hLfKIRBfOXYgy7SQGXtIRCBJcx0",
        "X-Parse-REST-API-Key": "oEgiSGRzTSdeMnBq513xSqtr7O3vhWJJaOzkKIGa"
    };
    var performRequest = function (method, url, data) {
        var deferred = $.Deferred();
        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });

        return deferred.promise();
    };

    function performGetRequest(url) {
        return performRequest('GET', url, null);
    }

    function performPostRequest(url, data) {
        return performRequest('POST', url, data);
    }

    function performPutRequest(url, data) {
        return performRequest('PUT', url, data);
    }

    function performDeleteRequest(url) {
        return performRequest('DELETE', url, null);
    }

    return{
        get: performGetRequest,
        post: performPostRequest,
        put: performPutRequest,
        delete: performDeleteRequest
    }
}());