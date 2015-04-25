// JavaScript Document



$(window).on('resize', function(){

    $('.project-item').each(function(){

        var box = $(this);        
        var width = box.width();
        var height = box.height();        
        
        box.attr('data-size', width+'x'+height+' (r: '+(width/height).toFixed(2)+')');

    });
}).trigger('resize');
