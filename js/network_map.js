var L = require('leaflet');

window.onload = () => {
    var noc_map = L.map('map').setView({lat: 31.3113, lon: -92.4451}, 6);

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    }).addTo(noc_map);

    L.control.scale().addTo(noc_map);

    L.marker({lat: 30.4515, lon: -91.1871}).bindPopup('BTR1 and BTR2').addTo(noc_map);
    L.marker({lat: 32.5252, lon: -93.7502}).bindPopup('SHV').addTo(noc_map);
}