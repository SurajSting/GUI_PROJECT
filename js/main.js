var lastKey;



/*
0 22259, increment
1 2259, increment
2 2259, decrement
3 2259, 1
4
5
6
7


*/
var undoStorage = [];
var redoStorage = [];
var _identy_ = "";
var _user_ = "";
var _login_ = 0;


var id_array = [];
var beer_count_purchase = 2;

var flag = 0;
var selectits = 'Selected';
var totals = 'Total';
var buy = 'Buy';


//Drag event
console.log("rightpane " + $('.right_pane').offset().top);



var rightPaneTop = 121;  // get initial position of the element

console.log($(window).width());

if ($(window).width() > 1025){
$(window).scroll(function() {
    console.log("Im here 1");// assign scroll event listener
    var currentScroll = $(window).scrollTop(); // get current position

    if (currentScroll >= rightPaneTop) {           // apply position: fixed if you
        $('#right_pane').css({                      // scroll to that element or below it
            position: 'fixed',
            top: '-10px'
        });
    } else {                                   // apply position: static
        $('#right_pane').css({                      // if you scroll above it
            position: 'absolute',
            top: '112px'
        });
    }
                 
});
} else{
    console.log("Im here 2");
    $(window).scroll(function() {                  // assign scroll event listener
        var rightPaneTop = 125;

        var currentScroll = $(window).scrollTop(); // get current position
        console.log("Im here 2 " + currentScroll);
     //   console.log(currentScroll);
        
    if (currentScroll >= rightPaneTop) {           // apply position: fixed if you
        $('#right_pane').css({                      // scroll to that element or below it
            position: 'fixed',
            top: '-10px',
            left: '528px'
        });
    } else {                                   // apply position: static
        $('#right_pane').css({                      // if you scroll above it
            position: 'absolute',
            top: '-11px',
            left: '507px'
        });
    }
                 
});

}


function drag(e) {
        
        e.dataTransfer.setData("text", e.target.id);
        console.log(e);
        setTimeout(function(){
        $('#block').css("display", "initial");
            $('#purchase_form').css("z-index", "5000");
        }, 50);
    }


function drop(e){
    
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    
    var id = $('#'+data.substring(1)+'');
    
    console.log(data);

    $('#block').css("display", "none");
    
   // var rightPaneBeerAmount = parseInt($('#'+data+'').children(':nth(2)').html());
    //console.log("right: " + rightPaneBeerAmount);
     //var leftPaneBeerAmount = parseInt($('#' + data.substring(1) + '').children(':nth(5)').html());
    //console.log("left: " + leftPaneBeerAmount);
    //leftPaneBeerAmount += rightPaneBeerAmount;
    
   // console.log("new left: " + leftPaneBeerAmount);
    
   // $('#' +data.substring(1) +'').children(':nth(5)').html(leftPaneBeerAmount);
    //$('#'+data+'').remove();
    deleteEntry(data.substring(1));
   // deleteFromIdArray(data.substring(1));
   // upDateTotalCost();
    //deleteEntry(e);

    
}

function allowDrop(e){

    e.preventDefault();
    
}

