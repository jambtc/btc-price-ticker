var show = {
    price: function(last, amount, type, coin) {
        if (typeof last == 'undefined') last = 0;
        if (typeof type == 'undefined') type = 0;

        last = last.toFixed(2);
        if (first == 0) first = last;

        console.log('[first]', first);
        console.log('[last]', last);
        console.log('[type]', type);
        console.log('[coin]', coin);

        // manage percentage total
        percentageAll = (parseFloat(last - first) / parseFloat(first)) * 100;
        if (typeof percentageAll == 'NaN') percentageAll = 0;
        console.log('[percentageAll]', percentageAll);

        $("#percentageAll").html((percentageAll > 0 ? "&#9650; " : "&#9660; ") + percentageAll.toFixed(2) + "%");

        // manage price
        $("#priceHolder").html(coin + " " + last);
        $("#priceHolder").fadeTo('fast', 0.2).fadeTo('fast', 1.0);
        document.title = coin + " " + last + ' | ' + title;

        // add class type (buy or sell)
        $("#priceHolder").removeClass();
        $("#priceHolder").addClass(divClass[type]);

        // manage percentage
        if (parseFloat(last) > parseFloat(price)) {
            console.log("LOW:::New Price-" + last + " > Old price-" + price);
            increase = parseFloat(last) - parseFloat(price);
            percentage = (parseFloat(increase) / parseFloat(price)) * 100;

            $("#percentage").removeClass('lowPrice');
            $("#percentage").addClass("highPrice");
            if (parseInt(percentage.toFixed(2)) < 101) {
                $("#percentage").html("&#9650; " + percentage.toFixed(2) + "%");
            }
        } else { //if(parseFloat(last) < parseFloat(price)) {
            console.log("HIGH:::New Price-" + last + " < Old price-" + price);
            decrease = parseFloat(price) - parseFloat(last);
            percentage = (parseFloat(decrease) / parseFloat(price)) * 100;

            $("#percentage").removeClass('highPrice');
            $("#percentage").addClass("lowPrice");
            $("#percentage").html("&#9660; " + percentage.toFixed(2) + "%");
        }

        // manage orders
        if (typeof amount != 'undefined') {
            var order = '<td class="amountTd"><i class="fab fa-bitcoin text-secondary"></i> ' + amount + '</td> ' 
                + '<td>' + arrow[type] + '</td>'
                + '<td>' + coin + ' ' + last + '</td>'
                + '<td class="valueTd">' + parseFloat(amount * last).toFixed(2) + ' ' + coin +'</td>';
            // console.log('[order]', order);

            $("#orderHolder").prepend('<tr id="order_' + orderid + '">' + order + '</tr>');
            $("#order_" + orderid).addClass(divClass[type]);
            orderid++;
            // clean the DOM
            if (orderid > 10) {
                $("#order_" + (orderid - 11)).remove();
            }
        }

        // reset progress bar animation
        var $body = $('#progress').css('animation', 'none'); //reset it
        setTimeout(function () {
            $body.css('animation', animation); //set it back
        });

        // manage chart
        if (last != 0) {
            price = parseFloat(last);
            allResults.push(parseFloat(price).toFixed(2));
        }
        if (allResults.length > 1000) {
            allResults.shift();
        }

        // nuova funzione che visualizzao i ROI sulla vendita/acquisto di btc
        // aggiornaRoi(allResults);

        $('.sparkline').sparkline(allResults, { width: '98%', height: '80', fillColor: '#201c29', lineColor: '#1db954' });
        $("#timeLast").html(new Date().toLocaleString());
        $("#minValTime").html(coin + ' ' + Math.min.apply(Math, allResults));
        $("#maxValTime").text(coin + ' ' + Math.max.apply(Math, allResults));

        $("#arrayLength").text(orderid);

    },
   
}