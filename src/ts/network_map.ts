import * as L from 'leaflet';
import { IEndpoint } from "./models/endpoints/endpoints.types";
// import { ICircuit } from "./models/circuits/circuits.types";

const OWM = require('leaflet-openweathermap');

function setupMap(latLon: L.LatLng, zoom: number) {
    const appId = process.env.APPID;

    var baseMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    });
    var clouds = L.tileLayer(`http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${appId}`, {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        opacity: 0.7
    });
    var precip = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${appId}`, {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        opacity: .9
    });

    
    
    var noc_map = L.map('map', {center: latLon, zoom: zoom, layers: [baseMap]});
    var baseMaps = {"CartoDB Dark": baseMap};
    var overlayMaps = {"Clouds": clouds, "Precipitation": precip}

    clouds.addTo(noc_map);
    precip.addTo(noc_map);

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(noc_map);

    L.control.scale().addTo(noc_map);

    

    return noc_map;
}

function addEndpoints(noc_map: L.Map, endpoints: IEndpoint[]) {
    endpoints.forEach((endpoint) => {
        L.marker({
            lat: endpoint.lat, 
            lng: endpoint.lon,
        })
        .bindPopup(endpoint.label)
        .addTo(noc_map);
    })
}

window.onload = () => {
    var noc_map = setupMap(
        new L.LatLng(31.482293, -92.431661), 
        8
    );

    addEndpoints(
        noc_map, 
        [
            {
                lat: 30.45167,
                lon: -91.11642,
                label: "BTR DCs & NOC"
            },
            {
                lat: 32.512915,
                lon: -93.746901,
                label: "SHV DC & NOC"
            }
        ]
    )

    window.setInterval(() => {
        console.log('invalidating map');
        noc_map.invalidateSize();
    }, 5 * 60 * 1000);
}