function cancelDrop(event){
    
    $('#block').css("display", "none");
}
    
    

    //Checking duplicate entry on the purchase form:
    function checkIfAlreadyPicked(id) {
        for (var i = 0; i < id_array.length; i++) {
            //alert("fu");
            console.log("fu " + id_array[i] + " " + id);
            if (id_array[i] == parseInt(id)){
                console.log("TRUUUEE " + i);
                return i; //+1 because we've implemented a dummy-div in purchase_form
            }
        }
        return -1;
    }
    
    //CHECK IF THERE ARE ANY BEER LEFT FOR THAT PARTICULAR ARTICLE
    
    function beerCountRightPaneIncrement(id){

        rightPaneShow();
        
        var beer_left = $('#'+id+'').children(':nth(5)').html(); //leftpane beer-count-variable




        if(beer_left >= 1){ //If there's any beer left
            beer_left--;

            if(beer_left <= 10){
                ($('#'+id+'').children(':nth(5)').css('display', 'initial'));
                ($('#'+id+'').children(':nth(4)').css('display', 'initial'));
                //console.log($('#'+id+'').children(':nth(5)').css('display', 'initial'));
            }

            $('#'+id+'').children(':nth(5)').html(beer_left); //decrement leftpane beer count

            var rightPaneBeerIndex = checkIfAlreadyPicked(id);
            console.log("rightPaneBeerIndex: " + rightPaneBeerIndex);
            //console.log("counter: " + counter);

            if(rightPaneBeerIndex == -1){ //If the beer has not already been chosen
                id_array[id_array.length] = id; //Add it to our internal array of selected articles
                
                createDiv(id, 1, (id_array.length));
                console.log("id_array.length: " + id_array.length);
            }
            else //increment on rightpane beer count
            {
                var amount = parseInt($('#purchase_form').children(':nth('+rightPaneBeerIndex+')').children(':nth(2)').html());
                //console.log("Target: " + $('#purchase_form').children(':nth(0)').children(':nth(2)').html());
                //console.log("AMOUNT = " + amount);
                amount++;
                $('#purchase_form').children(':nth('+rightPaneBeerIndex+')').children(':nth(2)').html(amount);


            //$('#'+e.currentTarget.id+'').children(':nth(6)');
            }
        } 
        else
        {
            var nobear = 'Nobear';
            alert(jQuery.i18n.prop(nobear));

        }
        
        upDateTotalCost();
    
    }

    function rightPaneShow(){


    if($('.right_pane').css("display") == ("none")){ //if the right pane is not visible, show it
        $('.right_pane').slideToggle();
        if ($(window).width() > 1025){
            $('.left_pane').animate({"width": '-=33%'}, 500);
        }
        else
        {
            $('.left_pane').animate({"width": '-=47%'}, 500);
        }
    }
    }


    function createDiv(id, quantity, index){
        
       //
        rightPaneShow();
        $("#selectit").html(jQuery.i18n.prop(selectits));
        $("#label_total").html(jQuery.i18n.prop(totals));
        $("#btn_purchase").html(jQuery.i18n.prop(buy));
        console.log("Inside the creation");
      // $('#purchase_form div.selected_article:nth-child('+index+')').after($ if(index == 0){
            
       // }
        
    var appendThis =         
        '<div draggable="true" ondragstart="drag(event)" class="selected_article" id="r'+id+'">' +
            '<input type="hidden" value="'+id+'">' +
        '   <p class="beer_name"> '+ $('#'+id+'').children(':nth(1)').html()+ "</p>" +
        '   <p class="quantity">'+quantity+'</p>' +
        '   <span class="increment">' +
        '       <button type="button" class="btn_inc">+</button>' +
        '       <button type="button" class="btn_dec">-</button>' +
        '   </span>' +
        '<button type="button" class="delete">x</button>' +
                               "<p style='display: none'>"+$('#'+id+'').children(':nth(3)').html()+"</p>"+
        '</div>';  
        
        console.log("index: " + index);
        
        var bajs = index -2;
        console.log("bajs: " + bajs);
        
        
        
        if ($('#purchase_form').has("div").length > 0){
            if(bajs == -1 || bajs == -2){
                $('#purchase_form div.selected_article').eq(0).before($(appendThis)).hide().slideToggle();
            }else{
            $('#purchase_form div.selected_article').eq(bajs).after($(appendThis)).hide().slideToggle();
            //$('#purchase_form div.selected_article')[bajs].after($('<p>suck a cock</p>'));
            }
            
        }
        else{
            console.log("inside else");
            $('#purchase_form').append(appendThis).hide().show('slow');  
           
        }
        
    
   /* $('#purchase_form').append('' +
        '<div draggable="true" ondragstart="drag(event)" class="selected_article" id="r'+id+'">' +
            '<input type="hidden" value="'+id+'">' +
        '   <p class="beer_name"> '+ $('#'+id+'').children(':nth(1)').html()+ "</p>" +
        '   <p class="quantity">'+quantity+'</p>' +
        '   <span class="increment">' +
        '       <button type="button" class="btn_inc">+</button>' +
        '       <button type="button" class="btn_dec">-</button>' +
        '   </span>' +
        '<button type="button" class="delete">x</button>' +
                               "<p style='display: none'>"+$('#'+id+'').children(':nth(3)').html()+"</p>"+
        '</div>');*/
    }

