<!DOCTYPE html>
<html lang="en">

<head>
    <title>BTC Price Show</title>
    <script src="https://kit.fontawesome.com/2ae8ea64fe.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/theme.css" />
</head>

<body data-bs-theme="dark">

    <div class="left-div">
        <!-- Contenuto del div a sinistra -->
        <div class="card">
            <div class="card-header">
                <div id="progress" class="progress-bar"></div>
                <div class="d-flex justify-content-around">
                    <div class="p-2 vertical-align">
                        <i class="fab fa-bitcoin fa-xl"></i>
                    </div>
                    <div class="p-2 vertical-align">
                        <h1 id="priceHolder">...</h1>
                    </div>
                    <div class="p-2 vertical-align">
                        <select id="exchange_select">
                            <option value="bitstamp">Bitstamp</option>
                            <option value="bitfinex">Bitfinex</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="scrollable mb-4">
                        <table class="table-sm w-75 border">
                            <thead class="tradebook-header">
                                <th class="amountTd">Amount</th>
                                <th></th>
                                <th>Price</th>
                                <th class="valueTd">Value</th>
                            </thead>
                            <tbody id="orderHolder" class="small">
                                <!-- riempito da javascript -->
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-2 w-100 h-80">
                        <span class="sparkline w-100 h-80"></span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-between">
                    <div class="p-0">
                        <div id="timeStart" class="h-14 f-14 left"></div>
                    </div>
                    <div class="p-0">
                        <div id="timeLast" class="h-14 f-14 right"></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="p-0">
                        <div class="lowPrice ">MIN <span id="minValTime">0</span>
                        </div>
                    </div>
                    <div class="p-0">
                        <div class="highPrice">MAX <span id="maxValTime">0</span>
                        </div>
                    </div>
                </div>

                <p class="mt-2 text-secondary small text-center">
                    Made with ❤️ by <b>sexjam</b> ;^)</br>
                    <a class="aa" href="https://github.com/jambtc/btc-price-ticker" target="_blank"><i class="fa fa-github"></i> Btc Price Ticker</a>
                </p>
            </div>
        </div>
    </div>
    <div class="right-div">
        <!-- Contenuto del div a destra -->
        <div class="card card-outline card-info">
            <div class="card-header">

            </div>
            <div class="card-body">

            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>
    <div class="clear"></div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.sparkline.min.js"></script>
    <script type="text/javascript" src="custom.js"></script>
    <script type="text/javascript" src="handle.js"></script>
    <script type="text/javascript" src="show.js"></script>
    <script type="text/javascript" src="btcPriceUpdate.js"></script>

</body>

</html>