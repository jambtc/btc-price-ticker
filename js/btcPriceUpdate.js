let chart;
let ws;
let priceHistory = [];
let timeLabels = [];
var arrow = { 0: '&#9650;', 1: '&#9660;' }; // Freccia su (buy) e giù (sell)
var divClass = { 0: 'buy', 1: 'sell' }; // Classe CSS: green (buy) e red (sell)
let volumeData = 0;
let initialPrice = null;
let minPrice = null;
let maxPrice = null;
let selectedExchange = null;

/**
 * Aggiorna il grafico Chart.js con nuovi dati
 * @param {number} price - Il prezzo corrente
 */
function updateChart(price) {
    const now = new Date().toLocaleTimeString();

    priceHistory.push(price);
    timeLabels.push(now);

    if (priceHistory.length > 10000) {
        priceHistory.shift();
        timeLabels.shift();
    }

    if (!chart) {
        const ctx = document.getElementById('priceChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    label: 'BTC Price',
                    data: priceHistory,
                    borderColor: '#f7931a', // colore bitcoin
                    borderWidth: 1.2,        // linea sottile
                    backgroundColor: 'transparent',
                    pointRadius: 0,          // nessun pallino
                    tension: 0.3             // linea leggermente curva
                }]
            },
            options: {
                responsive: true,
                animation: false,
                elements: {
                    line: {
                        borderWidth: 1.2
                    },
                    point: {
                        radius: 0
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: true
                    }
                }
            }
        });
    } else {
        chart.data.labels = timeLabels;
        chart.data.datasets[0].data = priceHistory;
        chart.update('none'); // 'none' = no animation
    }
}

// Funzione per formattare il numero in K, M, B
function formatVolume(value) {
    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + ' B';
    } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + ' M';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(2) + ' K';
    } else {
        return value.toFixed(2);
    }
}

// Funzione per aggiornare Min e Max
function updateMinMaxPrice(price) {
    if (minPrice === null || price < minPrice) {
        minPrice = price;
    }
    if (minPrice !== null) {
        document.getElementById('minVal').textContent = parseFloat(minPrice).toFixed(2) + ' USD';
        localStorage.setItem('minPrice', minPrice); // Salva in localStorage
    }

    if (maxPrice === null || price > maxPrice) {
        maxPrice = price;
    }
    if (maxPrice !== null) {
        document.getElementById('maxVal').textContent = parseFloat(maxPrice).toFixed(2) + ' USD';
        localStorage.setItem('maxPrice', maxPrice); // Salva in localStorage
    }
}

// Funzione aggiornata con volume formattato
function updateVolumeAndPercentage(newPrice, newVolume) {
    const valueData = parseFloat(newVolume * newPrice);

    volumeData += valueData;
    document.getElementById('volume').textContent = formatVolume(volumeData) + ' USD';

    // Aggiorna prezzo minimo e massimo
    updateMinMaxPrice(newPrice);

    if (!initialPrice) {
        initialPrice = newPrice;
    }
    const percentageChange = ((newPrice - initialPrice) / initialPrice) * 100;
    document.getElementById('percentageChange').textContent = `${percentageChange.toFixed(2)}%`;

    // Salva volume e prezzo iniziale in localStorage
    localStorage.setItem('volumeData', volumeData);
    localStorage.setItem('initialPrice', initialPrice);
}

// Funzione per aggiungere una riga alla tabella delle transazioni
function addTradeRow(amount, price, type) {
    const value = (parseFloat(amount) * parseFloat(price)).toFixed(2);
    const priceFormatted = parseFloat(price).toFixed(2);

    const row = document.createElement('tr');
    row.className = divClass[type]; // Assegna la classe buy/sell

    row.innerHTML = `
        <td>${arrow[type]}</td>
        <td class="text-left">${amount}</td>
        <td class="text-left">$${priceFormatted}</td>
        <td class="text-left">$${value}</td>
    `;

    const container = document.getElementById('tradeRows');
    container.prepend(row);

    // Limita a 5 righe
    while (container.rows.length > 5) {
        container.deleteRow(5); // Rimuove l'ultima riga (in eccesso)
    }
}


