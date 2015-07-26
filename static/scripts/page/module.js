define([
    'angular',
    'forklr'
], function(ng, forklr) {
    'use strict';

    var module = null;

    try {
        module = ng.module('forklr.page');
    } catch (e) {
        module = ng.module('forklr.page', []);

        module.config(function($compileProvider, $controllerProvider, $provide) {
            module.register = {
                controller: $controllerProvider.register,
                service : $provide.service,
                factory : $provide.factory,
                provider : $compileProvider.provider,
                directive : $compileProvider.directive,
                decorator : $provide.decorator
            };
        });
    }

    forklr.requires.push('forklr.page');

    return module;
});