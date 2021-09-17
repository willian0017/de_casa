let latLng = { lat: -26.819839, lng: -49.272735 };
let mapOptions = {
    center: latLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

function calcRoute() {
    let request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem: google.maps.UnitSystem.METRICAL
    }
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>De: " + document.getElementById("from").value + ".<br />Para: " + document.getElementById("to").value + ".<br /> Distância dirigindo <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Tempo estimado <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
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

// Inputs de autocompletamento de lugares do Google
let input1 = document.getElementById("from");
let autocomplete1 = new google.maps.places.Autocomplete(input1, options);

let input2 = document.getElementById("to");
let autocomplete2 = new google.maps.places.Autocomplete(input2, options);


//----------------------------------------------------------------------------//
// function myPosition(positions) {
//     const successCallback = (position) => {
//         console.log(position);
//     }
//     const errorCallback = (error) => {
//         console.error(error);
//     }
//     navigator.geolocation.watchPosition(successCallback, errorCallback)
// }
