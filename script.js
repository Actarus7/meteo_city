const form = document.getElementById("entrerVilleForm")

form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(event);

    const userVille = document.getElementById("entrerVille");
    const userVilleText = userVille.value;
    console.log(userVilleText); 
    
})



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