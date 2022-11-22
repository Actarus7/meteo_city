const form = document.getElementById("entrerVilleForm")

form.addEventListener("submit", event => {
    event.preventDefault();
    //console.log(event);

    const userVille = document.getElementById("entrerVille");
    const userVilleText = userVille.value;
    console.log(userVilleText); 
    getWeatherInfos(userVilleText);
})

function getWeatherInfos(userVilleText) {
    const urlAPIGouv = `https://geo.api.gouv.fr/communes?nom=${userVilleText}&fields=centre`;
    fetch(urlAPIGouv)
    .then(function(data) {
        //console.log(data);
        return data.json();
    })
    .then(function(data){
        //console.log(data);
        return data;
    })
    .then(function(data){
        if (data[0].nom == userVilleText) {
            const userVilleInfos = {
                name : data[0].nom,
                lat : data[0].centre.coordinates[0],
                long : data[0].centre.coordinates[1],
            };
            //console.log(userVilleInfos)
            return userVilleInfos;
        }    
    })
    .then(function(userVilleInfos){
        const API_key = "316bfa59b3b302dc294f8e139f0d0fea";
        const urlOpenWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${userVilleInfos.lat}&lon=${userVilleInfos.long}&appid=${API_key}&units=metric`;
        fetch(urlOpenWeatherAPI)
        .then(function(data){
            return data.json();
        })
        .then(function(data){
            //console.log(data);
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
            //console.log(villeWeatherInfos);
            resultTest(villeWeatherInfos);
            return villeWeatherInfos;
        })
    })
}
function resultTest(villeWeatherInfos){
    console.log(villeWeatherInfos);
    
}