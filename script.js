const form = document.getElementById("entrerVilleForm")
const buttonClick = document.getElementById("lancerRecherche")
form.addEventListener("submit", event => {
    event.preventDefault();
    const userVilleText = document.getElementById("entrerVille").value; 
    getWeatherInfos(userVilleText);
})

buttonClick.addEventListener("click", event => {
    event.preventDefault();
    const userVilleText = document.getElementById("entrerVille").value; 
    getWeatherInfos(userVilleText);
})


function getWeatherInfos(userVilleText) {
    const urlAPIGouv = `https://geo.api.gouv.fr/communes?nom=${userVilleText}&fields=centre`;
    fetch(urlAPIGouv)
    .then(function(promise) {
        return promise.json();
    })
    .then(function(data){
        return data;
    })
    .then(function(data){
        if (data[0].nom == userVilleText) {
            const userVilleInfos = {
                name : data[0].nom,
                lat : data[0].centre.coordinates[1],
                long : data[0].centre.coordinates[0],
            };
            return userVilleInfos;
        }    
    })
    .then(function(userVilleInfos){
        const API_key = "316bfa59b3b302dc294f8e139f0d0fea";
        const urlOpenWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${userVilleInfos.lat}&lon=${userVilleInfos.long}&appid=${API_key}&units=metric`;
        fetch(urlOpenWeatherAPI)
        .then(function(promise){
            return promise.json();
        })
        .then(function(data){
            return data;
        })
        .then(function(data){
            const villeWeatherInfos = {
                name : userVilleInfos.name,
                temperature : data.main.temp,
                temperature_min : data.main.temp_min,
                temperature_max : data.main.temp_max,
                temperature_ressentie : data.main.feels_like,
                wind_speed : data.wind.speed,
                wind_direction : data.wind.deg,
                humidity : data.main.humidity,
                weather : data.weather[0].icon,
            };
            affichage(villeWeatherInfos);
            return villeWeatherInfos;
        })
    })
}

function affichage(villeWeatherInfos) {
    document.getElementsByTagName("h2")[0].textContent = villeWeatherInfos.name;
    document.getElementById("temperature").textContent = `Température : ${villeWeatherInfos.temperature}°`;
    document.getElementById("tMin").textContent = `Température min : ${villeWeatherInfos.temperature_min}°`;
    document.getElementById("tMax").textContent = `Température max : ${villeWeatherInfos.temperature_max}°`;
    document.getElementById("tRessentie").textContent = `Température ressentie : ${villeWeatherInfos.temperature_ressentie}°`;
    document.getElementById("ventForce").textContent = `Force du vent : ${villeWeatherInfos.wind_speed} km/h`;
    document.getElementById("ventDir").textContent = `Direction du vent : ${villeWeatherInfos.wind_direction}°`;
    document.getElementById("humidite").textContent = `Humidité : ${villeWeatherInfos.humidity}%`;
    document.getElementsByTagName("img")[0].setAttribute("src", `http://openweathermap.org/img/wn/${villeWeatherInfos.weather}@2x.png`);
    document.getElementById("meteoVille").classList.remove('invisible');
}