// store all JSON parsed weather data here
var weatherData = {};

function geoLocate() {
    var lat = 0;
    var lon = 0;

    function getCoords() {
        var xhr = new XMLHttpRequest();
        var api = 'http://ipinfo.io/json';

        xhr.open('GET', api, true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                locationData = JSON.parse(xhr.responseText);
                lat = locationData.loc.split(',')[0];
                lon = locationData.loc.split(',')[1];
                getForecast(lat, lon);
            }
        }
    }
    getCoords();
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

            setWeatherIcon(weatherData.weather[0].icon);
            setBackgroundImage(weatherData.main.temp);
        }
    }
}

function setWeatherIcon(data) {
    switch (data) {
        // daytime icons 1-4
        case '01d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/01d.png";
            break;
        case '02d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/02d.png";
            break;
        case '03d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/03d.png";
            break;
        case '04d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/04d.png"
            break;
            // nighttime icons 1-4
        case '01n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/01n.png";
            break;
        case '02n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/02n.png";
            break;
        case '03n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/03n.png";
            break;
        case '04n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/04n.png"
            break;
            // daytime icons 9-50
        case '09d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/09d.png";
            break;
        case '10d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/10d.png";
            break;
        case '11d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/11d.png";
            break;
        case '13d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/13d.png";
            break;
        case '50d':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/50d.png";
            break;
            // nighttime icons 9-50
        case '09n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/09n.png";
            break;
        case '10n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/10n.png";
            break;
        case '11n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/11n.png";
            break;
        case '13n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/13n.png";
            break;
        case '50n':
            document.getElementById('weather_icon').src = "http://openweathermap.org/img/w/50n.png";
            break;
    }
}

function setBackgroundImage(data) {
    // set the background image based on current temp
    var temp = Math.round(kelvinToFahrenheit(data));

    if (temp < 31) {
        document.body.style.backgroundImage = "url('/images/below31.jpg')";
    } else if (temp >= 31 && temp < 41) {
        document.body.style.backgroundImage = "url('/images/31-40.jpg')";
    } else if (temp >= 41 && temp < 51) {
        document.body.style.backgroundImage = "url('/images/41-50.jpg')";
    } else if (temp >= 51 && temp < 61) {
        document.body.style.backgroundImage = "url('/images/51-60.jpg')";
    } else if (temp >= 61 && temp < 71) {
        document.body.style.backgroundImage = "url('/images/61-70.jpg')";
    } else if (temp >= 71 && temp < 81) {
        document.body.style.backgroundImage = "url('/images/71-80.jpg')";
    } else if (temp >= 81 && temp < 91) {
        document.body.style.backgroundImage = "url('/images/81-90.jpg')";
    } else if (temp >= 91) {
        document.body.style.backgroundImage = "url('/images/above90.jpg')";
    }
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
