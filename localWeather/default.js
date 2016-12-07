var weatherData = {};

function geoLocate() {
    var lat = 0;
    var lon = 0;

    // if (navigator.geolocation) {
    //   document.getElementById('position').innerHTML = "Yes";

    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        // console.log("lat = ", lat, "lon = ", lon);
        getForecast(lat, lon);
    });
}

function getForecast(lat, lon) {
    var xhr = new XMLHttpRequest();
    var api = 'http://api.openweathermap.org/data/2.5/weather?';
    var key = '0abcae66974746b7b7bf53438db71f24';
    var apiUrl = api + 'lat=' + lat + '&lon=' + lon + '&APPID=' + key;

    xhr.open('GET', apiUrl, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            weatherData = JSON.parse(xhr.responseText);

            // add weather data to page
            document.getElementById('temp_max').innerHTML = Math.round(kelvinToFahrenheit(weatherData.main.temp_max)) + ' f';
            document.getElementById('temp_min').innerHTML = Math.round(kelvinToFahrenheit(weatherData.main.temp_min)) + ' f';
            document.getElementById('temp').innerHTML = Math.round(kelvinToFahrenheit(weatherData.main.temp)) + ' f';
            document.getElementById('description').innerHTML = weatherData.weather[0].main;
            document.getElementById('wind').innerHTML = Math.round(metersPsToMilesPh(weatherData.wind.speed)) + ' mph';
            document.getElementById('humidity').innerHTML = weatherData.main.humidity;
            // console.log(response);

            setBackgroundImage(weatherData.main.temp);
        }
    }
}

function setBackgroundImage(data) {
  // set the background image based on current temp
  var temp = Math.round(kelvinToFahrenheit(data));

  if (temp < 31) { document.body.style.backgroundImage = "url('/images/below31.jpg')"; }
  else if (temp >= 31 && temp < 41) { document.body.style.backgroundImage = "url('/images/31-40.jpg')"; }
  else if (temp >= 41 && temp < 51) { document.body.style.backgroundImage = "url('/images/41-50.jpg')"; }
  else if (temp >= 51 && temp < 61) { document.body.style.backgroundImage = "url('/images/51-60.jpg')"; }  
  else if (temp >= 61 && temp < 71) { document.body.style.backgroundImage = "url('/images/61-70.jpg')"; }
  else if (temp >= 71 && temp < 81) { document.body.style.backgroundImage = "url('/images/71-80.jpg')"; }
  else if (temp >= 81 && temp < 91) { document.body.style.backgroundImage = "url('/images/81-90.jpg')"; }
  else if (temp >= 91) { document.body.style.backgroundImage = "url('/images/above90.jpg')"; }
}

function kelvinToFahrenheit(tempKelvin) {
    // convert kelvin to fahrenheit
    var tempFahrenheit = tempKelvin * 9 / 5 - 459.67;
    return tempFahrenheit;
}

function fahrenheitToCelsius(tempFahrenheit) {
    // convert fahrenheit to celsius
    var tempCelsius = (tempFahrenheit - 32) * 5 / 9
    return tempCelsius;
}

function celsiusToFahrenheit(tempCelsius) {
    // convert celsius to fahrenheit
    var tempFahrenheit = tempCelsius * 9 / 5 + 32;
    return tempFahrenheit;
}

function metersPsToMilesPh(metersPs) {
    // convert meters per second to miles per hour
    var milesPh = metersPs * 9 / 4;
    return milesPh;
}

function milesToKilometers(miles) {
    // convert miles to kilometers
    return miles * 1.6;
}

function kilometersToMiles(kilometers) {
    // convert kilometers to miles
    return kilometers * 0.62;
}

function changeUnits() {
    // check if units are imperial, if they are, change to metric
    if (document.getElementById('temp').innerHTML.slice(-1) === 'f') {
        // change current temperature
        var tempFahrenheit = parseInt(document.getElementById('temp').innerHTML.split(' ')[0], 10);
        var tempCelsius = Math.round(fahrenheitToCelsius(tempFahrenheit));
        tempCelsius.toString(10);
        document.getElementById('temp').innerHTML = tempCelsius + ' c';

        // change high temp
        tempFahrenheit = parseInt(document.getElementById('temp_max').innerHTML.split(' ')[0], 10);
        tempCelsius = Math.round(fahrenheitToCelsius(tempFahrenheit));
        tempCelsius.toString(10);
        document.getElementById('temp_max').innerHTML = tempCelsius + ' c';

        // change low temp
        tempFahrenheit = parseInt(document.getElementById('temp_min').innerHTML.split(' ')[0], 10);
        tempCelsius = Math.round(fahrenheitToCelsius(tempFahrenheit));
        tempCelsius.toString(10);
        document.getElementById('temp_min').innerHTML = tempCelsius + ' c';

        // change wind speed
        var windSpeedMiles = parseInt(document.getElementById('wind').innerHTML.split(' ')[0], 10);
        var windSpeedKilos = Math.round(milesToKilometers(windSpeedMiles));
        windSpeedKilos.toString(10);
        document.getElementById('wind').innerHTML = windSpeedKilos + ' kph';

    } else { // else, change to imperial
        // change current temperature
        var tempCelsius = parseInt(document.getElementById('temp').innerHTML.split(' ')[0], 10);
        var tempFahrenheit = Math.round(celsiusToFahrenheit(tempCelsius));
        tempCelsius.toString(10);
        document.getElementById('temp').innerHTML = tempFahrenheit + ' f';

        // change high temp
        var tempCelsius = parseInt(document.getElementById('temp_max').innerHTML.split(' ')[0], 10);
        var tempFahrenheit = Math.round(celsiusToFahrenheit(tempCelsius));
        tempCelsius.toString(10);
        document.getElementById('temp_max').innerHTML = tempFahrenheit + ' f';

        // change low temp
        var tempCelsius = parseInt(document.getElementById('temp_min').innerHTML.split(' ')[0], 10);
        var tempFahrenheit = Math.round(celsiusToFahrenheit(tempCelsius));
        tempCelsius.toString(10);
        document.getElementById('temp_min').innerHTML = tempFahrenheit + ' f';

        // change wind speed
        var windSpeedKilos = parseInt(document.getElementById('wind').innerHTML.split(' ')[0], 10);
        var windSpeedMiles = Math.round(kilometersToMiles(windSpeedKilos));
        windSpeedMiles.toString(10);
        document.getElementById('wind').innerHTML = windSpeedMiles + ' mph';
    }
}

// add event listeners
// var geoLocateButton = document.getElementById('geoLocateButton');
var changeUnitsButton = document.getElementById('changeUnits');

// geoLocateButton.addEventListener('click', geoLocate, false);
changeUnitsButton.addEventListener('click', changeUnits, false);

// start this whole crazy mess running!
geoLocate();
