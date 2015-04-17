var common = require('./redisCommon');

exports.handleGet = function (req, res) {
    if (req.params.name) {
        common.redisCli.get('crl:' + req.params.name, function(err, reply) {
            res.redirect(sanitizeUrl(reply));
        });
    } else {
        common.getList(res, 'crl:*');
    }
};

exports.handleInsert = function(req, res) {
    var sanitize = sanitizeUrl(req.body.url),
        checker = common.existsInRedis(sanitize);

    if (sanitize && checker) {
        res.json({
            message: 'Already exists',
            shortUrl: checker
        });
    } else {
        var newName = Math.random().toString(36).substring(6);
        common.redisCli.set('crl:' + newName, sanitize, function() {
            res.json({
                message: 'inserted successfuly',
                type: 'crl',
                shortUrl: newName
            });
        });
    }
    common.getList();
};

function sanitizeUrl(url){
    var regex = new RegExp(/(http|https):\/\//g);
    if (!regex.test(url)) {
        url = 'http://' + url;
    }
    return url;
}