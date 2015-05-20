exports.onerror = function (message, error) {
    return {message: message, error: error, status: 'ERROR'};
};

exports.onok = function (message) {
    return {message: message, status: 'OK'};
};

exports.onreturn = function (data) {
    return {data: data, status: 'OK'};
};