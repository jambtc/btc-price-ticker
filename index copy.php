<!DOCTYPE html>
<html lang="en">

<head>
    <title>BTC Price Show</title>
    <script src="https://kit.fontawesome.com/2ae8ea64fe.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/theme.css" />
</head>

<body data-bs-theme="dark">
    <div class="container">
        <div class="left-div">

            <div class="card card-outline card-primary w-100">
                <div id="progress" class="progress-bar"></div>
                <div class="card-header">
                    <div class="div-wrapper">
                        <div><i class="fab fa-bitcoin fa-xl"></i></div>
                    </div>
                    <div class="div-wrapper">
                        <div><span id="priceHolder"></span></div>
                    </div>
                    <div class="div-wrapper">
                        <div>
                            <select id="exchange_select">
                                <option value="bitstamp">Bitstamp</option>
                                <option value="bitfinex">Bitfinex</option>
                            </select>
                        </div>
                    </div>



                </div>
                <div class="card-body">
                    <table class="table-sm">
                        <thead class="tradebook-header">
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Value</th>
                        </thead>
                        <tbody id="orderHolder">

                        </tbody>
                    </table>


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

                    <div class="row f-14 h-14 white">
                        <div class="lowPrice left h-14 f35 center">MIN<br />
                            <span id="minValTime">0</span>
                        </div>
                        <div class="highPrice right h-14 f35 center">MAX<br />
                            <span id="maxValTime">0</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">

                    <div class="row f-16 gray center">
                        Made with ❤️ by <b>sexjam</b> ;^)
                    </div>

                    <div class="row f-16 gray center h-14 mt-1">
                        <a class="aa" href="https://github.com/jambtc/btc-price-ticker" target="_blank"><i class="fa fa-github"></i> Btc Price Ticker</a>
                    </div>
                    <div class="row f-16 gray center h-14 mt-1">
                        Length: <span id="arrayLength"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-div">
            <div class="card">
                <div class="card-header">
                    <h1>Calcolo ROI Bitcoin</h1>
                </div>

                <div class="card-body bg-secondary">
                    <h5 class="card-title">Prezzo di vendita</h5>
                    <div id="risultato-container" class="card-text"></div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">ROI</h5>
                    <div id="prezzo_vendita" class="card-text"></div>
                    <div id="roi_raggiunto" class="card-text"></div>
                    <div id="roi_finale" class="card-text"></div>
                    <div id="quantita_finale" class="card-text"></div>
                </div>
            </div>

        </div>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.sparkline.min.js"></script>
    <script type="text/javascript" src="custom.js"></script>
    <script type="text/javascript" src="handle.js"></script>
    <script type="text/javascript" src="show.js"></script>
    <script type="text/javascript" src="btcPriceUpdate.js"></script>
    <script type="text/javascript" src="btcRoiCalculate.js"></script>
</body>

</html>