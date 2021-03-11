import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'


const MapLayer = styled(MapContainer)`
    height: 100vh;
    width: 100vw;
    z-index: 0;
`

type Props = {
    appId: string;
}

export default class MapView extends React.Component<Props> {
    taskId: number = 0;

    private updateMap() {
        window.location.reload();
    }

    componentDidMount() {
        this.taskId = window.setInterval(this.updateMap.bind(this), 5 * 1000 * 60);
    }

    componentWillUnmount() {
        window.clearInterval(this.taskId);
    }

    render() {
        return (
            <MapLayer 
                center={[31.3113, -92.4451]} 
                zoom={8}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    subdomains="abcd"
                />
                <TileLayer
                    attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                    url={`http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${this.props.appId}`}
                    opacity={0.5}
                    maxZoom={19}
                />
                <TileLayer
                    attribution='Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
                    url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.props.appId}`}
                    opacity={1}
                    maxZoom={19}
                />
                <Marker position={[30.45167, -91.11642]} />
                <Marker position={[32.512915,-93.746901]} />
            </MapLayer>
        )
    }
}