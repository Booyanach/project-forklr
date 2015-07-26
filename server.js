var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    common = require('./modules/dbCommon'),
    svurl = require('./modules/svurl'),
    core = require('./modules/core'),
    svimg = require('./modules/svimg'),
    charles = require('./modules/charles');

mongoose.connect('mongodb://localhost:27017/svurl');

app.use(express.static(__dirname, '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Init the Object
//common.list();

app.route('/urls')
    .get(svurl.handleGet)
    .post(svurl.handleInsert);

app.route('/urls/:name')
    .get(svurl.handleGet);

app.route('/crl')
    .get(charles.handleGet)
    .post(charles.handleInsert);

app.route('/crl/:name')
    .get(charles.handleGet);

app.route('/routes')
    .get(listRoutes);

app.route('/img')
    .get(svimg.handleGet)
    .post(svimg.handleInsert);

app.route('/core')
    .get(core.handleGet);

function listRoutes(req, res) {
    var returnObj = {};

    app._router.stack.map(function (item) {
        if (item.route && item.route.path) {
                returnObj[item.route.path] = item.route.stack.map(function(elem){
                        return elem.method;
                });
        }
    });
    res.json(returnObj);
}

app.listen(8087);

console.log('Express listening on port 80, endpoints available at /routes');