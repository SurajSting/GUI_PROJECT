
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

function getData(){

    $.getJSON("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", function(result){
        $.each(result, function(i, field){
            $("#note").append(field + "");
            console.log(i,field.length, field[0].price);


            if(i == "payload"){
                for(var j = 0; j < field.length; j++) {
                    var is_hidden = 'none';
                    if(field[j].namn != "" && parseInt(field[j].count) >= 1)
                    {
                        if(parseInt(field[j].count)<11)
                        {
                            is_hidden = 'initial';
                        }
                        $("#notebook").append("<div class='beer_div' id="+field[j].beer_id+">"+
                            "<p class='name'>Namn1: "+field[j].namn+"</p> " +
                            "<p class='price'>Price: "+field[j].price+"</p> "+
                            "<p class='count' style='display: "+is_hidden+"'>Count: "+field[j].count+"</p>" +
                        " </div>");
                    }
                }
            }
        });
    });
}

    
 getData();