//When adding a product, the 'total products' div show up. Right now it toggleing.


//DELETE ID FROM THE ID_ARRAY
function deleteFromIdArray(id){
    
        for(var i = 0; i < id_array.length; i++){
               if(id == id_array[i]){
                   id_array.splice(i, 1);
               }

           }


        if(id_array.length == 0)
        {
            $('.right_pane').slideToggle('fast');
            if ($(window).width() > 1025){
                $('.left_pane').animate({"width": '+=32.9%'}, 500);
            }
            else
            {
                $('.left_pane').animate({"width": '+=47%'}, 500);
            }

        }

}


//ADDS UP ALL PURCHASES IN THE PURCHASE_FORM AND DISPLAYS IT IN TOTAL
function upDateTotalCost(){
    
    var total = 0;
    
    for (var i = 0; i < $('#purchase_form').children().length; i++){

        var price = parseFloat($('#purchase_form').children(':nth('+i+')').children(':nth(5)').html());
        
        var quantity = parseFloat($('#purchase_form').children(':nth('+i+')').children(':nth(2)').html());
        
        total += (price * quantity);
    }
    
     $('#total').html(total.toFixed(2));
    
}

//WHEN PRESSING THE INCREMENT BUTTON ON SELECTED ARTICLE
$(document).on("click", '.btn_inc', function(e){
    
    var id = e.currentTarget.parentElement.parentElement.id.substring(1);
    beerCountRightPaneIncrement(id);
    redoStorage = [];
    undoStorage.push([id, 'inc']);
    //console.log(undoStorage[undoStorage.length-1]);
    
    
    //console.log(e.currentTarget.parentElement.parentElement.id.substring(1));
});



//FUNCTION THAT DECREMENTS THE RIGHTPANE SIDE BEER AMOUNT AND INCREMENTS LEFTPANE BEER AMOUNT
function beerCountRightPaneDecrement(id){
    
    
    var div_id = id;
    //console.log("div_id: " + div_id);
    
    //var right_amount = e.currentTarget.parentElement.parentElement.childNodes[4].innerHTML;
    
    var right_amount = $('#r'+div_id+'').children(':nth(2)').html();
    //console.log("right_amount: " + right_amount);


    //If there's only one left then dele the whole entry
   if(right_amount == 1){
      
       
       $('#r'+id+'').slideToggle();
       setTimeout(function(){ //to let the animation do it's job, then actually removing the html
           $('#r'+div_id+'').remove();
       }, 500);
       
       deleteFromIdArray(div_id); //Then also delete it from the internal storage
           
       $('#purchase_form').remove('#r'+div_id+'');
   }
   else{
       right_amount--;
       //e.currentTarget.parentElement.parentElement.childNodes[4].innerHTML = right_amount;
       $('#r'+div_id+'').children(':nth(2)').html(right_amount);
   }

    var left_amount = $('#'+ div_id+'').children(':nth(5)').html();
    left_amount++;

    if(left_amount > 10){
        ($('#'+id+'').children(':nth(5)').css('display', 'none'));
        ($('#'+id+'').children(':nth(4)').css('display', 'none'));
        //console.log($('#'+id+'').children(':nth(5)').css('display', 'initial'));
    }

    $('#'+ div_id+'').children(':nth(5)').html(left_amount);
   
    upDateTotalCost();
    
}

