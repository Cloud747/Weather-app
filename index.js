const init = () => {

    //getting the button connected
    let btn = document.querySelector("#getWeather");
    btn.addEventListener("click", getWeatherByZip);
    }

const getWeatherByZip = () => {

    //declare items to be used in this program
    let url = "http://api.geonames.org/postalCodeSearchJSON";
    let params = "?username=wolfspeak101&countryCode=US&postalcode= " + document.getElementById("zipcodefield").value;
    
    let xhr = new XMLHttpRequest();

    //sending in the request
    xhr.open("GET", url + params);

    //Define the callback request
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);

            //declaring all variables to utilize with this method
            let jsObjectData = JSON.parse(xhr.responseText);
            let latitude = jsObjectData.postalCodes[0].lat;
            let longitude = jsObjectData.postalCodes[0].lng;
            let city = jsObjectData.postalCodes[0].placeName;
            let zipCode = {latitude: latitude, longitude: longitude, city: city};

            //calling the other request to find the weather by location
            getWeatherByLocation(zipCode);
        }
    }
    xhr.send(null);
}

//Second request that will gather a weather observation which includes temp. and wind information
const getWeatherByLocation = (location) => {

    //declaring the server details
    let url = "http://api.geonames.org/findNearByWeatherJSON"
    let params = "?username=wolfspeak101&lat=" + location.latitude + "&lng=" + location.longitude;

    let xhr = new XMLHttpRequest();
    //sending in the request
    xhr.open("GET", url + params);

    //Define the callback request
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            //declaring the variables needed
            let jsObjectData = JSON.parse(xhr.responseText);
            let temperature = convertToFahrenheit(parseInt(jsObjectData.weatherObservation.temperature));
            let windinformation = jsObjectData.weatherObservation.windSpeed;

            //Adding them to the HTML page
            document.getElementById("yourcity").innerHTML=location.city;
            document.getElementById("temperature").innerHTML=parseInt(temperature) + "&#176; F";
            document.getElementById("windinformation").innerHTML=parseInt(jsObjectData.weatherObservation.windSpeed) + " Mph";

            //logic that will determine if the hot or cold icon will appear 
            // if (temperature <= 34) {
            //     document.getElementById("cold-icon").style.display="block";
            //     document.getElementById("hot-icon").style.display="none";
            // }
            // else if (temperature >= 65) {
            //     document.getElementById("hot-icon").style.display="block";
            //     document.getElementById("cold-icon").style.display="none";
            // } else {
            //     document.getElementById("cold-icon").style.display="none";
            //     document.getElementById("hot-icon").style.display="none";
            // }
            // if (windinformation >= 3) {
            //     document.getElementById("wind-icon").style.display="block";
            // } 
        }
    }
    xhr.send(null);
}
//conversion method for degrees
const convertToFahrenheit = (celcius) => {
    return celcius * 1.8 + 32;
}





window.onload = init;

