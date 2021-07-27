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
var priceHolder = document.querySelector('#priceHolder');

priceHolder.addEventListener("click", function () {
    pair.get()
        .then(function(response){
            // console.log('Pair: '+pair);
            if (response == 'btcusd'){
                window.location.href = "index.php?pair=btceur";
            } else {
                window.location.href = "index.php?pair=btcusd";
            }
    });

});
