var common = require('./redisCommon');

exports.handleGet = function (req, res) {
    if (req.params.name) {
        common.redisCli.get('crl:' + req.params.name, function(err, reply) {
            res.redirect(reply);
        });
    } else {
        common.getList(res, 'crl:*');
    }
};

exports.handleInsert = function(req, res) {
    var checker = common.existsInRedis(req.body.url);

    if (req.body.url && checker) {
        res.json({
            message: 'Already exists',
            shortUrl: checker
        });
    } else {
        var newName = Math.random().toString(36).substring(6);
        common.redisCli.set('crl:' + newName, req.body.url, function() {
            res.json({
                message: 'inserted successfuly',
                type: 'crl',
                shortUrl: newName
            });
        });
    }
    common.getList();
};