var L = require('leaflet');

function setupMap(noc_map, focus) {
    noc_map.setView({
        lat: focus.lat, 
        lon: focus.lon}, 
        focus.zoom);

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
    }).addTo(noc_map);

    L.control.scale().addTo(noc_map);
}

function addEndpoints(noc_map, endpoints) {
    endpoints.forEach((endpoint) => {
        L.marker({
            lat: endpoint.lat, 
            lon: endpoint.lon,
        })
        .bindPopup(endpoint.label)
        .addTo(noc_map);
    })
}

window.onload = () => {
    var noc_map = L.map('map');

    setupMap(noc_map, {
        lat: "32.287133",
        lon: "-90.197754",
        zoom: 7
    });

    addEndpoints(noc_map, 
        [
            {
                "lat": "30.45167",
                "lon": "-91.11642",
                "label": "BTR DCs & NOC"
            },
            {
                "lat": "32.512915",
                "lon": "-93.746901",
                "label": "SHV DC & NOC"
            }
        ]
    )
}