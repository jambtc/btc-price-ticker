$("#timeStart").html(new Date().toLocaleString());

var last  = 0;
var price = 0;
var allResults = new Array(0);
var increase = 0;
var decrease = 0;
var percentage = 0;
var animation  = 'loading 10s ease-in-out forwards';

// var el = $("#progress"),
// newone = el.clone(true);
// el.before(newone);
// $(".progress-bar:last").remove();



var ws = new WebSocket('wss://ws.bitstamp.net'); // New websocket v. 2 for Bitstamp
var subscription = {
      'event': 'bts:subscribe',
      'data': {
      'channel': 'live_trades_btceur'
    }
}; // Create object for channel subscription

ws.onopen = function () {
  ws.send(JSON.stringify(subscription));
}; // send subscription

ws.onmessage = function (evt) {
  response = JSON.parse(evt.data);
  switch (response.event) {
    case 'trade': {
      last = response.data.price;
      type = response.data.type;
      $("#priceHolder").text(last);
      
      if (type == 0) {
        $("#priceHolder").removeClass();
				$("#priceHolder").addClass("highPrice");
      } else {
        $("#priceHolder").removeClass();
				$("#priceHolder").addClass("lowPrice");
      }
      
      if (parseFloat(last) > parseFloat(price)) {
				console.log("LOW:::New Price-"+last+" > Old price-"+price);
				increase = parseFloat(last)-parseFloat(price);
				percentage = (parseFloat(increase)/parseFloat(price))*100;

				$("#percentage").removeClass();
				$("#percentage").addClass("highPrice");

				if(parseInt(percentage.toFixed(2)) < 101) {
					$("#percentage").html("&#9650; "+percentage.toFixed(2)+"%");
				}

				//for(i=0;i<2;i++) {
				  $("#priceHolder").fadeTo('fast', 0.2).fadeTo('fast', 1.0);
			//	}
				document.getElementsByTagName('title')[0].innerHTML = "BTC &#9650; "+last.toFixed(2)+" €";
			} else if(parseFloat(last) < parseFloat(price)) {

				console.log("HIGH:::New Price-"+last+" < Old price-"+price);
				decrease = parseFloat(price)-parseFloat(last);
				percentage = (parseFloat(decrease)/parseFloat(price))*100;

				$("#percentage").removeClass();
				$("#percentage").addClass("lowPrice");
				$("#percentage").html("&#9660; "+percentage.toFixed(2)+"%");
				  //for(i=0;i<2;i++) {
					  $("#priceHolder").fadeTo('fast', 0.2).fadeTo('fast', 1.0);
				  //}
				document.getElementsByTagName('title')[0].innerHTML = "BTC &#9660; "+last.toFixed(2)+" €";
			} else {
        //for(i=0;i<2;i++) {
          $("#priceHolder").fadeTo('fast', 0.2).fadeTo('fast', 1.0);
        //}
			}

      // reset progress bar animation
      var $body = $('#progress').css('animation', 'none'); //reset it
      setTimeout(function(){
        $body.css('animation', animation); //set it back
      });

			price = parseFloat(last);
			allResults.push(parseFloat(price).toFixed(2));
			$('.sparkline').sparkline(allResults, {width: '90%', height: '80', fillColor: '#201c29', lineColor: '#1db954'});
			$("#timeLast").html(new Date().toLocaleString());
			$("#minValTime").text(Math.min.apply(Math, allResults));
			$("#maxValTime").text(Math.max.apply(Math, allResults));

      break;
    }
    case 'bts:request_reconnect': {
      ws = new WebSocket('wss://ws.bitstamp.net');
      break;
    }
  }
}; // manage response
