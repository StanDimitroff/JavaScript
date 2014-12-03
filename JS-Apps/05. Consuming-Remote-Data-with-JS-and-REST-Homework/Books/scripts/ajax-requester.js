var ajaxRequester = (function () {
    var headers = {
        'X-Parse-Application-Id': 'SFu8Kf48ufJVxPZLGFr2cHE90c3cdKdcwyjJWy3y',
        'X-Parse-REST-API-Key': '4GqoDvbClNLd4EkOFXM1lsOYSdAuDdr2h903FxzZ'
    };
    var performRequest = function (method, url, data) {
        // no need to pass success and error handlers, we use 'return' to use promises in controller later
           return $.ajax({
                method: method,
                headers: headers,
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json'
            });
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