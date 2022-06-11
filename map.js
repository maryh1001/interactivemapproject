let globalMap;
let selection;
let userCoords;

async function getFoursquare(coords, userSelection) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3wLy0Kn+JWkmGuQO4Ax4+9hb3oUjV7NRatNK2pIq84pE=",
    },
  };
  
fetch(`https://api.foursquare.com/v3/places/search?query=${userSelection}&ll=${coords[0]},${coords[1]}&radius=5000&limit=5`, options)
.then(response => response.json())
.then(response => {
    console.log(response.results)
    response.results.forEach(function (element){
      console.log(element)
      const coordinates = [ element.geocodes.main.latitude, element.geocodes.main.longitude ];
      const businessMarker = L.marker(coordinates)
      businessMarker.addTo(globalMap)
    })
  })
  .catch(err => console.error(err));
  
}
let click = document.querySelector("#business");
click.addEventListener("change", function(event){
 selection = event.target.value
 getFoursquare(userCoords, selection)
})

async function getCoords() {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  console.log(pos);
  return [pos.coords.latitude, pos.coords.longitude];
}

window.onload = async () => {
  const coords = await getCoords();
  userCoords = coords
  const map = L.map("map", { center: coords, zoom: 11 });
  globalMap = map;
  console.log(coords)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  const marker = L.marker(coords);
  marker.addTo(map).bindPopup("<p1><b>You are Here</b></p1>").openPopup();

 

};

