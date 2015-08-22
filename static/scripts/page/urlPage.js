define([
    'pageModule'
], function (module) {
    "use strict";
    var urlPage = function ($window) {
        return {
            scope: {
                key: '=',
                page: '=',
                clickFn: '=',
                imgFn: '=',
                fileModel: '='
            },
            link: function (scope, elem, attr) {
                scope.restrictor = ['list', 'routes'];
                scope.location = $window.location.origin;

                scope.isFile =  scope.fileModel ? 'file' : 'text';
                scope.clickFn =  scope.fileModel ? handleImg : scope.clickFn;

                console.log(elem.length, scope.fileModel);

                if (scope.restrictor.indexOf(scope.key) > -1) {
                    scope.isList = true;
                    scope.$watch(scope[scope.key + 'Fn'], function (newVal) {
                        if (newVal) {
                            scope.list = newVal;
                        }
                    });
                }

                function handleImg() {
                    if (scope.fileModel) {
                        console.log(elem);
                        var file = elem.find('input')[0].files[0],
                            r = new FileReader();
                        r.onloadend = function (e) {
                            scope.imgFn(e.target.result);
                        };

                        r.readAsArrayBuffer(file);

                    }
                }
            },
            restrict: 'EAC',
            replace: false,
            templateUrl: './static/scripts/page/urlPage.html'
        };
    };

    if (!module.register || !module.register.directive) {
        module.register = {};
        module.register.directive = module.directive;
    }

    module.register.directive('urlPage', urlPage);
});