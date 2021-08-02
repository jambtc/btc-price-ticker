var pair = {
    get: async function (){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var pair = url.searchParams.get("pair");

        console.log('[typeof pair function]',typeof (pair));

        if (typeof(pair) == 'object'){
            pair = 'btceur';
        }

        return await pair;
    }
}
var exchange = {
    get: async function (){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var exchange = url.searchParams.get("exchange");

        console.log('[typeof exchange function]',typeof (exchange));

        if (typeof(exchange) == 'object'){
            exchange = 'bitstamp';
        }

        return await exchange;
    }
}

var priceHolder = document.querySelector('#priceHolder');
priceHolder.addEventListener("click", function () {
    pair.get().then(function(pair_response){
        exchange.get().then(function(exchange_response){
            console.log('Pair: '+pair_response);
            console.log('Exchange: '+exchange_response);

            if      (pair_response == 'btceur' && exchange_response == 'bitstamp'){
                    window.location.href = "index.php?pair=btcusd&exchange=bitstamp";
            }
            else if (pair_response == 'btceur' && exchange_response == 'bitfinex') {
                    window.location.href = "index.php?pair=btcusd&exchange=bitfinex";
            }
            else if (pair_response == 'btcusd' && exchange_response == 'bitstamp') {
                    window.location.href = "index.php?pair=btceur&exchange=bitstamp";
            }
            else if (pair_response == 'btcusd' && exchange_response == 'bitfinex') {
                    window.location.href = "index.php?pair=btceur&exchange=bitfinex";
            }
        });
    });
});

var dropdown = document.querySelector('#exchange_select');
dropdown.addEventListener("change", function () {
    console.log('exchange_select: '+this.value);
    var exchange_response = this.value;

    pair.get().then(function(pair_response){
        window.location.href = "index.php?pair="+pair_response+"&exchange="+exchange_response;
    });
});
