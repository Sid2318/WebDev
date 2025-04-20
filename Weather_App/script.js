const apiKey = "361a66231cab639e81b87f24c82ee7cb";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchbox = document.querySelector(".searchname input");
const searchbtn = document.querySelector(".searchbar img");
const img = document.querySelector(".block1 img")

async function  checkWhether(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    console.log(city);
    console.log("Weather Condition:", data.weather[0].main);

    document.querySelector(".place").innerHTML = data.name;
    document.querySelector(".tmp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humiditypercentage").innerHTML = data.main.humidity + "%";
    document.querySelector(".windspeed").innerHTML = data.wind.speed+ "km/hr";
  
    if(data.weather[0].main == "Clouds")
    {
        img.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear")
    {
        img.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Mist")
    {
        img.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Rain")
    {
        img.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle")
    {
        img.src = "images/drizzle.png";
    }
        
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim(); // Get the value from the input box
    if (city) {
        checkWhether(city); // Call the function with the city as an argument
    } else {
        alert("Please enter a city name!");
    }
});


