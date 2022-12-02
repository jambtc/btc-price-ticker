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

var btcprice = {
    start: function (){
        // start function
        pair.get().then(function (pair_response) {
            console.log('[await pair response]', pair_response);

            exchange.get().then(function (exchange_response) {
                console.log('[await exchange response]', exchange_response);
                $('#exchange_select').val(exchange_response);

                if (exchange_response == 'bitstamp') {
                    ws = new WebSocket('wss://ws.bitstamp.net'); // New websocket v. 2 for Bitstamp

                    var subscription = {
                        'event': 'bts:subscribe',
                        'data': {
                            'channel': 'live_trades_' + pair_response
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
                console.log('[subscription]', subscription);
                if (pair_response == 'btcusd') {
                    coin = '$';
                }

                // send subscription
                ws.onopen = function () {
                    handle.sendSubscription(subscription);
                };

                // manage messages
                ws.onmessage = function (evt) {
                    handle.message(evt);
                }

                // manage close 
                ws.onclose = function (evt) {
                    handle.close();
                };

                // manage errors
                ws.onerror = function (evt) {
                    handle.errors(evt);
                };

            });
        });
    }
}

// start application 
$(document).ready(function () {
    console.log("ready!");
    btcprice.start();
});