//WHEN PRESSING THE DECREMENT BUTTON ON PURCHASE FORM
$(document).on("click", '.btn_dec', function(e) {
    
    var div_id = e.currentTarget.parentElement.parentElement.firstChild.attributes[1].value;
    var rightBeerAmount = $('#r'+div_id+'').children(':nth(2)').html();
    var position = id_array.indexOf(div_id)
    beerCountRightPaneDecrement(div_id);
    redoStorage = [];
    
    
    //console.log("rightbeer: + !!!!!!" + rightBeerAmount);
    if(rightBeerAmount == 1){
       // console.log("inside if");
        undoStorage.push([div_id, 1, position]);
    }
    else{
        undoStorage.push([div_id, 'dec']);
    }

});


function deleteEntry(id){
 
    
    var rightPaneBeerAmount = parseInt($('#r' +id+'').children(':nth(2)').html());
    console.log("rightpanebeeramount: " + rightPaneBeerAmount);
    
    var leftDivId = id;
    
    var leftPaneBeerAmount = parseInt($('#' + leftDivId + '').children(':nth(5)').html());
    leftPaneBeerAmount += rightPaneBeerAmount;
    
    $('#' + leftDivId + '').children(':nth(5)').html(leftPaneBeerAmount);
    
    
    $('#r'+id+'').slideToggle();
    setTimeout(function(){
               $('#r'+id+'').remove();
               }, 500);
   // $('#r'+id+'').remove();
    
    var position = id_array.indexOf(leftDivId);
    deleteFromIdArray(leftDivId);
    
    undoStorage.push([leftDivId, rightPaneBeerAmount, position]);
    console.log(leftPaneBeerAmount);
    
    upDateTotalCost();
}

//ON PRESSING THE DELETE BUTTON
$(document).on("click", '.delete', function(e) {
    
   // var rightPaneBeerAmount = parseInt(e.currentTarget.parentElement.childNodes[4].innerHTML);
    var id = e.currentTarget.parentElement.id.substring(1);
    
    deleteEntry(id);
    
   /* var leftPaneBeerAmount = parseInt($('#' + leftDivId + '').children(':nth(5)').html());
    leftPaneBeerAmount += rightPaneBeerAmount;
    
    $('#' + leftDivId + '').children(':nth(5)').html(leftPaneBeerAmount);
    
    
    $('#'+e.currentTarget.parentElement.id+'').remove();
    
    //console.log("THIS IS THE INDEEEEEX: " + id_array.indexOf(leftDivId));
    
    var position = id_array.indexOf(leftDivId);
                         
    deleteFromIdArray(leftDivId);
    
    console.log(leftPaneBeerAmount);
    

    undoStorage.push([leftDivId, rightPaneBeerAmount, position]);
    
    upDateTotalCost();*/
    
    
});




$(document).on("click", '#btn_undo', function(e){
    

    var undoThis = undoStorage[undoStorage.length-1];
    
    var id = undoThis[0];
    var action = undoThis[1];
    
    if(action == "inc"){
        
        beerCountRightPaneDecrement(id);
        
    } else if(action == "dec"){
        beerCountRightPaneIncrement(id);
        
    } else{ //If there are more values then
        
        var quantity = undoStorage[undoStorage.length-1][1];
        var index = undoStorage[undoStorage.length-1][2];
        
        leftPaneBeerQuantity = parseInt($('#' + id +'').children(':nth(5)').html()) - quantity;
        $('#'+id+'').children(':nth(5)').html(leftPaneBeerQuantity); //setting the right quantity at leftPaneSide.
        
        console.log("undo-index: " + index);
   /*   
   
   
        console.log("index = " + index);
        
        for (var i = 0; i < id_array.length; i++){
            console.log("CMON: " + id_array[i]);
        }
        console.log("UNDEFINED?? " + id_array[index]);
        if(id_array[index] == undefined){
            id_array[index] = id;
            console.log("WHAT THE: " + id_array[index]);
        } else{
            id_array.splice(parseInt(index), 0, id);
        }
        */
        id_array.splice(index, 0, id);
        createDiv(id, quantity, index +1 ); //+1 has to do with positioning in the createDiv function
        
        
        
    }
    
    redoStorage.push(undoThis);
    undoStorage.pop();
    upDateTotalCost();
    
    for(var i = 0; i < undoStorage.length; i++){
        
        console.log("after: " + undoStorage[i][0]);
        
        //beerCountRightPaneIncrement(
        
    }
    
});

