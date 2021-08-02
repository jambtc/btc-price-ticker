$("#timeStart").html(new Date().toLocaleString());

var title = 'BTC Price Show';
var first = 0;
var last  = 0;
var price = 0;
var amount = 0;
var allResults = new Array(0);
var increase = 0;
var decrease = 0;
var percentage = 0;
var percentageAll = 0;
var animation  = 'loading 10s ease-in-out forwards';
var url = window.location.href;
var ws;
var coin = "€";
var orderid = 0;
var arrow = {0:'&#9650;',1:'&#9660;'};
var divClass = {0:'buy',1:'sell'};

// start function
pair.get().then(function(pair_response){
    console.log('[await pair response]',pair_response);

    exchange.get().then(function(exchange_response){
        console.log('[await exchange response]',exchange_response);
        $('#exchange_select').val(exchange_response);

        if (exchange_response == 'bitstamp'){
            ws = new WebSocket('wss://ws.bitstamp.net'); // New websocket v. 2 for Bitstamp

            var subscription = {
                    'event': 'bts:subscribe',
                    'data': {
                            'channel': 'live_trades_'+pair_response
                    }
            }; // Create object for Bitstamp channel subscription

        } else {
            ws = new WebSocket('wss://api.bitfinex.com/ws/'); // New websocket v. 2 for Bitstamp
            var subscription = {
                    'event': 'subscribe',
                    'channel': 'trades',
                    'pair': pair_response.toUpperCase()
            }; // Create object for Bitfinex channel subscription
        }
        console.log('[subscription]',subscription);
        //
        ws.onopen = function () {
            ws.send(JSON.stringify(subscription));
        }; // send subscription

        if (pair_response == 'btcusd'){
            coin = '$';
        }

        // manage messages
        ws.onmessage = function (evt) {
            ws_response = JSON.parse(evt.data);
            console.log('[ws response]',ws_response);

            //switch (ws_response.event) {
            //    case 'trade': {
            switch (exchange_response) {
                case 'bitstamp' : {
                    last = ws_response.data.price;
                    amount = ws_response.data.amount;
                    type = ws_response.data.type;
                    show(last,amount,type,coin);
                    break;
                }
                case 'bitfinex' : {
                    if (ws_response[1] == 'te'){
                        last = ws_response[4];
                        amount = ws_response[5];
                    }
                    if (ws_response[1] == 'tu'){
                        last = ws_response[5];
                        amount = ws_response[6];
                    }
                    type = 1;
                    if (amount > 0) type = 0;
                    if (ws_response[1] == 'te'){
                        show(last,amount,type,coin);
                    }

                    break;
                }
            }


        }; // manage response
    });
});

function show(last,amount,type,coin){
    if (typeof last == 'undefined') last = 0;
    if (typeof type == 'undefined') type = 0;

    last = last.toFixed(2);
    if (first == 0) first = last;

    console.log('[first]',first);
    console.log('[last]',last);
    console.log('[type]',type);
    console.log('[coin]',coin);

    // manage percentage total
    percentageAll = (parseFloat(last-first)/parseFloat(first))*100;
    if (typeof percentageAll == 'NaN') percentageAll = 0;
    console.log('[percentageAll]',percentageAll);

    $("#percentageAll").html((percentageAll>0 ? "&#9650; " : "&#9660; ")+percentageAll.toFixed(2)+"%");

    // manage price
    $("#priceHolder").html(coin+" "+last);
    $("#priceHolder").fadeTo('fast', 0.2).fadeTo('fast', 1.0);
    document.title = coin+" "+last + ' | ' + title;

    // add class type (buy or sell)
    $("#priceHolder").removeClass();
    $("#priceHolder").addClass(divClass[type]);

    // manage percentage
    if (parseFloat(last) > parseFloat(price)) {
        console.log("LOW:::New Price-"+last+" > Old price-"+price);
        increase = parseFloat(last)-parseFloat(price);
        percentage = (parseFloat(increase)/parseFloat(price))*100;

        $("#percentage").removeClass('lowPrice');
        $("#percentage").addClass("highPrice");
        if(parseInt(percentage.toFixed(2)) < 101) {
            $("#percentage").html("&#9650; "+percentage.toFixed(2)+"%");
        }
    } else { //if(parseFloat(last) < parseFloat(price)) {
        console.log("HIGH:::New Price-"+last+" < Old price-"+price);
        decrease = parseFloat(price)-parseFloat(last);
        percentage = (parseFloat(decrease)/parseFloat(price))*100;

        $("#percentage").removeClass('highPrice');
        $("#percentage").addClass("lowPrice");
        $("#percentage").html("&#9660; "+percentage.toFixed(2)+"%");
    }

    // manage orders
    if (typeof amount != 'undefined'){
        var order = '<span class="orderBtcInline">'+amount+'</span> '+arrow[type]+' '+coin+' <span class="orderCoinInline">'+parseFloat(amount*last).toFixed(2)+'</span>';
        console.log('[order]',order);

        $("#orderHolder").prepend('<div id="order_'+orderid+'">'+order+'</div>');
        $("#order_"+orderid).addClass(divClass[type]);
        orderid ++;
        // clean the DOM
        if (orderid > 10){
            $("#order_"+(orderid-11)).remove();
        }
    }

    // reset progress bar animation
    var $body = $('#progress').css('animation', 'none'); //reset it
    setTimeout(function(){
        $body.css('animation', animation); //set it back
    });

    // manage chart
    if (last != 0){
        price = parseFloat(last);
        allResults.push(parseFloat(price).toFixed(2));
    }
    if (allResults.length > 999){
        allResults.shift();
    }

    $('.sparkline').sparkline(allResults, {width: '90%', height: '80', fillColor: '#201c29', lineColor: '#1db954'});
    $("#timeLast").html(new Date().toLocaleString());
    $("#minValTime").html(coin+' '+Math.min.apply(Math, allResults));
    $("#maxValTime").text(coin+' '+Math.max.apply(Math, allResults));
}
