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

        $('.result').removeClass('visible');
        $('.url').val('');
    });
    $('.menu .button').each(function () {
        if ($(this).hasClass('selected')) {
            $('.page.' + $(this).attr('target-url')).addClass('visible');
        }
    });
});