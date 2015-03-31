var redis = require('redis'),
    redisCli = redis.createClient(),
    redisObj = {};

exports.getList = function (res, find) {
    var returnObj = {},
        out = true;
    redisCli.keys(find, function (err, keys) {
        keys.map(function (key, idx) {
            redisCli.get(key, function(err, reply) {
                returnObj[key] = reply;
                if (idx === keys.length -1) {
                    redisObj = returnObj;
                    if (res) res.json(returnObj);
                }
            });
        });
    });
};

exports.existsInRedis = function (url) {
    var returnKey = '';
    Object.keys(redisObj).filter(function (key) {
        if (redisObj[key] === url) returnKey = key;
    });
    return returnKey;
};

exports.redisCli = redisCli;