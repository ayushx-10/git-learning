// ======================
// Netflix Intro Handling
// ======================
window.addEventListener("load", () => {
  const intro = document.querySelector(".netflix-intro");
  setTimeout(() => {
    intro.style.transition = "opacity 1s ease";
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.style.display = "none";
      document.querySelectorAll(".wrapper, .graph-container")
        .forEach(el => el.style.display = "block");
    }, 1000);
  }, 3500);
});








// ======================
// Global Variables
// ======================
const fromCurrency = document.getElementById("from-currency-select");
const toCurrency = document.getElementById("to-currency-select");
const convertButton = document.getElementById("convert-button");
const swapButton = document.getElementById("swap-button");
const result = document.getElementById("result");
const amountInput = document.getElementById("amount");
const daysSelect = document.getElementById("days");
const ctx = document.getElementById("currencyChart").getContext("2d");

let currencyChart;

// ======================
// Fetch & Populate Currencies
// ======================
async function loadCurrencies() {
  const res = await fetch("https://api.frankfurter.app/currencies");
  const data = await res.json();
  const currencies = Object.keys(data);

  fromCurrency.innerHTML = "";
  toCurrency.innerHTML = "";

  currencies.forEach(code => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = code;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  // Default selections
  fromCurrency.value = "USD";
  toCurrency.value = "INR";

  // Do initial conversion
  convertCurrency();
}
loadCurrencies();

// ======================
// Convert Currency
// ======================
async function convertCurrency() {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || amount <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  // Use Frankfurter API for conversion
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
  );
  const data = await res.json();

  if (!data.rates || !data.rates[to]) {
    result.textContent = "Conversion rate not available.";
    return;
  }

  const converted = data.rates[to].toFixed(2);
  result.textContent = `${amount} ${from} = ${converted} ${to}`;

  // Load chart for selected currencies
  loadChart(from, to, daysSelect.value);
}
convertButton.addEventListener("click", convertCurrency);

// ======================
// Swap Button
// ======================
swapButton.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
});

// ======================
// Historical Data & Chart
// ======================
async function loadChart(from, to, days) {
  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const start = startDate.toISOString().split("T")[0];

  const res = await fetch(
    `https://api.frankfurter.app/${start}..${endDate}?from=${from}&to=${to}`
  );
  const data = await res.json();

  const labels = Object.keys(data.rates).sort();
  const values = labels.map(date => data.rates[date][to]);

  if (currencyChart) {
    currencyChart.destroy();
  }

  currencyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: `${from} → ${to}`,
        data: values,
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "white" } }
      },
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" }
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      }
    }
  });
}

// ======================
// Change Graph on Days Select
// ======================
daysSelect.addEventListener("change", convertCurrency);













// ======================
// Floating Background Bubbles
// ======================
const bubbleBackground = document.querySelector(".bubble-background");

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("circle");

  // Random size
  const size = Math.random() * 40 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random horizontal position
  bubble.style.left = Math.random() * window.innerWidth + "px";

  // Neon-like gradient colors
  const colors = [
    "rgba(255, 77, 109, 0.6)",
    "rgba(0, 255, 255, 0.6)",
    "rgba(255, 255, 0, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(0, 255, 128, 0.6)"
  ];
  bubble.style.background = colors[Math.floor(Math.random() * colors.length)];

  bubbleBackground.appendChild(bubble);

  // Remove after animation
  setTimeout(() => bubble.remove(), 8000);
}

// Keep spawning bubbles
setInterval(createBubble, 500);

const symbols = [
  { char: "$", color: "#00ff00" },   // Green
  { char: "€", color: "#00aaff" },   // Blue
  { char: "₹", color: "#ff9933" },   // Saffron
  { char: "£", color: "#b266ff" },   // Purple
  { char: "¥", color: "#ff3333" },   // Red
  { char: "₿", color: "#ffaa00" },   // Orange
  { char: "₩", color: "#66ffcc" },   // Mint
  { char: "₽", color: "#ffffff" }    // White
];

const bg = document.querySelector(".bubble-background");

function createSymbol() {
  const symbol = document.createElement("div");
  symbol.classList.add("currency-symbol");

  // Pick random symbol
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  symbol.textContent = randomSymbol.char;
  symbol.style.color = randomSymbol.color;
  symbol.style.textShadow = `0 0 10px ${randomSymbol.color}, 0 0 20px ${randomSymbol.color}`;

  // Random position and size
  symbol.style.left = Math.random() * 100 + "vw";
  symbol.style.fontSize = 20 + Math.random() * 30 + "px";

  // Random animation duration
  const duration = 6 + Math.random() * 5;
  symbol.style.animationDuration = duration + "s";

  bg.appendChild(symbol);

  // Remove after animation
  setTimeout(() => {
    symbol.remove();
  }, duration * 1000);
}

// Keep spawning symbols
setInterval(createSymbol, 400);





// themeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const toggleBtn = document.getElementById("theme-toggle");

// Check saved theme
if (localStorage.getItem("theme") === "night") {
  document.body.classList.add("night-mode");
  toggleBtn.textContent = "☀️ Day Mode";
} else {
  document.body.classList.add("day-mode");
  toggleBtn.textContent = "🌙 Night Mode";
}

// Toggle Theme on Click
toggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("day-mode")) {
    document.body.classList.remove("day-mode");
    document.body.classList.add("night-mode");
    toggleBtn.textContent = "☀️ Day Mode";
    localStorage.setItem("theme", "night");
  } else {
    document.body.classList.remove("night-mode");
    document.body.classList.add("day-mode");
    toggleBtn.textContent = "🌙 Night Mode";
    localStorage.setItem("theme", "day");
  }
});





function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('');
}

function populateDropdown(selectElement, currencies) {
  currencies.forEach(currency => {
    const option = document.createElement("option");
    const countryCode = currency.slice(0, 2); // first 2 letters = country
    const flag = getFlagEmoji(countryCode);
    option.value = currency;
    option.textContent = `${flag} ${currency}`;
    selectElement.appendChild(option);
  });
}

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
populateDropdown(fromDropDown, currencies);
populateDropdown(toDropDown, currencies);














async function fetchForexQuotes() {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/fx?apikey=${fmpApiKey}`
    );
    const data = await response.json();

    const quotesList = document.getElementById("quotes-list");
    quotesList.innerHTML = "";

    // Show only a few major pairs
    const majorPairs = ["EUR/USD", "USD/INR", "GBP/USD", "USD/JPY", "AUD/USD"];

    majorPairs.forEach(pair => {
      const quote = data.find(item => item.ticker === pair);
      if (quote) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${quote.ticker}</strong>: ${quote.bid} / ${quote.ask}`;
        quotesList.appendChild(li);
      }
    });
  } catch (error) {
    console.error("Error fetching forex quotes:", error);
  }
}

// Call when page loads
fetchForexQuotes();
