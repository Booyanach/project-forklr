$(function() {
    $('#submit').on('click', function () {
        $.post('/insert', {
            url: $('#url').val()
        }, function (response) {
            $('#newUrl').val(window.location.origin + '/url/' + response.shortUrl);
            $('.result').show();
            $('.creator').hide();
        });
    });
});