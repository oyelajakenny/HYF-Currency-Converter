document.addEventListener("DOMContentLoaded", () => {
  let currencyData = {
    timestamp: Date.now(),
    date: new Date().toISOString().split("T")[0],
    rates: {
      DKK: { USD: 7 },
    },
  };

  rateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const baseCurrency = document
      .getElementById("baseCurrency")
      .value.toUpperCase();
    const toCurrency = document
      .getElementById("toCurrency")
      .value.toUpperCase();
    const rate = parseFloat(document.getElementById("rate").value);

    if (!currencyData.rates[baseCurrency]) {
      currencyData.rates[baseCurrency] = {};
    }

    currencyData.rates[baseCurrency][toCurrency] = rate;
    document.getElementById("rateForm").reset();
    displayRates();
  });

  converterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document
      .getElementById("convertFrom")
      .value.toUpperCase();
    const toCurrency = document.getElementById("convertTo").value.toUpperCase();

    if (isNaN(amount)) {
      document.getElementById("errorResult").innerText =
        "Please enter a valid number for the amount.";
      document.getElementById("result").innerText = "";
      return;
    }

    if (
      !currencyData.rates[fromCurrency] ||
      !currencyData.rates[fromCurrency][toCurrency]
    ) {
      document.getElementById("errorResult").innerText =
        "Currency conversion rate not available.";
      document.getElementById("result").innerText = "";
      return;
    }

    const conversionRate = currencyData.rates[fromCurrency][toCurrency];
    const convertedAmount = amount * conversionRate;

    document.getElementById(
      "result"
    ).innerText = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
    document.getElementById("errorResult").innerText = "";
  });

  updateRateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const baseCurrency = document
      .getElementById("baseCurrencyUpdate")
      .value.toUpperCase();
    const toCurrency = document
      .getElementById("toCurrencyUpdate")
      .value.toUpperCase();
    const rate = parseFloat(document.getElementById("rateUpdate").value);

    if (
      !currencyData.rates[baseCurrency] ||
      !currencyData.rates[baseCurrency][toCurrency]
    ) {
      document.getElementById("updateError").innerText =
        "This currency rate does not exist. Use the insert form to add it.";
      return;
    }
    currencyData.rates[baseCurrency][toCurrency] = rate;
    document.getElementById("updateError").innerText = "";
    document.getElementById("updateRateForm").reset();
    displayRates();
  });

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
})

