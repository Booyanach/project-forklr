define([
    'coreModule'
], function (module) {
    "use strict";

    var apiService = function ($resource) {

        var self = this;

        self.coreData = $resource('/core');
        self.routes = $resource('/routes');
        self.urls = $resource('/urls/:urlId', {urlId: '@urlId'});
        self.images = $resource('/imgs/:imgId', {imgId: '@imgId'}, {
            post: {
                method: 'POST',
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }
        });
    };

    // Just in case it decides to fuck up module initialization
    if(!module.register || !module.register.service) {
        module.register = {};
        module.register.service = module.service;
    }

    module.register.service('apiService', apiService);
});