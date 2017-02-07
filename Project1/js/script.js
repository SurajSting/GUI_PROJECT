/**
 * Created by suraj on 2/1/2017.
 */
/*
function docLoaded(fn) {
    if(document.readyState !== 'loading'){
        fn();
    }
    else{
        document.addEventListener('DOMContentLoaded',fn);
    }
}
*/

function indexPageLoaded() {
    displayItem();
    purchaseButton();
    billGen();
}

$(function displayItem() {
//Function that stores the menu
    function menu(n, p, c, i) {
        this.name = n;
        this.price = p;
        this.country = c;
        this.image = i;

        this.foo = function () {
            return this.name;
        }
        this.img_foo = function () {
            return this.image;
        }
        this.price_foo = function () {
            return this.price;
        }
        this.country_foo = function () {
            return this.country;
        }
    }

    //Data initialization
    var d1 = new menu('Coke', ' 10', ' US', '');
    var d2 = new menu('Beer', ' ', ' Den', '');
    var d3 = new menu('Tea', ' 7', ' Swiss', '');
    var d4 = new menu('Dew', ' 5', '', '');
    var d5 = new menu('Wine', ' 15', ' US', '');

    //Creating containers
    var menu_arr = [d1, d2, d3, d4, d5];
    var txt = [];
    var br = [];
    var img = [];
    var pr = [];
    var cnt = [];

    //Adding elements to the DIV
    //var diva = document.getElementById('drinker');


    var i = 0;
    for (i; i < 5; i++) {
        txt[i] = document.createTextNode(menu_arr[i].foo());
        br[i] = document.createElement('br');
        img[i] = document.createElement('img');
        img[i].setAttribute('src', menu_arr[i].img_foo());

        $('#drinker').append(txt[i]);
        if (menu_arr[i].country_foo() != '') {
            cnt[i] = document.createTextNode(menu_arr[i].country_foo());
            $('#drinker').append(cnt[i]);
        }
        else if (menu_arr[i].price_foo()) {
            pr[i] = document.createTextNode(menu_arr[i].price_foo());
            $('#drinker').append(pr[i]);
        }

        $('#drinker').append(img[i]);
        $('#drinker').append(br[i]);
    }

    console.log(drinks[0].name);
    console.log(drinks[0].price);
    console.log(drinks[0].country);
    console.log(drinks[0].img);
});

$(function purchaseButton() {
    var button = document.getElementById('makeOrder');
    button.onclick = function(){
        var divBill = document.getElementById('bill');

        //Hot or Cold Coffee
        if(document.getElementById('coffee_h').checked){
            var txt = document.createTextNode('Hot Coffee');
            divBill.appendChild(txt);
            divBill.appendChild(document.createElement('br'));
        }
        else if(document.getElementById('coffee_c').checked)
        {
            var txt = document.createTextNode('Cold Coffee');
            divBill.appendChild(txt);
            divBill.appendChild(document.createElement('br'));
        }

        //Hot or Cold Tea
        if(document.getElementById('tea_h').checked){
            var txt = document.createTextNode('Hot Tea');
            divBill.appendChild(txt);
            divBill.appendChild(document.createElement('br'));
        }
        else if(document.getElementById('tea_c').checked)
        {
            var txt = document.createTextNode('Cold Tea');
            divBill.appendChild(txt);
            divBill.appendChild(document.createElement('br'));
        }
    }
});

$(function billGen() {
    //What did you buy
    var td1 = document.getElementById('td1');
    var td2 = document.getElementById('td2');
    var td3 = document.getElementById('td3');
    var td4 = document.getElementById('td4');
    var td5 = document.getElementById('td5');
    var td6 = document.getElementById('td6');

    var tdText = ['Beer', 'Draught Beer', 'Tap Beer', 'Coffee', 'Tea', 'Mocktail'];
    var td = [td1, td2, td3, td4, td5, td6];

    //toggle on and off
    td1.onmousedown = function () {
        var toggle = document.getElementById('Beer');
        if (toggle.checked == true) {
            toggle.removeAttribute('checked');
        }
        else {
            toggle.setAttribute('checked', 'checked');
        }
    };
    //toggle on and off
    td2.onmousedown = function () {
        var toggle = document.getElementById('Draught Beer');
        if (toggle.checked == true) {
            toggle.removeAttribute('checked');
        }
        else {
            toggle.setAttribute('checked', 'checked');
        }
    };
    //toggle on and off
    td3.onmousedown = function () {
        var toggle = document.getElementById('Tap Beer');
        if (toggle.checked == true) {
            toggle.removeAttribute('checked');
        }
        else {
            toggle.setAttribute('checked', 'checked');
        }
    };
    //toggle on and off
    td4.onmousedown = function () {
        var toggle = document.getElementById('Coffee');
        if (toggle.checked == true) {
            toggle.removeAttribute('checked');
        }
        else {
            toggle.setAttribute('checked', 'checked');
        }
    };
    //toggle on and off
    td5.onmousedown = function () {
        var toggle = document.getElementById('Tea');
        if (toggle.checked == true) {
            toggle.removeAttribute('checked');
        }
        else {
            toggle.setAttribute('checked', 'checked');
        }
    };
    //toggle on and off
    td6.onmousedown = function () {
        var toggle = document.getElementById('Mocktail');
        if (toggle.checked == true) {
            toggle.removeAttribute('checked');
        }
        else {
            toggle.setAttribute('checked', 'checked');
        }
    };

});
