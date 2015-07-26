var core = {
        pages: {
        "url" : {
            name: "Shortener tool",
            visible: true,
            input: {
                url: 'url'
            }
        },
        "crl" : {
            name: "Charles' shortener tool",
            visible: false,
            input: {
                url: 'crl'
            }
        },
        "img" : {
            name: "Image upload tool",
            fileModel: "svImg",
            visible: false,
            input: {
                url: 'img'
            }
        },
        "result": {
            name: "your short url is:",
            visible: false
        },
        "list": {
            name: "All saved URLs",
            visible: false
        },
        'routes': {
            name: "API Routes",
            visible: false
        }
    }, menu: [
        {
            class: 'shortener',
            targetUrl: 'url'
        },
        {
            class: 'charles',
            targetUrl: 'crl'
        },
        {
            class: 'img',
            targetUrl: 'img'
        },
        {
            class: 'list',
            targetUrl: 'list'
        },
        {
            class: 'routes',
            targetUrl: 'routes'
        }
    ]
};

exports.handleGet = function (req, res) {
    "use strict";
    res.json({core: core});
};
