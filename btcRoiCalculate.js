// Dati iniziali
const commissione = 0.0025; // Commissione dello 0,25%
// const prezzi = generatePrezziCasuali(26500, 27500, 1000); // Genera un array di 1000 prezzi casuali tra 26.500 e 27.500 euro
const quantita = 0.1;

var prezzoIniziale = 0;
var prezzoVendita = 0;


// Funzione per generare un array di prezzi casuali
function generatePrezziCasuali(min, max, lunghezza) {
    const prezzi = [];
    for (let i = 0; i < lunghezza; i++) {
        const prezzoCasuale = Math.random() * (max - min) + min;
        prezzi.push(prezzoCasuale);
    }
    return prezzi;
}

// Funzione per calcolare il ROI
function calcolaROI(prezzoAcquisto, quantitaAcquisto) {
    // Calcola il prezzo di acquisto netto sottraendo la commissione
    const prezzoNetto = prezzoAcquisto - (prezzoAcquisto * commissione);

    // Calcola il prezzo di vendita netto sottraendo la commissione
    const quantitaVendita = quantitaAcquisto - (quantitaAcquisto * commissione);

    // Calcola il guadagno sottraendo il costo di acquisto dal valore di vendita
    const guadagno = (quantitaVendita * prezzoVendita) - (quantitaAcquisto * prezzoAcquisto);

    // Calcola il ROI dividendo il guadagno per il costo netto di acquisto
    const roi = guadagno / (prezzoNetto * quantitaAcquisto);

    return roi;
}

// Funzione per controllare il prezzo e il ROI
function controllaPrezzoROI(prezzo, quantita) {

    // da modificare seconda del risultato che si vuole ottenere
    prezzoVendita = prezzoIniziale.mediana;

    // Controllo del prezzo di vendita
    if (prezzo > prezzoVendita) {
        const messaggio = `Avviso: Prezzo di vendita raggiunto (${prezzo})`;
        visualizzaMessaggio(messaggio, 'prezzo_vendita');
        attivaVendita();
    }

    // Controllo del ROI
    const roi = calcolaROI(prezzo, quantita);
    if (roi >= 0.003) {
        const messaggio = `Avviso: ROI raggiunto (${roi * 100}%)`;
        visualizzaMessaggio(messaggio, 'roi_raggiunto');
        attivaAcquisto();
    }

    // Calcolo dei risultati finali
    let quantitaFinale = quantita;
    let prezzoAcquistoFiat = 0;
    let prezzoVenditaFiat = 0;
    let roiTotale = 0;

    while (roiTotale < 0.003) {
        const roi = calcolaROI(prezzo, quantitaFinale);
        roiTotale += roi;
        quantitaFinale *= (1 + roi);
        prezzoVenditaFiat += (quantitaFinale * prezzoVendita);

        // Riduci il prezzo del 0,3% per il calcolo successivo
        prezzo *= (1 - 0.003);

        // Visualizza i risultati intermedi
        const messaggio = `ROI: ${roi * 100}% </br> Quantità finale: ${quantitaFinale.toFixed(8)}`;
        visualizzaMessaggio(messaggio, 'roi_finale');
    }

    // Calcolo dei risultati finali
    const messaggioFinale = `Quantità finale: ${quantitaFinale.toFixed(8)} </br> Prezzo acquisto in Fiat: ${prezzoAcquistoFiat.toFixed(2)} € </br> Prezzo vendita in Fiat: ${prezzoVenditaFiat.toFixed(2)} €`;
    visualizzaMessaggio(messaggioFinale, 'quantita_finale');
}

// Funzione per visualizzare i messaggi nella pagina HTML
function visualizzaMessaggio(messaggio, div) {
    const risultati = document.getElementById(div);
    risultati.innerHTML = `<p>${messaggio}</p>`;
}



// Funzione per effettuare l'acquisto (simulazione chiamata AJAX)
function attivaAcquisto() {
    // Simulazione chiamata AJAX per l'acquisto
    // ...
    console.log('ACQUISTA BTC');

    // Esegui le azioni necessarie per l'acquisto
    // ...
}

// Funzione per effettuare la vendita (simulazione chiamata AJAX)
function attivaVendita() {
    // Simulazione chiamata AJAX per la vendita
    // ...
    console.log('VENDI BTC');
    // Esegui le azioni necessarie per la vendita
    // ...
}



// Funzione per calcolare la mediana di un array di numeri
function calcolaMediana(valori) {
    const sortedValori = valori.sort((a, b) => a - b);
    const len = sortedValori.length;
    const mid = Math.floor(len / 2);
    return len % 2 === 0 ? (sortedValori[mid - 1] + sortedValori[mid]) / 2 : sortedValori[mid];
}

// Funzione per calcolare la media di un array di valori
function calcolaMedia(valori) {
    const somma = valori.reduce((acc, valore) => acc + valore, 0);
    const media = somma / valori.length;
    return media;
}

// Funzione per calcolare il percentile di un array di valori
function calcolaPercentile(valori, percentile) {
    const sortedValori = valori.sort((a, b) => a - b);
    const index = (percentile / 100) * (sortedValori.length - 1);
    const floorIndex = Math.floor(index);
    const ceilIndex = Math.ceil(index);

    if (floorIndex === ceilIndex) {
        return sortedValori[floorIndex];
    }

    const d0 = sortedValori[floorIndex] * (ceilIndex - index);
    const d1 = sortedValori[ceilIndex] * (index - floorIndex);

    return d0 + d1;
}


// Funzione per calcolare la deviazione standard di un array di numeri
function calcolaDeviazioneStandard(valori) {
    const media = calcolaMedia(valori);
    const diffQuadratiche = valori.map(valore => Math.pow(valore - media, 2));
    const varianza = calcolaMedia(diffQuadratiche);
    return Math.sqrt(varianza);
}

// Funzione per calcolare la varianza di un array di numeri
function calcolaVarianza(valori) {
    const media = calcolaMedia(valori);
    const diffQuadratiche = valori.map(valore => Math.pow(valore - media, 2));
    return calcolaMedia(diffQuadratiche);
}

// Funzione per estrarre il prezzo di vendita di partenza con calcoli statistici
function estraiPrezzoIniziale(valori) {
    const mediana = calcolaMediana(valori);
    const media = calcolaMedia(valori);
    const percentile75 = calcolaPercentile(valori, 75);
    const deviazioneStandard = calcolaDeviazioneStandard(valori);
    const varianza = calcolaVarianza(valori);

    const risultato = {
        mediana,
        media,
        percentile75,
        deviazioneStandard,
        varianza
    };

    return risultato;
}

function mostraRisultati(prezzoIniziale) {
    const risultatiDiv = document.getElementById('risultato-container'); // oppure utilizza una classe

    // Aggiungi i risultati al div
    risultatiDiv.innerHTML = `
    <p>Mediana: ${prezzoIniziale.mediana}</p>
    <p>Media: ${prezzoIniziale.media}</p>
    <p>Percentile 75: ${prezzoIniziale.percentile75}</p>
    <p>Deviazione standard: ${prezzoIniziale.deviazioneStandard}</p>
    <p>Varianza: ${prezzoIniziale.varianza}</p>
  `;
}

// Utilizzo della funzione per estrarre il prezzo di vendita di partenza
function aggiornaRoi(prezzi){
    console.log('totale array prezzi', prezzi);
    prezzoIniziale = estraiPrezzoIniziale(prezzi);

    controllaPrezzoROI(price, quantita);
    
    mostraRisultati(prezzoIniziale);

}
