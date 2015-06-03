var common = require('./dbCommon'),
    Img = require('../models/image');

exports.handleGet = function (req, res) {
    if (req.params.name) {
        Img.findOne({name: req.params.name}, function (err, reply) {
            res.redirect(common.sanitizeUrl(reply));
        });
    } else {
        common.list(res, Img);
    }
};

exports.handleInsert = function(req, res) {
    console.log(req.body);
    res.json({'success':'success'});
    // var sanitize = common.sanitizeUrl(req.body.url),
    //     checker = common.exists(sanitize);

    // if (sanitize && checker) {
    //     res.json({
    //         message: 'Already exists',
    //         shortUrl: checker
    //     });
    // } else {
    //     var newName = Math.random().toString(36).substring(6),

    //         img = new Img({
    //         path: sanitize,
    //         name: newName
    //     });

    //     img.save(function () {
    //         res.json({
    //             message: 'inserted successfuly',
    //             type: 'img',
    //             shortUrl: newName
    //         });
    //     });
    // }
};
