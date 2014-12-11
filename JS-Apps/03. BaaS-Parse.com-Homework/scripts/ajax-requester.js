var ajaxRequester = (function () {
    var headers = {
        "X-Parse-Application-Id": "8diE4NYboyOkd2eDwfU0OHG9ly4t8xMtaFKVnYFe",
        "X-Parse-REST-API-Key": "TvHUff6Pt6Els9xVhIXcxp3Z7c92yTXVDdcPRpaA"
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