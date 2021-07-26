


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
