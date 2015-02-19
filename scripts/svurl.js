$(function() {
    $('#submit').on('click', function () {
        $.post('/insert', {
            url: $('#url').val()
        }, function (response) {
            $('#newUrl').val(window.location.origin + '/' + response.shortUrl);
            $('.result').show();
            $('.creator').hide();
        });
    });
});