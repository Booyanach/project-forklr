var express = require('express'),
    redis = require('redis'),
    app = express(),
    bodyParser = require('body-parser'),
    casual = require('casual'),
    sprintf=require('sprintf').sprintf,
    redisCli = redis.createClient(),
    fs=require('fs'),
    redisObj = {};

app.use(express.static(__dirname, '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);

};

// Init the Object
getList();

app.post('/insert', function(req, resp) {
    var checker = existsInRedis(req.body.url);
    console.log(checker);
    if (req.body.url && checker) {
        resp.json({
            message: 'Already exists',
            shortUrl: checker
        });
    } else {
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
    getList();
});

app.get('/url/:name', function(req, resp) {
    if (req.params.name) {
        redisCli.get(req.params.name, function(err, reply) {
            resp.redirect(reply);
        });
    }
});

app.get('/list', function (req, res) {
    getList(res);
});

function getList(res) {
    var returnObj = {},
        out = true;
    redisCli.keys('*', function (err, keys) {
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
}

function existsInRedis(url) {
    var returnKey = '';
    Object.keys(redisObj).filter(function (key) {
        if (redisObj[key] === url) returnKey = key;
    });
    return returnKey;
}

app.listen(8087);

console.log('Express listening on port 80');