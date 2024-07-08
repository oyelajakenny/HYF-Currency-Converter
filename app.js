let currencyData = {
  timestamp: Date.now(),
  date: new Date().toISOString().split("T")[0],
  rates: {
    DKK: { USD: 7 },
  },
};

//Insert Rate function
function insertRate() {
  const baseCurrency = document.getElementById("baseCurrency").value.toUpperCase();
  const toCurrency = document.getElementById("toCurrency").value.toUpperCase();
  const rate = parseFloat(document.getElementById("rate").value);

  if (!currencyData.rates[baseCurrency]) {
    currencyData.rates[baseCurrency] = {};
        }

  currencyData.rates[baseCurrency][toCurrency] = rate;

  displayRates();
  document.getElementById("rateForm").reset();
}

// Convert currency Function
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document
    .getElementById("convertFrom")
    .value.toUpperCase();
  const toCurrency = document.getElementById("convertTo").value.toUpperCase();

  if (isNaN(amount)) {
    document.getElementById("result").innerText =
      "Please enter a valid number for the amount.";
    return;
  }

  if (
    !currencyData.rates[fromCurrency] ||
    !currencyData.rates[fromCurrency][toCurrency]
  ) {
    document.getElementById("result").innerText ="Currency conversion rate not available.";
    return;
  }

  const conversionRate = currencyData.rates[fromCurrency][toCurrency];
  const convertedAmount = amount * conversionRate;

  document.getElementById(
    "result"
  ).innerText = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(
    2
  )} ${toCurrency}`;
}

//Update Currency function

function updateRate() {
  const baseCurrency = document.getElementById("baseCurrencyUpdate").value.toUpperCase();
  const toCurrency = document.getElementById("toCurrencyUpdate").value.toUpperCase();
  const rate = parseFloat(document.getElementById("rateUpdate").value);

  if (
    !currencyData.rates[baseCurrency] ||!currencyData.rates[baseCurrency][toCurrency]) {
      document.getElementById("updateError").innerText = "This currency rate does not exist. Use the insert form to add it.";
    return;
  }
  currencyData.rates[baseCurrency][toCurrency] = rate;
  document.getElementById("updateError").innerText = "";

  displayRates();
  document.getElementById("updateRateForm").reset();
}

function displayRates() {
  let table =
    "<table><tr><th>From Currency</th><th>To Currency</th><th>Rate</th></tr>";
  for (let baseCurrency in currencyData.rates) {
    for (let toCurrency in currencyData.rates[baseCurrency]) {
      table += `<tr><td>${baseCurrency}</td><td>${toCurrency}</td><td>${currencyData.rates[baseCurrency][toCurrency]}</td></tr>`;
    }
  }
  table += "</table>";
  document.getElementById("currentRates").innerHTML = table;
}

// Initial display of rates
displayRates();
