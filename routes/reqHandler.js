/**
 * handles rest and service calls
 * and resolve response by service results
 */

var errors      = require('restify-errors');

/**
 * constructs response using successfull result of service
 * @param {*} serviceResult
 * @returns {Object} object with 'result' and success 'status'
 */
function constructResponse(serviceResult) {
    var result = {
        'body': (serviceResult && serviceResult.body) || serviceResult || null,
        'headers': (serviceResult && serviceResult.headers) || {},
        'status': 200
    };
    return result;
}

function safelySetHeaders(res, headers) {
    if (res.headersSent) return;

    res.header(headers);
}

/**
 * resolves an exception to appropriate response
 * @param {KoreError} e
 * @returns {Object} with 'body' and 'status' keys
 */
function constructErrorResponse(e) {
    if (!(e instanceof Error)) {
        console.warn('WARNING: Expecting Error, but got %s',
                JSON.stringify(e) || (e.toString && e.toString() || 'invalid argument'));
    }

    if ((errors[e.name] === undefined)|| !e.statusCode) {
        //something went really wrong?
        e = new errors.UnknownError();
    }
    var errResponse = e.toJSON();
    return errResponse;
}

/**
 * helper for rest api
 * resolves Promise returning services to json responses
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} req
 * @param {Promise} serviceP
 * @returns {Promise} promise to resolve service result to response
 */
function reqHandler (req, res, serviceP) {
    return serviceP
        .then(constructResponse)
        .catch(function(error) {
            var errResponse = constructErrorResponse(error);
            return errResponse;
        })
        .then(function (result) {
            safelySetHeaders(res, result.headers);
            res.status(result.status).send(result.body);
        });

}



exports.reqHandler         = reqHandler;

