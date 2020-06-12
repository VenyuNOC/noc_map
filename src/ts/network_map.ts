import * as L from 'leaflet';
import { IEndpoint } from "./models/endpoints/endpoints.types";
// import { ICircuit } from "./models/circuits/circuits.types";

function setupMap(noc_map: L.Map, latLon: L.LatLng, zoom: number) {
    noc_map.setView(
        latLon,
        zoom
    );

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    }).addTo(noc_map);

    L.control.scale().addTo(noc_map);
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
    var noc_map = L.map('map');

    setupMap(
        noc_map, 
        new L.LatLng(32.287133, -90.197754), 
        7
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
}