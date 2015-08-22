define([
    'pageModule',
    'apiService',
    'urlPage'
], function (module) {
    "use strict";
    var controller = function ($window, apiService) {
        var self = this;

        apiService.coreData.get().$promise.then(function (response) {
            angular.extend(self, response.core) ;
        });

        self.insertUrl = function (newUrl, type) {
            apiService.urls.post({
                url:'/' + type,
                data: {
                    url: newUrl
                }
            }).then(function () {
                module.switchView('result');
            });
        };

        self.load();

    };

    if (!module.register || !module.register.controller) {
        module.register = {};
        module.register.controller = module.controller;
    }

    module.register.controller('urlController', controller);
});