$(document).on("click", '#btn_redo', function(e){
    
    var redoThis = redoStorage[redoStorage.length-1];
    
    
    var id = redoStorage[redoStorage.length-1][0];
    var action = redoStorage[redoStorage.length-1][1];
    
    console.log(action);
    
    if(action == 'inc'){
        console.log("inside");
        beerCountRightPaneIncrement(id);
        undoStorage.push([parseInt(id), action]);
        
    } else if (action == 'dec'){
        
        console.log("inside DEEEEEC");
        beerCountRightPaneDecrement(id);
        undoStorage.push([parseInt(id), action]);
        
    } else{
        console.log("inside deletestuff");
        deleteEntry(id);
    }
    
   // undoStorage.push([parseInt(id), action]);
    console.log("last in undoStorage: " + undoStorage[undoStorage.length-1]);
    redoStorage.pop();
    
    
});

//WHEN CLICKING PURCHASE BUTTON
$(document).on("click", '#btn_purchase', function(e){
    
    
    
    
});

 $(document).ready(function() {
            loadBundles('eg');
            getData();
            

            $('.translate').click( function() {

               
                var selectedlang = $(this).text();
                loadBundles(selectedlang != 'browser' ? selectedlang: null);
                getData();

                $("#selectit").html(jQuery.i18n.prop(selectits));
                $("#label_total").html(jQuery.i18n.prop(totals));
                $("#btn_purchase").html(jQuery.i18n.prop(buy));

                if(_login_ == 1){
                    showwel(_identy_,_user_);
                }
                

    });



});
            


 function loadBundles(lang) {
            jQuery.i18n.properties({
                name:'Messages', 
                path:'bundle/', 
                mode:'both',
                language:lang, 
                callback: function() {
                    updateExamples();
                }
            });
        }

function updateExamples() {
            // Accessing values through the map

            var headline = 'Welcome';
            var usersname = 'Username';
            var passwords = 'Password';
            var logins = 'Login';
            $("#headline").html(jQuery.i18n.prop(headline));
            $("#uhead").html(jQuery.i18n.prop(usersname));
            $("#phead").html(jQuery.i18n.prop(passwords));
            $("#btlogin").html(jQuery.i18n.prop(logins));

        }


    
