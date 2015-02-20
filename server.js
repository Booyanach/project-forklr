var express = require('express'),
    redis = require('redis'),
    app = express(),
    bodyParser = require('body-parser'),
    casual = require('casual'),
    sprintf=require('sprintf').sprintf,
    redisCli = redis.createClient(),
    fs=require('fs');

app.use(express.static(__dirname, '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);

};

app.post('/insert', function(req, resp) {
    if (req.body.url) {
        var newName = casual.sentence.split(' ').map(function (text) {
            text = text.replace(/[^a-zA-Z0-9 -]/g, "");
            return text.capitalize();
        }).join('');
        redisCli.set(newName, req.body.url, function() {
            resp.json({
                message: 'inserted successfuly',
                shortUrl: newName
            });
        });
    }
});

app.get('/url/:name', function(req, resp) {
    if (req.params.name) {
        redisCli.get(req.params.name, function(err, reply) {
            resp.redirect(reply);
        });
    }
});

app.get('/list', function (req, res) {
    redisCli.keys('*', function (err, keys) {
        returnObj = {};
        keys.map(function (key, idx) {
            redisCli.get(key, function(err, reply) {
                returnObj[key] = reply;
                if (idx === keys.length -1) {
                    res.json(returnObj);
                }
            });
        });
    });
});

app.listen(8087);

console.log('Express listening on port 80');