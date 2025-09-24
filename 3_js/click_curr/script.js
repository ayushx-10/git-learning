let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

//Create dropdown from the currencies array
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

//Repeat same thing for the other dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

//Setting default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

let convertCurrency = () => {
  //Create References
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If amount input field is not empty
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);








// ---------------bublssssss part ---------------------------------------

document.body.addEventListener('click', function (event) {
    const circle = document.createElement('div');
    circle.className = 'circle';

  
  // check if click happened inside .wrapper
  if (event.target.closest(".wrapper")) return; // stop if inside wrapper
    
    const x = event.clientX;
    const y = event.clientY;
    circle.style.left = `${x - 25}px`
    circle.style.top = `${y - 25}px`   
  
   
    const colors = [
  '#A8DADC',
  '#BDE0FE',
  '#CDB4DB', 
  '#FFC8DD',
  '#FFAFCC', 
  '#0D0D0D',
  '#1A1A2E',
  '#16213E',
  '#2C3E50',
  '#3D2C8D',
  '#4A0E4E',
  '#2F2F2F'];
    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  

   const messages = ['$', '€', '₹', '£', '¥', '₩', '₽', '₺', '₦', '₫'];
    circle.textContent = messages[Math.floor(Math.random() * messages.length)];
  
    document.body.appendChild(circle);
  

    setTimeout(() => {
      circle.remove();
    }, 9000);
  });


  
// logoooooooooooooooooooooooooooooooooooooooooooooo

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".netflix-intro").style.display = "none";
    document.querySelector(".wrapper").style.display = "block"; // your wrapper already exists
  }, 3500); // 3.5s duration matches the animation
});












