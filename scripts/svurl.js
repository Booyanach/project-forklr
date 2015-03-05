// $(function() {
//     $('.submit').on('click', function () {
//         var type = 'url';
//         if ($(this).attr('target') === 'crl') {
//             type = 'crl';
//         }
//         $.post('/insert', {
//             url: $('#url').val(),
//             type: type
//         }, function (response) {
//             $('#newUrl').val(window.location.origin + '/' + response.type + '/' + response.shortUrl);
//             $('.result').addClass('visible');
//             $('.creator').removeClass('visible');
//         });
//     });

//     $('.menu .button').on('click', function () {

//         $('.selected').removeClass('selected');
//         $(this).addClass('selected');

//         $('.page.visible').removeClass('visible');
//         $('.page.' + $(this).attr('target-url')).addClass('visible');

//         if ($(this).attr('target-url') === 'list') loadList();

//         $('.result').removeClass('visible');
//         $('.url').val('');
//     });
//     $('.menu .button').each(function () {
//         if ($(this).hasClass('selected')) {
//             $('.page.' + $(this).attr('target-url')).addClass('visible');
//         }
//     });

//     function loadList() {
//         $.get('/list', {}, function (response) {
//             console.log(response);
//             var table = $('<table/>'),
//                 tbody = $('<tbody/>').appendTo(table);

//                 $.each(response, function (item, idx) {
//                     if (idx.indexOf('http') > -1) {
//                         var row = $('<tr/>').appendTo(tbody);

//                             $('<td/>').text(item).appendTo(row);
//                             $('<td/>').text(idx).appendTo(row);
//                     }
//                 });

//                 table.appendTo($('.page.list'));
//         });
//     }
// });
//
((function() {

    var urlBuilder = function () {
        var svurl = angular.module('svurl', []),
            self = this;

        svurl.service('apiService', self.apiService);

        svurl.controller('urlController', self.urlController);

        svurl.controller('urlPage', self.pageDirective);

        return {
            app: svurl
        };
    };

    urlBuilder.prototype.urlController = function ($window, apiService) {
        var url = this;

        url.pages = {
            "Shortener tool": {
                visible: true,
                input: {
                    url: 'url'
                }
            },
            "Charles' shortener tool": {
                visible: false,
                input: {
                    url: 'crl'
                }
            },
            "your short url is:": {
                visible: false,
                result: true
            },
            "All saved URLs": {
                visible: false,
                list: true
            }
        };

        url.insertUrl = function (type) {
            apiService.postData({
                url:'/insert',
                data: {
                    type: type
                }
            }).success(function (response) {
                // angular.element('#newUrl').val($window.location.origin + '/' + response.type + '/' + response.shortUrl);
                // angular.element('.result').addClass('visible');
                // angular.element('.creator').removeClass('visible');
            });
        };
    };

    urlBuilder.prototype.pageDirective = function () {
        return {
            scope: {},
            link: function (scope, elem, attr) {
                console.log('pageDirective loaded');
            }
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
