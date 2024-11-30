# Currency Exchange App - README

## Overview
The **Currency Exchange App** is a dynamic JavaScript-based web application that facilitates currency rate management, conversion, and analysis. The app features an interactive user interface where users can:

- View current exchange rates.
- Add new currency rates.
- Update existing rates.
- Search for specific currency conversion rates.
- Perform real-time currency conversion.
- Monitor the best-performing currency pairs.
- Get live market status updates based on predefined timings.

---

## Features

### 1. **Live Exchange Rate Display**
- Fetches exchange rates from an external JSON data source.
- Displays rates in a tabular format for easy reference.

### 2. **Currency Rate Management**
- **Insert New Rate**: Add a new exchange rate by specifying the base and target currencies.
- **Update Rate**: Update an existing exchange rate. If the rate does not exist, an error message is displayed.

### 3. **Currency Conversion**
- Converts a given amount from one currency to another based on the exchange rate.
- Provides error messages for invalid input or unavailable conversion rates.

### 4. **Search Feature**
- Search rates by base currency, target currency, or both.
- Displays matching rates in a readable format.

### 5. **Best Performing Currency**
- Identifies and displays the currency pair with the highest exchange rate.

### 6. **Market Status**
- Shows live market status (open or closed) based on predefined timings:
  - Market opens at **9:00 AM** and closes at **5:00 PM**.
- Provides a countdown timer for the next market event.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/oyelajakenny/oyelajakenny.github.io.git
   ```
2. Ensure you have a live server (e.g., VSCode Live Server or any HTTP server) to serve the application.

3. Open the `index.html` file in your preferred browser.

---

## How to Use

### Viewing Current Rates
1. Launch the app in a browser.
2. View the live exchange rates displayed in the table under the **Current Rates** section.

### Adding a New Rate
1. Enter the base currency, target currency, and exchange rate in the **Insert Rate** form.
2. Submit the form to add the rate to the list.

### Updating an Existing Rate
1. Enter the base currency, target currency, and updated exchange rate in the **Update Rate** form.
2. Submit the form to update the rate. If the rate doesn’t exist, you’ll receive an error.

### Searching for Rates
1. Use the **Search Rates** form to find specific rates:
   - Specify the base currency, target currency, or both.
2. Results will be displayed in the **Search Results** section.

### Performing Currency Conversion
1. Enter the amount, base currency, and target currency in the **Currency Converter** form.
2. Submit the form to see the converted amount.

### Viewing Best Performing Currency
1. The **Top Currency** section displays the pair with the highest exchange rate.

### Market Status
- The **Market Status** section updates in real-time, showing whether the market is open or closed and counting down to the next event.

---

## JSON Data Source
The app fetches currency data from the following external source:
- URL: [app.json](https://raw.githubusercontent.com/oyelajakenny/oyelajakenny.github.io/main/app.json)

---

## Technologies Used
- **HTML**: Structure and layout.
- **CSS**: Styling and responsiveness.
- **JavaScript**: Core functionality and DOM manipulation.
- **Fetch API**: For fetching external JSON data.

---

## Future Enhancements
- Add user authentication for rate management.
- Provide real-time updates using WebSockets.
- Expand to support historical exchange rate trends.

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
