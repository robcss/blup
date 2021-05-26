const mapElement = document.getElementById("map")

const mapToken = mapElement.getAttribute("data-accessToken")

const geometry = JSON.parse(mapElement.getAttribute("data-geometry"))

mapboxgl.accessToken = mapToken

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: geometry.coordinates, // starting position [lng, lat]
    zoom: 15 // starting zoom
})

new mapboxgl.Marker()
    .setLngLat(geometry.coordinates)
    // .setPopup(
    //     new mapboxgl.Popup({ offset: 25 })
    //         .setHTML(
    //             `<h3>${campground.title}</h3><p>${campground.location}</p>`
    //         )
    // )
    .addTo(map)