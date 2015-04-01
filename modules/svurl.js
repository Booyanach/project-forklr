var common = require('./redisCommon'),
    words = require('./words'),
    rant = require('rantjs');

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

exports.handleGet = function (req, res) {
    if (req.params.name) {
        common.redisCli.get(req.params.name, function(err, reply) {
            res.redirect(reply);
        });
    } else {
        common.getList(res, '[^crl:]*');
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
        var newName = rant(words.generateString()).split(' ').map(function (text) {
                text = text.replace(/[^a-zA-Z0-9 -]/g, "");
                return text.capitalize();
            }).join('');

        common.redisCli.set(newName, req.body.url, function() {
            res.json({
                message: 'inserted successfuly',
                type: 'url',
                shortUrl: newName
            });
        });
    }
    common.getList();
};