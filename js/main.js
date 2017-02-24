
//When adding a product, the 'total products' div show up. Right now it toggleing.
$(document).on("click", '#pleaseclick', function(e){
    
    if($('.right_pane').css("display") == ("none")){
        $('.left_pane').animate({"width": '-=30%'}, 500);
    } else {
        $('.left_pane').animate({"width": '+=30%'}, 500);
    }
    
    $('.right_pane').toggle('slow');

    $('#test').html("hello");
});