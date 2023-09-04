mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: monument.geometry.coordinates,
    zoom: 10
  });

  map.on('style.load', function() {
  map.on('click', function(e) {
    let coordinates = e.lngLat;
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<b>Coordinates (Longitude, Latitude):</b><p>${coordinates}</p>`)
      .addTo(map);
  });
  map.addControl(new mapboxgl.NavigationControl());
});

const detailsMarker = new mapboxgl.Marker()
    .setLngLat(monument.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${monument.name}</h3><p>${monument.location}</p><p>${monument.description}</p>`

        )
    )
    .addTo(map);
;






