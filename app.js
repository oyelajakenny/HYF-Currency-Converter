document.addEventListener("DOMContentLoaded", () => {
  let currencyData = [];

  async function getData() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/oyelajakenny/oyelajakenny.github.io/main/app.json"
      );
      const data = await response.json();
      currencyData = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    displayRates();
    topCurrency();
  }

  //Market status
  function updateCountdownAndStatus(timeUntilEvent, status) {
    const countdownDiv = document.getElementById("countdown");
    const hours = Math.floor(timeUntilEvent / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeUntilEvent % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeUntilEvent % (1000 * 60)) / 1000);
    countdownDiv.innerText = `Market is ${status} until next  ${hours}h : ${minutes}m : ${seconds}s`;
    countdownDiv.style.color = status === "open" ? "green" : "red";
  }
  function initializeAnnouncements() {
    let now = new Date();

    // Market opens at 9 AM
    let marketOpen = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      9,
      0,
      0,
      0
    );

    // Market closes at 5 PM
    let marketClose = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      17,
      0,
      0,
      0
    );

    // Calculate time differences
    let timeUntilOpen = marketOpen - now;
    let timeUntilClose = marketClose - now;

    // If market is already open, calculate until the next open (next day)
    if (timeUntilOpen < 0) {
      marketOpen.setDate(marketOpen.getDate() + 1);
      timeUntilOpen = marketOpen - now;
    }

    // If market is already closed, calculate until the next close (next day)
    if (timeUntilClose < 0) {
      marketClose.setDate(marketClose.getDate() + 1);
      timeUntilClose = marketClose - now;
    }
    setInterval(() => {
      now = new Date();
      if (now.getHours() >= 9 && now.getHours() < 17) {
        // Market is open
        updateCountdownAndStatus(marketClose - now, "open");
      } else {
        // Market is closed
        updateCountdownAndStatus(marketOpen - now, "closed");
      }
    }, 1000);
  }
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
  //Insert rate
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
  //Currency converter
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

  //Update form

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
  //Search form

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

  //Best performing currency pair

  function topCurrency() {
    let bestRate = 0;
    let bestPair = "";

    currencyData.forEach((currency) => {
      if (currency.rate > bestRate) {
        bestRate = currency.rate;
        bestPair = `${currency.from} to ${currency.to}`;
      }
    });

    if (bestRate > 0) {
      document.getElementById(
        "topCurrency"
      ).innerText = `Top currency is ${bestPair} with a rate of ${bestRate}`;
    }
  }
  //Display the best performing currency
  topCurrency();

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
  getData();
  initializeAnnouncements();
});
