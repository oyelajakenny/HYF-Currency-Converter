// Function to insert rate

let rates = {
  USD: { EUR: 0.85, GBP: 0.75, NGN: 1500 },
  EUR: { USD: 1.18, GBP: 0.88, NGN: 1600 },
  GBP: { USD: 1.33, EUR: 1.14, NGN: 2000 },
};

function insertRate() {
  const fromCurrency = document.getElementById("fromCurrency").value.toUpperCase();
  const toCurrency = document.getElementById("toCurrency").value.toUpperCase();
  const rate = parseFloat(document.getElementById("rate").value);

  if (!rates[fromCurrency]) {
    rates[fromCurrency] = {};
  }

  rates[fromCurrency][toCurrency] = rate;

  displayRates();
  document.getElementById("rateForm").reset();
}

function displayRates() {
  let table ="<table><tr><th>From</th><th>To</th><th>Rate</th><th>Time</th></tr>";
  for (let fromCurrency in rates) {
    for (let toCurrency in rates[fromCurrency]) {
      table += `<tr><td>${fromCurrency}</td><td>${toCurrency}</td><td>${rates[fromCurrency][toCurrency]}</td><td>${toCurrency}</tr>`;
    }
  }
  table += "</table>";
  document.getElementById("currentRates").innerHTML = table;
}

// Initial display of rates
displayRates();

// function to update rate
function updateRate() {
  const ufromCurrency = document.getElementById("ufromCurrency").value.toUpperCase();
  const utoCurrency = document.getElementById("utoCurrency").value.toUpperCase();
  const rate = parseFloat(document.getElementById("rate").value);

  if (!rates[ufromCurrency] || !rates[ufromCurrency][utoCurrency]) {
    alert("The specified currency conversion does not exist.");
    return;
  }
  
  if (isNaN(rate)) {
    alert("Please enter a valid number for the rate.");
    return;
  }

  

  rates[ufromCurrency][utoCurrency] = rate;

  displayRates();
  document.getElementById("updateRateForm").reset();
}

function displayRates() {
  let table = "<table><tr><th>From</th><th>To</th><th>Rate</th></tr>";
  for (let ufromCurrency in rates) {
    for (let utoCurrency in rates[ufromCurrency]) {
      table += `<tr><td>${ufromCurrency}</td><td>${utoCurrency}</td><td>${rates[ufromCurrency][utoCurrency]}</td></tr>`;
    }
  }
  document.getElementById("currentRates").innerHTML = table;
}

// Initial display of rates
displayRates();

// Rate conversion function
function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fCurrency = document.getElementById("fCurrency").value;
  const tCurrency = document.getElementById("tCurrency").value;
  const now = new Date();
  const date = new Date().toDateString();
  const minutes = now.getMinutes()
  const hours = now.getHours()

  
  const rates = {
    USD: { EUR: 0.85, GBP: 0.75, JPY: 110 },
    EUR: { USD: 1.18, GBP: 0.88, JPY: 130 },
    GBP: { USD: 1.33, EUR: 1.14, JPY: 148 },
    // Add more rates as needed
  };

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerText =
      "Please enter a valid amount.";
    return;
  }

  if (!rates[fCurrency] || !rates[fCurrency][tCurrency]) {
    document.getElementById("result").innerText =
      "Conversion rate not available.";
    return;
  }

  const rate = rates[fCurrency][tCurrency];
  const convertedAmount = amount * rate;
  document.getElementById("result").innerText = `${amount} ${fCurrency} = ${convertedAmount.toFixed()} ${tCurrency}, ${date}, ${hours}:${minutes}`;
  document.getElementById("rateForm").reset();
  return rate;
}
