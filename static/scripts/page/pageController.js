define([
    'pageModule',
    'apiService',
    'urlPage',
    'menuButton'
], function (module) {
    "use strict";
    var pageController = function ($window, apiService) {
        var controller = this;

        apiService.coreData.get().$promise.then(function (response) {
            angular.extend(controller, response.core) ;
        });

        controller.insertUrl = function (newUrl, type) {
            apiService.urls.post({
                url:'/' + type,
                data: {
                    url: newUrl
                }
            }).then(function (response) {
                controller.switchView('result', function (page, pageObj) {
                    if (page === "result") {
                        pageObj.visible = true;
                        pageObj.value = $window.location.origin + '/' + response.type + '/' + response.shortUrl;
                    }
                });
            });
        };

        controller.uploadImg = function (file) {
            //apiService.postImg({
            //    url:'/img',
            //    data: {},
            //    file: file
            //}).success(function (response) {
            //    url.switchView('result', function (page, pageObj) {
            //        if (page === "result") {
            //            pageObj.visible = true;
            //            pageObj.value = $window.location.origin + '/img/' + response.shortUrl;
            //        }
            //    });
            //});
        };

        controller.load = function () {
            apiService.urls.get().$promise.then(function (response) {
                controller.list = response;
            });
            apiService.routes.get().$promise.then(function (response) {
                controller.routes = response;
            });
        };

        controller.getList = function () {
            return controller.list;
        };

        controller.getRoutes = function () {
            return controller.routes;
        };

        controller.load();

        // TODO: WORK FROM HERE!, this handles the success callback!
        controller.switchView = function (targetView, cb) {
            Object.keys(controller.pages).forEach(function (page) {
                controller.pages[page].visible = page === targetView;
                if (cb) cb(page, controller.pages[page]);
            });
        };
    };

    if (!module.register || !module.register.controller) {
        module.register = {};
        module.register.controller = module.controller;
    }

    module.register.controller('pageController', pageController);
});