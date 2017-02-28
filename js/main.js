
var id_array = [];
var beer_count_purchase = 2;


//When adding a product, the 'total products' div show up. Right now it toggleing.
$(document).on("click", '.beer_div', function(e){
    
    if($('.right_pane').css("display") == ("none")){
        $('.right_pane').slideDown();
        $('.left_pane').animate({"width": '-=33%'}, 500);
    } else {
        //$('.left_pane').animate({"width": '+=33%'}, 500);
    }
    
    //$('.right_pane').toggle('slow');

    //Checking duplicate entry on the purchase form:
    function checkIfAlreadyPicked() {
        for (var i = 0; i < id_array.length; i++) {
            //alert("fu");
            console.log("fu " + id_array[i] + " " + e.currentTarget.id);
            if (id_array[i] == parseInt(e.currentTarget.id)){
                console.log("TRUUUEE " + i);
                return i;
            }
        }
        return -1;
    }
    
    //CHECK IF THERE ARE ANY BEER LEFT FOR THAT PARTICULAR ARTICLE
    var beer_left = $('#'+e.currentTarget.id+'').children(':nth(5)').html();
        
    if(beer_left >= 1){
        beer_left--;
        $('#'+e.currentTarget.id+'').children(':nth(5)').html(beer_left);
        
        var counter = checkIfAlreadyPicked();
        //console.log("counter: " + counter);

        if(counter == -1){
            id_array[id_array.length] = e.currentTarget.id;
            console.log(id_array);
            createDiv();
        }
        else
        {
            var amount = parseInt($('#purchase_form').children(':nth('+counter+')').children(':nth(2)').html());
            amount++;
            $('#purchase_form').children(':nth('+counter+')').children(':nth(2)').html(amount);
        
        
        //$('#'+e.currentTarget.id+'').children(':nth(6)');
        }
    } 
    else
    {
        alert("No more beers for you!");
        
    }
    
    //console.log($('#'+e.currentTarget.id+'').children(':nth(5)').html());
    //console.log($('#purchase_form').children(':nth('+counter+')').children(':nth(2)').html());



    //Putting Data into the onClick div
  //  console.log($('#'+e.currentTarget.id+'').children(':nth(2)').html());
    
    
    function createDiv(){
    $('#purchase_form').append('' +
        '<div class="selected_article">' +
            '<input type="hidden" value="'+e.currentTarget.id+'">' +
        '   <p class="beer_name"> '+ $('#'+e.currentTarget.id+'').children(':nth(1)').html()+ "</p>" +
        '   <p class="quantity">1</p>' +
        '   <span class="increment">' +
        '       <button type="button" class="btn_inc">+</button>' +
        '       <button type="button" class="btn_dec">-</button>' +
        '   </span>' +
        '   <p class="price">'+ $('#'+e.currentTarget.id+'').children(':nth(2)').html()+ "</p>" +
        '<button type="button" class="delete">x</button>' +
        '</div>>');
    }
});

//DECREMENT BUTTON ON PURCHASE FORM
$(document).on("click", '.btn_dec', function(e) {
    var div_id = e.currentTarget.parentElement.parentElement.firstChild.attributes[1].value;

    var right_amount = e.currentTarget.parentElement.parentElement.childNodes[4].innerHTML;
    console.log(right_amount);
    right_amount--;
    e.currentTarget.parentElement.parentElement.childNodes[4].innerHTML = right_amount;


    var new_value = $('#'+ div_id+'').children(':nth(5)').html();
    new_value++;

    $('#'+ div_id+'').children(':nth(5)').html(new_value);

});


//USERNAME AND PASSWORD FUNCTIONALITY
$(document).on("click", '.btn_success', function(e){
    
    var uName = $('#uName').val();
    var pWord = $('#pWord').val();
    var userlist = {};
    var userid = {};
    var userfirst = {};
    console.log("Name:"+uName+"Word:"+pWord);
    

    $.getJSON("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=user_get_all", function(result){
        $.each(result, function(i, field){                 
            if(i == "payload"){
                for(var j=0; j < field.length; j++){
                    userlist[field[j].username] = field[j].password;
                    userid[field[j].username] = field[j].credentials;
                    userfirst[field[j].username] = field[j].first_name;
                }
                userlist["aa"] = "aa";
                userid["aa"] = "0";
                userfirst["aa"] = "Team 17"; 
                if(uName in userlist){

                    if(pWord == userlist[uName]){       
                        getData();
                        if(userid[uName] == "3"){
                            
                            $("#margin_bottom").hide();
                            $("#welcome").show().append("Users: "+ userfirst[uName]+"!");

                        }else if(userid[uName] == "0"){
                           
                            $("#margin_bottom").hide();
                            $("#welcome").show().append("Administrator: "+ userfirst[uName]+"!");
                        }else{
                           
                            $("#margin_bottom").hide();
                            $("#welcome").show().append("No one: "+ userfirst[uName]+"!");
                        }


                    }else{
                        alert("Wrong Password!");
                    }
                }else{
                    alert("Wrong Username and Password!");
                }
                
               
            }
        });
    });

});


//GETTING THE DATA FROM THE API
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
                            "<label class='priceLabel' for='priceVal"+j+"'>Price: </label>"+            
                            "<p id='priceVal"+j+"'class='priceValue'>"+field[j].price+"</p>" +
                            "<label class='countLabel' for='countVal"+j+"' style='display: "+is_hidden+"'>Beers left: </label>"+
                            "<p class='count' id='countVal' style='display: "+is_hidden+"'>"+field[j].count+"</p>" +
                        " </div>");
                    }
                }
            }
        });
    });
}