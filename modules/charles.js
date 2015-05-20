var common = require('./dbCommon'),
    Crl = require('../models/crl');

exports.handleGet = function (req, res) {
    if (req.params.name) {
        Crl.findOne({name: req.params.name}, function (err, reply) {
            res.redirect(common.sanitizeUrl(reply));
        });
    } else {
        common.list(res, Crl);
    }
};

exports.handleInsert = function(req, res) {
    var sanitize = common.sanitizeUrl(req.body.url),
        checker = common.exists(sanitize);

    if (sanitize && checker) {
        res.json({
            message: 'Already exists',
            shortUrl: checker
        });
    } else {
        var newName = Math.random().toString(36).substring(6),

            crl = new Svurl({
            path: sanitize,
            name: newName
        });

        crl.save(function () {
            res.json({
                message: 'inserted successfuly',
                type: 'crl',
                shortUrl: newName
            });
        });
    }
};
