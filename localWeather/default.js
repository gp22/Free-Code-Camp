function geoLocate() {
    var lat = 0;
    var lon = 0;

    // if (navigator.geolocation) {
    //   document.getElementById('position').innerHTML = "Yes";

    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log("lat = ", lat, "lon = ", lon);
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
            var response = JSON.parse(xhr.responseText);

            document.getElementById('temp_max').innerHTML = Math.round(kelvinToFahrenheit(response.main.temp_max));
            document.getElementById('temp_min').innerHTML = Math.round(kelvinToFahrenheit(response.main.temp_min));
            document.getElementById('temp').innerHTML = Math.round(kelvinToFahrenheit(response.main.temp));
            document.getElementById('description').innerHTML = response.weather[0].main;
            document.getElementById('wind').innerHTML = Math.round(metersPsToMilesPh(response.wind.speed));
            document.getElementById('humidity').innerHTML = response.main.humidity;

            // console.log(response.weather[0].main);
            // console.log(response.wind.speed);
            // console.log(response.main.humidity);
            console.log(response);
        }
    }
}

function kelvinToFahrenheit(tempKelvin) {
  // convert kelvin to fahrenheit
  var tempFahrenheit = tempKelvin * 9/5 - 459.67;
  return tempFahrenheit;
}

function fahrenheitToCelsius(tempFahrenheit) {
  // convert fahrenheit to celsius
  var tempCelsius = (tempFahrenheit - 32) * 5/9
  return tempCelsius;
}

function celsiusToFahrenheit(tempCelsius) {
  // convert celsius to fahrenheit
  var tempFahrenheit = tempCelsius * 9/5 + 32;
  return tempFahrenheit;
}

function metersPsToMilesPh(metersPs) {
  // convert meters per second to miles per hour
  var milesPh = metersPs * 9/4;
  return milesPh;
}
