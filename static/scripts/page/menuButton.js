define([
    'pageModule'
], function (module) {
   "use strict";
    var menuButton = function () {
        return {
            scope: {
                class: '@',
                targetUrl: '@',
                clickFn: '='
            },
            link: function (scope, elem, attr) {
            },
            restrict: 'EAC',
            replace: true,
            templateUrl: './static/scripts/page/menuButton.html'
        };
    };

    if (!module.register || !module.register.directive) {
        module.register = {};
        module.register.directive = module.directive;
    }

    module.register.directive('menuButton', menuButton);
});