import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleWeatherResponse(response, city);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function getFahrenheit(kelvin) {
  let request = new XMLHttpRequest();
  const url = `https://sheltered-journey-82717.herokuapp.com/convert?kelvin=${kelvin}`;

  request.addEventListener("loadend", function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleConversionResponse(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// this function takes the fahrenheit temperature number and pings an API that returns the 
function getAsciiCharacter(fahrenheit) {
  let request = new XMLHttpRequest();
  const url = `https://sheltered-journey-82717.herokuapp.com/ascii?fahrenheit=${fahrenheit}`;

  request.addEventListener("loadend", function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleAsciiResponse(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function handleWeatherResponse(response, city) {
  printKelvins(response.main.temp, city);
  getFahrenheit(response.main.temp);
}

function handleConversionResponse(response) {
  printFahrenheit(response);
  getAsciiCharacter(response);
}

function handleAsciiResponse(response) {
  if (response.random) {
    printChar(response.random);
  } else {
    printChar(response.actualAsciiChar);
  }
}

// UI Logic
function printKelvins(response, city) {
  document.querySelector('#temp').innerText = `The temperature in Kelvins for ${city} is: ${response}`;
}

function printFahrenheit(response) {
  document.querySelector('#tempInF').innerText = `The temperature in Fahrenheit is: ${response}`;
}

function printChar(response) {
  document.querySelector('#char').innerText = `The generated character is: ${response}`;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.querySelector('#location').value;
    document.querySelector('#location').value = null;
    getWeather(city);
  });
});