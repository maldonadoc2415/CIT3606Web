// Define UI elements

const USD = document.getElementById("USD");
const RUP = document.getElementById("RUP");


// Define conversion functions
function convertToRup() {
    let usd = parseFloat(USD.value);
    let rup = usd * 16467
    RUP.value = rup.toFixed(2);
    


    
}
function convertToUsd() {
    let rup = parseFloat(RUP.value);
    let usd = rup / 16467
    USD.value = usd.toFixed(2);
}
    

