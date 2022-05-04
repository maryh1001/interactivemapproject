async function getFoursquare(coords) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3wLy0Kn+JWkmGuQO4Ax4+9hb3oUjV7NRatNK2pIq84pE=",
    },
  };
  console.log("before fetch...");
  fetch(
    `https://api.foursquare.com/v3/places/search`,
    // `https://api.foursquare.com/v3/places/search?query=coffee&ll=${coords[0]},${coords[1]}&limit=5`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log("res", response))
    .catch((err) => console.error(err));
  console.log("after fetch...");
}

async function getCoords() {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  console.log(pos);
  return [pos.coords.latitude, pos.coords.longitude];
}

window.onload = async () => {
  const coords = await getCoords();
  const map = L.map("map", { center: coords, zoom: 11 });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  const marker = L.marker(coords);
  marker.addTo(map).bindPopup("<p1><b>You are Here</b></p1>").openPopup();

  getFoursquare(coords);
};

// const options = {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     Authorization: "fsq3wLy0Kn+JWkmGuQO4Ax4+9hb3oUjV7NRatNK2pIq84pE=",
//   },
// };
// let limit = 5;
// let lat = myMap.coordinates[0];
// let lon = myMap.coordinates[1];
// let response = await fetch(
//   `https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`,
//   options
// );
// let data = await response.text();
// let parsedData = JSON.parse(data);
// let businesses = parsedData.results;
// return businesses;
