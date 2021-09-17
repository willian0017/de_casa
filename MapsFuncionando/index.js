const successCallback = (position) => {
    console.log(position);
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    // console.log(latitude + ' ' + longitude);
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
}
const errorCallback = (error) => {
    console.error(error);
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

let latLng = { 
    lat: +localStorage.getItem("latitude"),
    lng: +localStorage.getItem("longitude")
 };

console.log(latLng)
let mapOptions = {
    center: latLng,
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

function calcRoute() {
    let request = {
        origin: latLng,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRICAL
    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML = "Estabelecimento: " + document.getElementById("to").value + ".<br /> Distância dirigindo <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Tempo estimado <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(latLng);
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não conseguimos calcular a distância da rota.</div>";
        }
    });
}

let options = {
    types: ['(cities)']
}

let input = document.getElementById("to");
let autocomplete = new google.maps.places.Autocomplete(input, options);
localStorage.clear()