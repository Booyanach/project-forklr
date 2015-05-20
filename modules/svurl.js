var common = require('./dbCommon'),
    Svurl = require('../models/url'),
    words = require('./words'),
    rant = require('rantjs');

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

exports.handleGet = function (req, res) {
    if (req.params.name) {
        Svurl.findOne({name: req.params.name}, function (err, reply) {
            res.redirect(common.sanitizeUrl(reply));
        });
    } else {
        common.list(res, Svurl);
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
        var newName = rant(words.generateString()).split(' ').map(function (text) {
                text = text.replace(/[^a-zA-Z0-9 -]/g, "");
                return text.capitalize();
            }).join(''),

            svurl = new Svurl({
            path: sanitize,
            name: newName
        });

        svurl.save(function () {
            res.json({
                message: 'inserted successfuly',
                type: 'url',
                shortUrl: newName
            });
        });
    }
};
