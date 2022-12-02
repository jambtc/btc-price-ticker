var handle = {
    sendSubscription: function (sb){
        ws.send(JSON.stringify(sb));
    },
    message: function (evt){
        ws_response = JSON.parse(evt.data);
        console.log('[ws response]', ws_response);

        let eXSelect = $('#exchange_select').val();

        //switch (ws_response.event) {
        //    case 'trade': {
        switch (eXSelect) {
            case 'bitstamp': {
                last = ws_response.data.price;
                amount = ws_response.data.amount;
                type = ws_response.data.type;
                show.price(last, amount, type, coin);
                break;
            }
            case 'bitfinex': {
                if (ws_response[1] == 'te') {
                    last = ws_response[4];
                    amount = ws_response[5];
                }
                if (ws_response[1] == 'tu') {
                    last = ws_response[5];
                    amount = ws_response[6];
                }
                type = 1;
                if (amount > 0) type = 0;
                if (ws_response[1] == 'te') {
                    show.price(last, amount, type, coin);
                }

                break;
            }
        }
    },
    close: function (evt){
        $("#priceHolder").html('Disconnected!');
        btcprice.start();
    },
    errors: function (evt) {
        $("#priceHolder").html('<span style = "color: red;">ERROR:</span> ' + evt.data);
        btcprice.start();
    }
}