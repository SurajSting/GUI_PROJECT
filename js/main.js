
//When adding a product, the 'total products' div show up. Right now it toggleing.
$(document).on("click", '.beer_div', function(e){
    
    if($('.right_pane').css("display") == ("none")){
        $('.left_pane').animate({"width": '-=33%'}, 500);
    } else {
        $('.left_pane').animate({"width": '+=33%'}, 500);
    }
    
    $('.right_pane').toggle('slow');

    //Putting Data into the onClick div
    console.log($('#'+e.currentTarget.id+'').children(':nth(2)').html());
    $('#purchase_form').append('' +
        '<div class="selected_article">' +
            '<input type="hidden" value="'+e.currentTarget.id+'">' +
        '   <p class="beer_name"> '+ $('#'+e.currentTarget.id+'').children(':nth(1)').html()+ "</p>" +
        '   <p class="quantity">1</p>' +
        '   <span class="increment">' +
        '       <button class="button_inc_dec">+</button>' +
        '       <button class="button_inc_dec">-</button>' +
        '   </span>>' +
        '   <p class="price">'+ $('#'+e.currentTarget.id+'').children(':nth(2)').html()+ "</p>" +
        '<button class="delete">x</button>' +
        '</div>>');
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
                            "<label class='nameLabel'>Name: </label>" +
                            "<p class='name'>"+field[j].namn+"</p> " +
                            "<label class='priceLabel' for='priceVal'>Price: </label><label id='priceVal' class='priceValue'>"+field[j].price+"</label>" +
                            "<br>" +
                            "<p class='count' style='display: "+is_hidden+"'>Count: "+field[j].count+"</p>" +
                        " </div>");
                    }
                }
            }
        });
    });
}

    
 getData();