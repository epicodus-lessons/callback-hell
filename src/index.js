import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getWeather(city, handleResponse) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleResponse(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function getFahrenheit(kelvin, handleResponse) {
  let request = new XMLHttpRequest();
  const url = `https://sheltered-journey-82717.herokuapp.com/convert?kelvin=${kelvin}`;
  request.addEventListener("loadend", function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleResponse(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// this function takes the fahrenheit temperature number and pings an API that returns the 
function getAsciiCharacter(fahrenheit, handleResponse) {
  let request = new XMLHttpRequest();
  const url = `https://sheltered-journey-82717.herokuapp.com/ascii?fahrenheit=${fahrenheit}`;

  request.addEventListener("loadend", function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      handleResponse(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

// UI Logic
function printChar(response) {
  document.querySelector('#char').innerText = `The generated character is: ${response}`;
}

function printKelvins(response, city) {
  document.querySelector('#temp').innerText = `The temperature in Kelvins for ${city} is: ${response}`;
}

function printFahrenheit(response) {
  document.querySelector('#tempInF').innerText = `The temperature in Fahrenheit is: ${response}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;

  getWeather(city, function(response) {
    printKelvins(response.main.temp, city);
    getFahrenheit(response.main.temp, function(response) {
      printFahrenheit(response);
      getAsciiCharacter(response, function(response) {
        if (response.random) {
          printChar(response.random);
        } else if (response.actualAsciiChar) {
          printChar(response.actualAsciiChar);
        }
      });
    });
  });
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});