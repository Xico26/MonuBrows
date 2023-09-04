mapboxgl.accessToken = mapToken;
const detailsMap = new mapboxgl.Map({
    container: 'detailsMap',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: monument.geometry.coordinates,
    zoom: 10
});

detailsMap.addControl(new mapboxgl.NavigationControl());

const detailsMarker = new mapboxgl.Marker()
    .setLngLat(monument.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${monument.name}</h3><p>${monument.city}, ${monument.country}</p><p>${monument.description}</p>`

        )
    )
    .addTo(detailsMap);
;


