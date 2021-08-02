<!DOCTYPE html>
<html lang="en">
    <head>
        <title>BTC Price Show</title>
        <script src="https://kit.fontawesome.com/2ae8ea64fe.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="css/theme.css" />
    </head>
    <body>
        <div id="progress" class="progress-bar"></div>
        <div class="mainHolder">
            <div id="mainContainer">
                <div><i class="fab fa-bitcoin"></i></div>
                <div><span id="priceHolder"></span></div>
                <div>
                    <select id="exchange_select">
                        <option value="bitstamp">Bitstamp</option>
                        <option value="bitfinex">Bitfinex</option>
                    </select>
                </div>
            </div>
            <!-- <div style="margin-bottom:-100px; background-color:yellow;">
                <div class="bitcoin"><i class="fab fa-bitcoin"></i></div>
        	    <div id="priceHolder"></div>
                <div class="f-16 right">
                    <select id="exchange_select">
                        <option value="bitstamp">Bitstamp</option>
                        <option value="bitfinex">Bitfinex</option>
                    </select>
                </div>
            </div> -->
            <div id="orderHolder" class="f-15 white"></div>
        	<div class="w-100 h-80">
        		<span class="sparkline w-100 h-80"></span>
        	</div>
        	<div class="row f-14 white h-14">
        		<div id="timeStart" class="h-14 f-14 left"></div>
        		<div id="timeLast" class="h-14 f-14 right"></div>
        	</div>
        	<div class="row yellow h-50">
        		<span id="percentageAll" class="h-14 left "></span>
        		<span id="percentage" class="h-14 right "></span>
        	</div>
        </div>
        <div class="clearfix"></div>
        <div class="row f-14 h-14 white">
        	<div class="lowPrice left h-14 f35 center">MIN<br />
        		<span id="minValTime">0</span>
        	</div>
        	<div class="highPrice right h-14 f35 center">MAX<br />
        		<span id="maxValTime">0</span>
        	</div>
        </div>
        <div class="row f-16 gray center">
          Made with ❤️ by <b>sexjam</b> ;^)
        </div>

        <div class="row f-16 gray center h-14 mt-1">
            <a class="aa" href="https://github.com/jambtc/btc-price-ticker" target="_blank"><i class="fa fa-github"></i> Btc Price Ticker</a>
        </div>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script type="text/javascript" src="jquery.sparkline.min.js"></script>
        <script type="text/javascript" src="custom.js"></script>
        <script type="text/javascript" src="btcPriceUpdate.js"></script>
    </body>
</html>
