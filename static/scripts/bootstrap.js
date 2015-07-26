define([
    'angular',
    'forklr'
],function(ng) {
    'use strict';

    $(function () {
        var controllers = [];

        $('[ng-controller]').each(function (idx, elem) {
            controllers.push($(elem).attr('ng-controller').split(' ')[0]);
        });

        require(controllers, function () {
            ng.bootstrap(document, ['forklr']);
        });
    });
});