const form = document.getElementById("entrerVilleForm")
const arrUserVille = []

form.addEventListener("submit", event => {
    event.preventDefault();
    //console.log(event);

    const userVille = document.getElementById("entrerVille");
    const userVilleText = userVille.value;
    //console.log(userVilleText); 
    getLatLong(userVilleText)

})

function getLatLong (userVilleText) {
    const urlAPIGouv = `https://geo.api.gouv.fr/communes?nom=${userVilleText}&fields=centre`;
    fetch(urlAPIGouv)
    .then(function(data) {
        console.log(data);
        return data.json();
    })
    .then(function(data){
        console.log(data
            );
        return data;
    })
    .then(function(data){
        console.log(data[0].nom);
        if (data[0].nom == userVilleText) {
            const userVilleInfos = {
                name : data[0].nom,
                lat : data[0].centre.coordinates[0],
                long : data[0].centre.coordinates[1],
            };
            return userVilleInfos}    
    })
}

/* function getUserVille() {
    
    
}
const urlAPIGouv = `https://geo.api.gouv.fr/communes?nom=${userVille}&fields=code,nom,centre`




const urlAPIMeteo = `https://openweathermap.org/`
const key = "316bfa59b3b302dc294f8e139f0d0fea"
fetch(url)
.then(function() {

})
.catch(function() {

}); */