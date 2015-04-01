((function() {

    var urlBuilder = function () {
        var svurl = angular.module('svurl', []),
            self = this;

        svurl.service('apiService', self.apiService);

        svurl.controller('urlController', self.urlController);

        svurl.directive('urlPage', self.urlPage);
        svurl.directive('menuButton', self.menuButton);

        return {
            app: svurl
        };
    };

    urlBuilder.prototype.urlController = function ($window, apiService) {
        var url = this;

        url.pages = {
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
        };

        url.menu = [
            {
                class: 'shortener',
                img: 'dickbutt.png',
                targetUrl: 'url'
            },
            {
                class: 'charles',
                img: 'charles.jpg',
                targetUrl: 'crl'
            },
            {
                class: 'list',
                img: 'dickbutt.png',
                targetUrl: 'list'
            },
            {
                class: 'routes',
                img: 'dickbutt.png',
                targetUrl: 'routes'
            }
        ];

        url.insertUrl = function (newUrl, type) {
            apiService.postData({
                url:'/' + type,
                data: {
                    url: newUrl
                }
            }).success(function (response) {
                url.switchView('your short url is:', function (page) {
                    if (page.name === "result") {
                        page.visible = true;
                        page.value = $window.location.origin + '/' + response.type + '/' + response.shortUrl;
                    }
                });
            });
        };

        url.loadList = function () {
            apiService.getData({
                url: '/url',
            }).success(function (response) {
                url.list = response;
            });
        };

        url.loadRoutes = function () {
            apiService.getData({
                url: '/routes',
            }).success(function (response) {
                url.routes = response;
            });
        };

        url.getList = function () {
            return url.list;
        };

        url.getRoutes = function () {
            return url.routes;
        };

        url.loadRoutes();
        url.loadList();

        // TODO: WORK FROM HERE!, this handles the success callback!
        url.switchView = function (targetView, cb) {
            Object.keys(url.pages).forEach(function (page) {
                url.pages[page].visible = page === targetView ? true : false;
                if (cb) cb(url.pages[page]);
            });
        };
    };

    urlBuilder.prototype.menuButton = function () {
        return {
            scope: {
                class: '@',
                img: '@',
                targetUrl: '@',
                clickFn: '='
            },
            link: function (scope, elem, attr) {
            },
            restrict: 'EAC',
            replace: true,
            template: '<div class="button {{class}}" ng-click="clickFn(targetUrl)">' +
                    '<img ng-src="imgs/{{img}}"/>' +
                '</div>'
        };
    };

    urlBuilder.prototype.urlPage = function ($window, $rootScope) {
        return {
            scope: {
                key: '=',
                page: '=',
                clickFn: '=',
                listFn: '=',
                routesFn: '='
            },
            link: function (scope, elem, attr) {
                scope.restrictor = ['list', 'routes'];
                scope.location = $window.location.origin;
                if (scope.restrictor.indexOf(scope.key) > -1) {
                    scope.isList = true;
                    scope.$watch(scope[scope.key + 'Fn'], function (newVal) {
                        if (newVal) {
                            scope.list = newVal;
                        }
                    });
                }
            },
            restrict: 'EAC',
            replace: false,
            template: '<div class="page" ng-show="page.visible">' +
                    '<div>' +
                        '{{page.name}}' +
                    '</div>' +
                    '<div ng-if="page.input">' +
                        '<input type="text" name="{{page.input.url}}" class="url" id="{{page.input.url}}" ng-model="urlVal">' +
                        '<input type="button" class="submit" name="submit" target="{{page.input.url}}" value="Shorten!" ng-click="clickFn(urlVal, page.input.url)">' +
                    '</div>' +
                    '<div ng-if="page.name === \'result\'">' +
                        '<input type="text" name="result" class="url" id="newUrl" value="{{page.value}}">' +
                    '</div>' +
                    '<div ng-if="isList">' +
                        '<div ng-repeat="(key, item) in list">' +
                        '{{location}}{{key}} | {{item}}' +
                        '</div>' +
                    '</div>' +
                '</div>'
        };
    };

    urlBuilder.prototype.apiService = function ($http) {
        var data = function() {};

        function getData(data) {
            return $http.get(data.url, {});
        }
        function postData(data) {
            var sendData = data.data || {};
            return $http.post(data.url, sendData);
        }

        return {
            getData: getData,
            postData: postData
        };
    };

    window.svurl = new urlBuilder();

})());
