
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
    var key = '&APPID=0abcae66974746b7b7bf53438db71f24';
    var apiUrl = api + 'lat=' + lat + '&lon=' + lon + key;

    xhr.open('GET', apiUrl, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            // var tempFahrenheit = kelvinToFahrenheit(response.main.temp);
            var windSpeedMph = mpsToMph(response.wind.speed);

            // document.getElementById('quoteText').innerHTML = response.quote;
            // document.getElementById('quoteAuthor').innerHTML = response.author;
            // document.getElementById('tempFahrenheit').innerHTML =
            // document.getElementById('description').innerHTML = response.weather[0].description;
            // document.getElementById('wind').innerHTML = response.wind.speed;
            // document.getElementById('humidity').innerHTML = response.main.humidity;

            console.log(response.weather[0].description);
            console.log(response.wind.speed);
            console.log(response.main.humidity);
            console.log(response);
        }
    }
}

function kelvinToFahrenheit(tempKelvin) {

}

function fahrenheitToCelsius(tempFahrenheit) {

}

function celsiusToFahrenheit(tempCelsius) {

}

function mpsToMph(metersPerSecond) {

}
