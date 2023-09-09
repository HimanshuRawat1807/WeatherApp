const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');


// defalut city when the page load
let cityInput="";
// add click event in the each city in the panel

const getLocation = async ()=> {
	if (search.value == "") {
		const API_KEY_LOCATION = `b1b210292d62489db7c3fbdeb7f04321`;
		const URL_LOCATION = `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY_LOCATION}`
		const responseLocation = await fetch(URL_LOCATION);
		const dataLocation = await responseLocation.json();
        console.log(dataLocation);
		cityInput = dataLocation.city+" "+dataLocation.connection.country;
        fetchWeatherData(cityInput);
	}
	else{
		cityInput = search.value;
        fetchWeatherData(cityInput);

	}
}

cities.forEach((e) => {
    e.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        e.target.style.color="white";
        fetchWeatherData();
        app.style.opacity = "0";
        e.target.style.color="";
    });   
});

form.addEventListener('submit', (e) => {

    if (search.value.length == 0) {
        alert("Please Enter The City");
    }
    else {
        cityInput = search.value;
        fetchWeatherData(cityInput);
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
})

function dayofTheWeek() {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]
    return weekday[new Date().getDay()];
}


function fetchWeatherData() {

    const API_KEY = 'f27af6254a7c43748ac140138230609';
    // const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}`;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}`;
    // http://api.weatherapi.com/v1/current.json?key=f27af6254a7c43748ac140138230609&q=mumbai;
    fetch(URL)
        .then(response => response.json())
        .then((data) => {

            console.log(data);

            temp.innerHTML = Math.floor(data.current.temp_c) + "&#176";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            console.log(date);
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = (date.substr(11));


            dateOutput.innerHTML = `${dayofTheWeek()} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time + " -";
            nameOutput.innerHTML = data.location.name;
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutputinnerHTML = data.current.humidity + " %";
            windOutput.innerHTML = data.current.wind_kph + "km/h";
            const iconInput = data.current.condition.icon;
            icon.src = iconInput;

            let timeofDay = "day";
            const code = data.current.condition.code;
            if (!data.current.is_day) {
                timeofDay = 'night';
            }
            
            if (code == 1000) {
                    app.style.backgroundImage = `url(./image/${timeofDay}/clear.jpg)`;
                    
                }

                else if (
                    code == 1003 ||
                    code == 1006 ||
                    code == 1009 ||
                    code == 1030 ||
                    code == 1069 ||
                    code == 1087 ||
                    code == 1035 ||
                    code == 1073 ||
                    code == 1076 ||
                    code == 1079 ||
                    code == 1082
                ) {
                    app.style.backgroundImage = `url(./image/${timeofDay}/cloud.jpg)`;
                    
                }

                else if (
                    code == 1063 ||
                    code == 1069 ||
                    code == 1072 ||
                    code == 1050 ||
                    code == 1053 ||
                    code == 1080 ||
                    code == 1083 ||
                    code == 1086 ||
                    code == 1089 ||
                    code == 1092 ||
                    code == 1095 ||
                    code == 1204 ||
                    code == 1207 ||
                    code == 1240 ||
                    code == 1243 ||
                    code == 1246 ||
                    code == 1249 ||
                    code == 1252 ||
                    code == 1273 ||
                    code == 1276
                ) {
                    app.style.backgroundImage = `url(./image/${timeofDay}/rain.jpg)`;
                    
                }
                else{
                    app.style.backgroundImage = `url(./image/${timeofDay}/snow.jpg)`;
                    console.log(timeofDay);
                }
        
           
          

            app.style.opacity = "1";



          }).catch(()=>{
            alert("City nor found, please try again");
        });

}
getLocation();
// fetchWeatherData()