const Base_url = "https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}&units=metric";
const apiKey = "c32475bb4a324b6f9916b112a702cd11";
const weatherContainer = document.getElementById("weather-container");
const form = document.getElementById("form");

let weatherArr = [];
let weather_object_arr = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = form.cityName.value;

    if (cityName === "") {
        alert("Please Enter City Name");
        return;
    }

    if (weatherArr.includes(cityName)) {
        alert(`${cityName.toUpperCase()} weather card already exists!`);
        return;
    }
    else {
        weatherArr.push(cityName);
        checkWeather(cityName);
    }

    form.reset();
});

async function checkWeather(city) {
    try {
        let result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        let data = await result.json();


        let icon_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        let obj = {
            cityName: data.name,
            country: data.sys.country,
            weather: data.weather[0].description,
            temp: data.main.temp,
            high: data.main.temp_max,
            img_url: icon_url,
            low: data.main.temp_min,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            clouds: data.clouds.all,
            sys_sunRise: data.sys.sunrise,
            sys_sunSet: data.sys.sunset
        };
        weather_object_arr.push(obj);
        weather_object_arr.sort((a, b) => a["temp"] - b["temp"]);
        weatherDetails(weather_object_arr);
    }
    catch (err) {
        console.log(err);
    }
}

function weatherDetails(Obj_arr) {
    weatherContainer.innerHTML = "";

    Obj_arr.forEach((element) => {

        const name = element.cityName;
        const countryName = element.country;
        const weather = element.weather;
        const main = element.temp.toFixed();
        const low = element.low.toFixed();
        const img = element.img_url;
        const high = element.high.toFixed();
        const humidity = element.humidity;
        const windSpeed = element.windSpeed;
        const clouds = element.clouds;
        const sys_sunRise = element.sys_sunRise;
        const pressure = element.pressure;
        let sunRise_time = new Date(sys_sunRise * 1000);
        sunRise_time = `${sunRise_time.getHours()} : ${sunRise_time.getMinutes()} am`;
        let sys_sunSet = element.sys_sunSet;
        let sunSet_time = new Date(sys_sunSet * 1000);
        sunSet_time = `${sunSet_time.getHours()} : ${sunSet_time.getMinutes()} pm`;

        img.className = 'weatherIcon';

        let weather_div = document.createElement("div");
        weather_div.className = "weather-div";
        weather_div.innerHTML = `<div id="temp_deg">
                            <div>${main} <span>&#176;</span>C</div>
                            <div><img src=${img}></div>
                        </div>
                            <div>
                                <div id="extra-details">
                                <div id="feels-like"> 
                                    <div>${weather}</div>
                                </div>
                                <div>Humidity: ${humidity}%</div>
                                <div id="wind-detail"><div>Wind speed: ${windSpeed}</div><div>Air Pressure: ${pressure} hPa</div>
                                
                                </div>
                                <div id="city-name-container">
                                
                                
                                    <div>
                                    <span id="high">H: ${high}°</span><span id="high">L: ${low}°</span>
                                    <p id="city-name-p">${name.toUpperCase()}, ${countryName.toUpperCase()}</p>
                                    </div>
                                    <div id="sun">
                                    <p><span class=material-icons id="sunrise_icon">wb_sunny</span><span>${sunRise_time}</span></p>
                                    <p><span class=material-icons id="sunset_icon">wb_twilight</span><span>${sunSet_time}</span></p>
                                    </div>
                                </div>
                            </div>
                        `;


        weatherContainer.appendChild(weather_div);
    });
}