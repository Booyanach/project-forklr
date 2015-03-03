$(function() {
    $('.submit').on('click', function () {
        var type = 'url';
        if ($(this).attr('target') === 'crl') {
            type = 'crl';
        }
        $.post('/insert', {
            url: $('#url').val(),
            type: type
        }, function (response) {
            $('#newUrl').val(window.location.origin + '/' + response.type + '/' + response.shortUrl);
            $('.result').addClass('visible');
            $('.creator').removeClass('visible');
        });
    });

    $('.menu .button').on('click', function () {

        $('.selected').removeClass('selected');
        $(this).addClass('selected');

        $('.page.visible').removeClass('visible');
        $('.page.' + $(this).attr('target-url')).addClass('visible');

        if ($(this).attr('target-url') === 'list') loadList();

        $('.result').removeClass('visible');
        $('.url').val('');
    });
    $('.menu .button').each(function () {
        if ($(this).hasClass('selected')) {
            $('.page.' + $(this).attr('target-url')).addClass('visible');
        }
    });

    function loadList() {
        $.get('/list', {}, function (response) {
            console.log(response);
            var table = $('<table/>'),
                tbody = $('<tbody/>').appendTo(table);

                $.each(response, function (item, idx) {
                    if (idx.indexOf('http') > -1) {
                        var row = $('<tr/>').appendTo(tbody);

                            $('<td/>').text(item).appendTo(row);
                            $('<td/>').text(idx).appendTo(row);
                    }
                });

                table.appendTo($('.page.list'));
            // $('.page.list').text(JSON.stringify(response));
        });
    }
});