define([
    'angular',
    'forklr'
], function(ng, forklr) {
    'use strict';

    var module = null;

    try {
        module = ng.module('forklr.core');
    } catch (e) {
        module = ng.module('forklr.core', []);

        module.config(function($compileProvider, $controllerProvider, $provide, $stateProvider, $urlRouterProvider) {
            module.register = {
                controller: $controllerProvider.register,
                service : $provide.service,
                factory : $provide.factory,
                provider : $compileProvider.provider,
                directive : $compileProvider.directive,
                decorator : $provide.decorator
            };

            $urlRouterProvider.otherwise('/url');

            module.switchView = function (view) {
                $urlRouterProvider.state(view);
            };

            $stateProvider
                .state('url', {
                    url: '/url',
                    templateUrl: 'static/scripts/pages/url.html',
                    controller: function () {
                        require('pageController');
                        return 'pageController';
                    }
                })
                .state('result', {
                    url: '/result',
                    templateUrl: 'static/scripts/pages/result.html'
                })
                .state('list', {
                    url: '/list',
                    templateUrl: 'static/scripts/pages/list.html'
                })
                .state('routes', {
                    url: '/routes',
                    templateUrl: 'static/scripts/pages/routes.html'
                });
        });
    }

    forklr.requires.push('forklr.core');

    return module;
});