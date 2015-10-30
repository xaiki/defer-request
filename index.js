var Q = require('q');
var querystring = require('querystring');
var request = require('request');

module.exports = function (url, params, hasQuestionMark) {
    var d = Q.defer();

    if (params !== undefined) {
        url += hasQuestionMark ? '&' : '?';
        url += querystring.stringify(params);
    }

    console.log('deferRequest', url, params, querystring.stringify(params));
    request({
        url: url,
        json: true
    }, function (error, response, data) {
        if (error) {
            d.reject(error);
        } else if (!data || (data.error && data.error !== 'No movies found')) {
            var err = data ? data.error : 'No data returned';
            d.reject(err);
        } else {
            d.resolve(data || []);
        }
    });

    return d.promise;
};
