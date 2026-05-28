<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>BTC Price Ticker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap 5 + FontAwesome -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/2ae8ea64fe.js" crossorigin="anonymous"></script>

    <!-- Chart.js -->
    <script src="js/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="css/theme.css">

    <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAk/kA7vf/AACL/wArnvEAAZP5AP/9/gADk/kAAJL8AAiQ+QAAlvkAAo7/AAKS/AADlvkAAJH/ADGV4QACkf8AKp3sACyg7AAAlPcAAoz9AEOj6wD//f8AAJX9ACmX5QABkPsA//79AAaR+AAEj/4AAJL2AACR+QACif8A//v+AAOR+QAElfYA/v7+AP/+/gAElPkA///zAAGP/wAMjfwABZP8AA2R+QABl/EADYz/APX+/wAAlfcA//v/AP/+/wAJlfcAOKHsAAmS7wAFmewAAZH7ACCb7gAClfgAC5fyACyd6AAClPsAQqPnAP39+wAJlfAAOKDoAAyU8wAAjf8AAo3/AB2a8gAKk/YAC5P2AEmr6gD//P8A+///ADan5gAClfoA////AAqM8gA5mOcAAZ3sAC+Z7QD///cADpH9AP39/QAnlOMAQKXsAASS+wAPnO8AC5ftAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASUlJSRlHSDwtEzFQSUlJSUlJLAM0AAAAAAAEBlEVSUlJIkoAAAAPQzMAAAAAJCNJSVQAAAAASTJJAAAAAAAXSQUqAAAAAEkASQAcAAAAIVARAAAAAklJSUkiO0QAAAQ4CAAAAAANSScANkkAAAAAGwcAAAAAQElLPkkuAAAAABZCAAAAAApJSUkiAAsAAAA3UwAAAAA5ST8AACJMAAAAGBQAAAAASUkBTklJHQAAAE1GTwAACR5JDkkmVQAAACAiSVIAAAAAHyslAAAAAAA1SUlJEgAAAAAAAAAAAAApL0lJSUk9BwAAAAAAAAxBIklJSUlJSUU6KDAHGhBOSUlJSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=">

</head>

<body>
    <div class="text-center p-1">
        <div class="main-card shadow text-center">
            <div class="row mb-4">
                <div class="col-md-4">
                    <h5><i class="fab fa-bitcoin text-warning"></i> BTC Price Ticker</h5>
                    <h2 id="priceHolder" class="my-3">$0.00</h2>
                </div>
                <div class="col-md-6">
                    <div id="tradeStream" class="trade-stream">
                        <table class="trade-table w-100">
                            <thead>
                                <tr>
                                    <th class="tradebook-header__direction"></th>
                                    <th class="tradebook-header__amount">Amount</th>
                                    <th class="tradebook-header__price">Price</th>
                                    <th class="tradebook-header__value">Value</th>
                                </tr>
                            </thead>
                            <tbody id="tradeRows"></tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="mb-4">
                        <label for="exchange_select" class="form-label">Select Exchange</label>
                        <select id="exchange_select" class="form-select w-auto mx-auto">
                            <option value="binance" selected>Binance</option>
                            <option value="bitstamp">Bitstamp</option>
                        </select>
                    </div>
                </div>
            </div>





            <canvas id="priceChart" class="w-100" style="height: 150px;"></canvas>


            <div class="stats-section mt-2">
                <div class="stats">
                    <div class="row">
                        <div class="col">
                            <div class="text-left"><strong>Trading Volume:</strong> <span id="volume">0 USD</span></div>
                            <div class="text-left lowPrice"><strong>MIN:</strong> <span id="minVal">N/A</span></div>
                        </div>
                        <div class="col">
                            <div class="text-right"><strong>24h Change:</strong> <span id="percentageChange">0%</span></div>
                            <div class="text-right highPrice"><strong>MAX:</strong> <span id="maxVal">N/A</span></div>
                        </div>
                    </div>
                </div>
            </div>




            <div class="mt-4 small text-secondary">
                Made with ❤️ by <strong>jambtc</strong><br>
                <a href="https://github.com/jambtc/btc-price-ticker" target="_blank" class="text-light">
                    <i class="fa fa-github"></i> Source Code
                </a>
            </div>
        </div>
    </div>

    <script src="js/btcPriceUpdate.js"></script>
</body>

</html>