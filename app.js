document.addEventListener("DOMContentLoaded", () => {
  let currencyData = [
    { from: "DKK", to: "NGN", rate: 300 },
    { from: "DKK", to: "CAD", rate: 70 },
    { from: "DKK", to: "EUR", rate: 70 },
    { from: "DKK", to: "USD", rate: 0.85 },
    { from: "DKK", to: "GBP", rate: 0.65 },
    { from: "USD", to: "DKK", rate: 7 },
    { from: "USD", to: "CAD", rate: 2 },
    { from: "USD", to: "EUR", rate: 1.5 },
    { from: "USD", to: "GBP", rate: 0.75 },
    { from: "USD", to: "NGN", rate: 1500 },
    { from: "EUR", to: "DKK", rate: 8 },
    { from: "EUR", to: "CAD", rate: 200 },
    { from: "EUR", to: "GBP", rate: 0.9 },
    { from: "EUR", to: "NGN", rate: 1700 },
    { from: "GBP", to: "DKK", rate: 9 },
    { from: "GBP", to: "CAD", rate: 150 },
    { from: "GBP", to: "USD", rate: 0.75 },
    { from: "GBP", to: "NGN", rate: 2000 },
    { from: "CAD", to: "DKK", rate: 4 },
    { from: "CAD", to: "USD", rate: 1.5 },
    { from: "CAD", to: "GBP", rate: 0.75 },
  ];

  function searchRate(baseCurrency, toCurrency) {
    if (baseCurrency && toCurrency) {
      return currencyData.filter(
        (rate) => rate.from === baseCurrency && rate.to === toCurrency
      );
    } else if (baseCurrency) {
      return currencyData.filter((rate) => rate.from === baseCurrency);
    } else if (toCurrency) {
      return currencyData.filter((rate) => rate.to === toCurrency);
    }
    return [];
  }

  rateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const baseCurrency = document
      .getElementById("baseCurrency")
      .value.trim()
      .toUpperCase();
    const toCurrency = document
      .getElementById("toCurrency")
      .value.trim()
      .toUpperCase();
    const rate = parseFloat(document.getElementById("rate").value.trim());
    const existingRate = searchRate(baseCurrency, toCurrency);
    if (existingRate.length > 0) {
      existingRate[0].rate = rate;
    } else {
      currencyData.push({ from: baseCurrency, to: toCurrency, rate });
    }
    document.getElementById("rateForm").reset();
    displayRates();
  });

  converterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value.trim());
    const fromCurrency = document
      .getElementById("convertFrom")
      .value.trim()
      .toUpperCase();
    const toCurrency = document
      .getElementById("convertTo")
      .value.trim()
      .toUpperCase();

    if (isNaN(amount)) {
      document.getElementById("errorResult").innerText =
        "Please enter a valid number for the amount.";
      document.getElementById("result").innerText = "";
      return;
    }
    const conversionRate = searchRate(fromCurrency, toCurrency);
    if (conversionRate.length === 0) {
      document.getElementById("errorResult").innerText =
        "Currency conversion rate not available.";
      document.getElementById("result").innerText = "";
      return;
    }
    const convertedAmount = amount * conversionRate[0].rate;
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
      .value.trim()
      .toUpperCase();
    const toCurrency = document
      .getElementById("toCurrencyUpdate")
      .value.trim()
      .toUpperCase();
    const rate = parseFloat(document.getElementById("rateUpdate").value.trim());
    const existingRate = searchRate(baseCurrency, toCurrency);
    if (existingRate.length > 0) {
      existingRate[0].rate = rate;
      document.getElementById("updateError").innerText = "";
    } else {
      document.getElementById("updateError").innerText =
        "This currency rate does not exist and can't be updated. Use the insert form to add it.";
    }

    document.getElementById("updateRateForm").reset();
    displayRates();
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchFromCurrency =
      document.getElementById("searchFrom").value.trim().toUpperCase() || null;
    const searchToCurrency =
      document.getElementById("searchTo").value.trim().toUpperCase() || null;
    const searchedRates = searchRate(searchFromCurrency, searchToCurrency);
    if (searchedRates.length > 0) {
      let result = "";
      searchedRates.forEach((rate) => {
        result += `1 ${rate.from} to ${rate.to} = ${rate.rate} ${rate.to}\n`;
      });
      document.getElementById(
        "searchResult"
      ).innerText = `Search results:\n${result}`;
    } else {
      document.getElementById("searchResult").innerText = "No result found";
    }
  });

  function displayRates() {
    let table =
      "<table><tr><th>From Currency</th><th>To Currency</th><th>Rate</th></tr>";

    currencyData.forEach((rate) => {
      table += `<tr><td>${rate.from}</td><td>${rate.to}</td><td>${rate.rate}</td></tr>`;
    });

    table += "</table>";
    document.getElementById("currentRates").innerHTML = table;
  }

  // Initial display of rates
  displayRates();
});
