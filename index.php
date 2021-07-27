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
    <div style="margin-bottom:-100px;">
        <p class="bitcoin"><i class="fab fa-bitcoin"></i></p>
	    <span id="priceHolder"></span>
    </div>
    <div id="orderHolder" style="font-size:15px; color: #fff;"></div>
	<div style="width:100%; height:80px; display:block;">
		<span class="sparkline" style="width:100%; height:80px"></span>
	</div>
	<div style="width:100%; height:14px; display:block; font-size: 14px; color: #fff;">
		<div id="timeStart" style="float:left; height:14px; font-size: 14px;"></div>
		<div id="timeLast" style="float:right; height:14px; font-size: 14px;"></div>
	</div>
	<div style="width:100%; height:50px; display:block; font-size: 14px; color: #ff0;">
		<span id="percentageAll" style="float:left; height:14px; font-size: 4vw;"></span>
		<span id="percentage" style="float:right; height:14px; font-size: 4vw;"></span>
	</div>
</div>
<div style="width:100%; height:14px; display:block; font-size: 14px; color: #fff;">
	<div class="lowPrice" style="float:left; height:14px; font-size: 4vw; text-align:center">MIN<br />
		<span id="minValTime">0</span>
	</div>
	<div class="highPrice" style="float:right; height:14px; font-size: 4vw; text-align:center">MAX<br />
		<span id="maxValTime">0</span>
	</div>
</div>
<div style="width:100%; height:14px; display:block; font-size: 16px; color: gray; text-align: center;">
  Made with ❤️ by <b>sexjam</b> ;^)
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="jquery.sparkline.min.js"></script>
<script type="text/javascript" src="custom.js"></script>
<script type="text/javascript" src="btcPriceUpdate.js"></script>

</body>
</html>
