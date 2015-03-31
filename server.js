var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    common = require('./modules/redisCommon'),
    svurl = require('./modules/svurl'),
    charles = require('./modules/charles');


app.use(express.static(__dirname, '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Init the Object
common.getList();

app.route('/url*')
    .get(svurl.handleGet)
    .post(svurl.handleInsert);

app.route('/crl*')
    .get(charles.handleGet)
    .post(charles.handleInsert);

app.route('/routes')
    .get(listRoutes);

function listRoutes(req, res) {
    var returnArr = app._router.stack.map(function (item) {
            return (item.route && item.route.path) ? item.route.path : false;
        }).filter(function (item) {return item ? item : false;});

    res.json(returnArr);
}

app.listen(8087);

console.log('Express listening on port 80, endpoints available at /routes');