// Funzione per connettersi al WebSocket dell'exchange selezionato
function connectWebSocket(exchange, pair) {
    if (ws) {
        ws.close(); // Chiudi il WebSocket precedente
    }

    console.log(`Connecting to ${exchange} WebSocket...`);

    if (exchange === 'bitstamp') {
        ws = new WebSocket('wss://ws.bitstamp.net');
        ws.onopen = () => {
            ws.send(JSON.stringify({
                event: 'bts:subscribe',
                data: {
                    channel: `live_trades_${pair}`
                }
            }));
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === 'trade' && data.data && data.data.price) {
                updateChart(data.data.price);
                document.getElementById('priceHolder').textContent = `$${data.data.price}`;
                addTradeRow(data.data.amount, data.data.price, data.data.type === 0 ? 0 : 1);
                updateVolumeAndPercentage(data.data.price, data.data.amount);
            }
        };
    } else if (exchange === 'binance') {
        ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@trade`);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.p) {
                updateChart(parseFloat(data.p));
                document.getElementById('priceHolder').textContent = `$${parseFloat(data.p)}`;
                addTradeRow(data.q, data.p, data.m ? 1 : 0); // market maker: true (sell), false (buy)
                updateVolumeAndPercentage(data.p, data.q);
            }
        };
    }

    ws.onerror = err => console.error('WebSocket error:', err);
    ws.onclose = () => console.warn('WebSocket closed');
}

/**
 * Cambia exchange e resetta connessioni
 * @param {string} exchange - 'binance' o 'bitstamp'
 */
function switchExchange(exchange) {
    // Pulizia
    if (ws) ws.close();
    
    priceHistory = [];
    timeLabels = [];

    selectedExchange = exchange;
    localStorage.setItem('selectedExchange', exchange); // Salva l'exchange selezionato

    if (exchange === 'binance') {
        connectWebSocket('binance', 'btcusdt');
    } else {
        connectWebSocket('bitstamp', 'btcusd');
    }
}

// Azzera i valori (per debug)
function resetValues() {
    localStorage.removeItem('minPrice');
    localStorage.removeItem('maxPrice');
    localStorage.removeItem('volumeData');
    localStorage.removeItem('initialPrice');
    localStorage.removeItem('selectedExchange');

    minPrice = null;
    maxPrice = null;
    volumeData = 0;
    initialPrice = null;
    selectedExchange = null;

    document.getElementById('minVal').textContent = 'N/A';
    document.getElementById('maxVal').textContent = 'N/A';
    document.getElementById('volume').textContent = '0 USD';
    document.getElementById('percentageChange').textContent = '0%';
}

$(document).ready(function () {
    const initial = $('#exchange_select').val();

    selectedExchange = parseFloat(localStorage.getItem('selectedExchange')) || initial;

    switchExchange(selectedExchange);
    
    $('#exchange_select').on('change', function () {
        resetValues();
        const selected = $(this).val();
        switchExchange(selected);
    });

    // Carica i valori dal localStorage se esistono
    window.addEventListener('load', function () {
        minPrice = parseFloat(localStorage.getItem('minPrice')) || null;
        maxPrice = parseFloat(localStorage.getItem('maxPrice')) || null;
        volumeData = parseFloat(localStorage.getItem('volumeData')) || 0;
        initialPrice = parseFloat(localStorage.getItem('initialPrice')) || null;
        selectedExchange = parseFloat(localStorage.getItem('selectedExchange')) || null;

        // Aggiorna la UI con i valori salvati
        document.getElementById('minVal').textContent = minPrice ? minPrice.toFixed(2) + ' USD' : 'N/A';
        document.getElementById('maxVal').textContent = maxPrice ? maxPrice.toFixed(2) + ' USD' : 'N/A';
        document.getElementById('volume').textContent = formatVolume(volumeData) + ' USD';
    });
});
