var db = require('mongoose'),
    handler = require('./jsonHandler'),
    cacheObj = {};

exports.list = function (res, type) {
    type.find(function (err, components) {
        if (err) res.json(handler.onerror('failed to list ' + type.type + '!', err));
        cacheObj = components;
        res.json(handler.onreturn(components));
    });
};

exports.exists = function () {
    var returnKey = '';
    Object.keys(cacheObj).filter(function (key) {
        if (cacheObj[key] === url) returnKey = key;
    });
    return returnKey;
};

exports.sanitizeUrl = function(url){
    var regex = new RegExp(/(http|https):\/\//g);
    if (!regex.test(url)) {
        url = 'http://' + url;
    }
    return url;
};