//USERNAME AND PASSWORD FUNCTIONALITY
$(document).on("click", '.btn_success', function(e){
    
    var uName = $('#uName').val();
    var pWord = $('#pWord').val();
    var userlist = {};
    var userid = {};
    var userfirst = {};
    var useru = 'User';
    var admin = 'Administrator';
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
                        
                        
                        $("#undo").show();
                        $("#redo").show();
                        _login_ = 1;


                        $(document).on("click", '.beer_div', function(e){
                            
                            beerCountRightPaneIncrement(e.currentTarget.id);
                            undoStorage.push([e.currentTarget.id, 'inc']);
                            
                            redoStorage = [];

                        });

                        
                        //$("#welcome").show().html(jQuery.i18n.prop(back));


                        if(userid[uName] == "3"){
                            
                            $("#margin_bottom").hide();

                            _identy_= useru;
                            _user_ = userfirst[uName];
                            showwel(useru, userfirst[uName]);


                        }else if(userid[uName] == "0"){
                           
                            $("#margin_bottom").hide();


                            _identy_= admin;
                            _user_ = userfirst[uName];
                            showwel(admin, userfirst[uName]);

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

$(document).on('click', '.btn_logout', function(e){

    location.reload();
   
});




$(document).on('click', '#info_block', function(e){

    $('.beer_info').remove();
    $('#info_block').css('display', 'none');
});


$(document).on('click', '.btn_close', function(e){

    var div_beer_info = e.currentTarget.parentElement.remove();
    console.log("DIV" + div_beer_info);

    $('#info_block').css('display', 'none');
});




function showwel(identy, usernames){

    var useru = 'User';
    var admin = 'Administrator';
    var logouts = 'Logout';
    var back = 'Welcomeback';

    $("#welcome").show().html(jQuery.i18n.prop(back)+jQuery.i18n.prop(identy)+": "+ usernames+"!"+" <button class='btn_logout' align='right'>"+jQuery.i18n.prop(logouts)+"</button>");
}

$(document).on('click', '.btn_beer_info', function(e){
    var id = e.currentTarget.parentElement.id;
    getBeerData(id);

    $('#info_block').css('display', 'initial');
});


function getBeerData(id) {

    var alcohol;
    var producer;
    var countryorigin;
    var alc_type;

    $.getJSON("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=" + id + "", function (result) {
        $.each(result, function (i, field) {
            if(i == "payload") {
                for(var j = 0; j < field.length; j++){
                    if(field[j].ursprunglandnamn != "")
                        countryorigin = field[j].ursprunglandnamn;
                    else if(field[j].ursprung != "")
                            countryorigin = field[j].ursprung;



                    if(field[j].producent != "")
                        producer = field[j].producent;
                    if(field[j].alkoholhalt != "")
                        alcohol = field[j].alkoholhalt;

                    if(field[j].varugrupp !=""){
                        if(field[j].varugrupp.substring(0, 2).toUpperCase() == "ÖL"){
                            alc_type = "beer";
                        }
                        else
                        {
                            alc_type = "wine";
                        }
                    }

                }

                var beerInfo = "<div class='beer_info'>"+
                        "<button class='btn_close'>X</button>"+
                        "<label class='info alcoholLabel'> Alcohol: </label>"+
                        "<p class='alcohol'>"+alcohol+"</p>"+
                        "<label class='info prodLabel'> Producer: </label>"+
                        "<p class='producer'>"+producer+"</p>"+
                        "<label class='info countryLabel'> Country: </label>"+
                        "<p class='country'>"+countryorigin+"</p>"+
                        "<img class='beer_wine' src='image/"+alc_type+".svg'>" +
                        "</div>";
            }
            $('#notebook').append(beerInfo);
        });
    });

}

//GETTING THE DATA FROM THE API
function getData(){

    var names = 'Name';
    var prices = 'Price';
    var bearleft = 'Bearleft';

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
                            "<label class='nameLabel gettext'>"+$('.nameLabel').html(jQuery.i18n.prop(names))+"</label>" +
                            "<p class='name'>"+field[j].namn+"</p> " +
                            "<label class='priceLabel gettext' for='priceVal"+j+"'>"+$('.priceLabel').html(jQuery.i18n.prop(prices))+"</label>"+            
                            "<p id='priceVal"+j+"'class='priceValue'>"+field[j].price+"</p>" +
                            "<label class='count beerleft' for='countVal"+j+"' style='display: "+is_hidden+"'>"+$('.beerleft').html(jQuery.i18n.prop(bearleft))+"</label>"+
                            "<p class='count' id='countVal' style='display: "+is_hidden+"'>"+field[j].count+"</p>" +
                            "<button class='btn_beer_info'>i</button>" +
                        " </div>");
                    }
                }
            }
        });
    });
}

