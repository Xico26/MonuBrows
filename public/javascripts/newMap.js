mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [12.493032, 41.896655],
    zoom: 3
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






