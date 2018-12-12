$( document ).ready(function() {
    var qNumberIndex = 0;
    var qNumber = $('.question').length;

    
    $('#start-button').on('click', function(){
        $('.preview-block').hide();
        $('.question').eq(0).show();

    });
    $('.button-next').on('click', function(){
        $('.question').eq(qNumberIndex).hide();
        qNumberIndex += 1;
        $('.question').eq(qNumberIndex).show();
    });
});