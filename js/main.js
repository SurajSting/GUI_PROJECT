
//Functionality to get the inventory_data from the API

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
                        $("#notebook").append("<div id="+field[j].beer_id+">"+
                            "<p>Namn1: "+field[j].namn+"</p> " +
                            "<p>Price: "+field[j].price+"</p> "+
                            "<p style='display: "+is_hidden+"'>Count: "+field[j].count+"</p>" +
                        " </div>");
                    }
                }
            }
        });
    });

    /*
    $.ajax({
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get",
        type: "POST",
        dataType: "json",
        success: function(payload) {
            var database_count = payload.length;

            for(var i = 0; i < database_count; i++){

                for(var j = 0; j < 6; j++){
                    namn[i] = payload[i]["namn"];
                    namn2[i] = payload[i]["namn2"];
                    price[i] = payload[i]["price"];
                    count[i] = payload[i]["count"];
                }


                console.log(i);
            }
        },

        error: function() {

            alert("ERROR!!!");
        }
    });
    */
}

getData();