$("#timeStart").html(new Date().toLocaleString());

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
var ws = new WebSocket('wss://ws.bitstamp.net'); // New websocket v. 2 for Bitstamp
var coin = "€";
//var btc = '<i class="fab fa-bitcoin"></i>';
var orderid = 0;
var arrow = {0:'&#9650;',1:'&#9660;'};
var divClass = {0:'buy',1:'sell'};



pair.get()
    .then(function(response){
        console.log('[await response]',response);
        var subscription = {
            'event': 'bts:subscribe',
            'data': {
                'channel': 'live_trades_'+response
            }
        }; // Create object for channel subscription

        ws.onopen = function () {
            ws.send(JSON.stringify(subscription));
        }; // send subscription

        if (response == 'btcusd'){
            coin = '$';
        }
});



ws.onmessage = function (evt) {
    response = JSON.parse(evt.data);
    switch (response.event) {
        case 'trade': {
            last = response.data.price;
            type = response.data.type;
            amount = response.data.amount;
            if (first == 0) first = last;

            // manage percentage total
            percentageAll = (parseFloat(last-first)/parseFloat(first))*100;
            $("#percentageAll").html((percentageAll>0 ? "&#9650; " : "&#9660; ")+percentageAll.toFixed(2)+"%");

            // manage price
            $("#priceHolder").html(coin+" "+last);
            $("#priceHolder").fadeTo('fast', 0.2).fadeTo('fast', 1.0);

            // add class type (buy or sell)
            $("#priceHolder").removeClass();
            $("#priceHolder").addClass(divClass[type]);

            // manage percentage
            $("#percentage").removeClass();
            if (parseFloat(last) > parseFloat(price)) {
				console.log("LOW:::New Price-"+last+" > Old price-"+price);
				increase = parseFloat(last)-parseFloat(price);
				percentage = (parseFloat(increase)/parseFloat(price))*100;

				$("#percentage").addClass("highPrice");
				if(parseInt(percentage.toFixed(2)) < 101) {
					$("#percentage").html("&#9650; "+percentage.toFixed(2)+"%");
				}
			} else { //if(parseFloat(last) < parseFloat(price)) {
				console.log("HIGH:::New Price-"+last+" < Old price-"+price);
				decrease = parseFloat(price)-parseFloat(last);
				percentage = (parseFloat(decrease)/parseFloat(price))*100;

				$("#percentage").addClass("lowPrice");
				$("#percentage").html("&#9660; "+percentage.toFixed(2)+"%");
			}

            // manage orders
            var order = '<span class="orderBtcInline">'+amount+'</span> '+arrow[type]+' '+coin+' <span class="orderCoinInline">'+parseFloat(amount*last).toFixed(2)+'</span>';
            $("#orderHolder").prepend('<div id="order_'+orderid+'">'+order+'</div>');
            $("#order_"+orderid).addClass(divClass[type]);
            orderid ++;
            // clean the DOM
            if (orderid > 10){
                $("#order_"+(orderid-11)).remove();
            }

            // reset progress bar animation
            var $body = $('#progress').css('animation', 'none'); //reset it
            setTimeout(function(){
                $body.css('animation', animation); //set it back
            });

            // manage chart
            price = parseFloat(last);
			allResults.push(parseFloat(price).toFixed(2));

            if (allResults.length > 999){
                allResults.shift();
            }

			$('.sparkline').sparkline(allResults, {width: '90%', height: '80', fillColor: '#201c29', lineColor: '#1db954'});
			$("#timeLast").html(new Date().toLocaleString());
			$("#minValTime").html(coin+' '+Math.min.apply(Math, allResults));
			$("#maxValTime").text(coin+' '+Math.max.apply(Math, allResults));

            break;
        }
        case 'bts:request_reconnect': {
            ws = new WebSocket('wss://ws.bitstamp.net');
            break;
        }
    }
}; // manage response
