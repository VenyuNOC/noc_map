import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from './arrow.svg';


type Props = {
    station: string;
    longName: string;
    top: string;
    left: string;
}
type State = {
    low: number;
    high: number;
    heatIndex: number;
    humidity: number;
    icon: string;
    windSpeed: number;
    windDirection: number;
}

const ConditionsCard = styled.div`
    height: 480px;
    width: 480px;
    position: fixed;
`

const ConditionsHeader = styled.div`
    height: 116px;
    width: 476px;
    background: #b0d89a;
    border: 2px black solid;
    display: grid;
    place-items: center;
`

const HeaderText = styled.div`
    font-size: 5rem;
`

const ConditionsDetails = styled.div`
    height: 360px;
    width: 480px;
    background: rgba(69,69,69,0.8);
`

const NumericContainer = styled.div`
    grid-area: numbers;

    display: grid;
    grid-template-areas:
        "hi low"
        "heat humid"
        "speed direction";
    
    text-align: center;

    & span {
        font-size: 1.9rem;
    }

    & > div {
        display: grid;
        place-items: center;
        margin: 0;
        width: 120px;
        height: 50px;
    }

    position: relative;
    top: 30px;
    left: 30px;
    height: 150px;
    width: 240px;
`

const HighTemp = styled.div`
    grid-area: hi;
    background: #d8ab9a;
`

const LowTemp = styled.div`
    grid-area: low;
    background: #9accd8;
`

const HeatIndex = styled.div`
    grid-area: heat;
    background: #d8c39a;
`

const Humidity = styled.div`
    grid-area: humid;
    background: #d8d79a;
`

const WindSpeed = styled.div`
    grid-area: speed;
    background: #b0d89a;
`

const WindDirection = styled.div`
    grid-area: direction;
    background: #b0d89a;
`

type IndicatorProps = { angle: number };
const WindIndicator = styled.div<IndicatorProps>`
    transform: rotate(${props => props.angle}deg);
    width: 1.5vw;
    height: 1.5vh;
`

const ConditionsIcon = styled.div`
    position: absolute;
    top:  150px;
    left: 300px;
    width: 150px;
    height: 150px;
    background: #d8bf9a;
`

const AlertPanel = styled.div`
    position: absolute;
    top: 330px;
    left: 30px;
    width: 420px;
    height: 120px;
    background: #f33b57;
`

export default class Conditions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            low: 0,
            high: 0,
            heatIndex: 0,
            humidity: 0,
            icon: "",
            windSpeed: 0,
            windDirection: 0
        }
    }

    render() {
        return (
            <ConditionsCard style={{top: this.props.top, left: this.props.left, zIndex: 100}}>
                <ConditionsHeader>
                    <HeaderText>{this.props.longName}</HeaderText>
                </ConditionsHeader>
                <ConditionsDetails>
                    <NumericContainer>
                        <HighTemp>Hi<span>{this.state.high}&deg;F</span></HighTemp>
                        <LowTemp>Lo<span>{this.state.low}&deg;F</span></LowTemp>
                        <HeatIndex>Heat index<span>{this.state.heatIndex}&deg;F</span></HeatIndex>
                        <Humidity>Humidity<span>{this.state.heatIndex}%</span></Humidity>
                        <WindSpeed>Wind<span>{this.state.heatIndex}mph</span></WindSpeed>
                        <WindDirection>
                            <WindIndicator angle={this.state.windDirection}>
                                <Arrow />
                            </WindIndicator>
                        </WindDirection>
                    </NumericContainer>
                    <ConditionsIcon>
                        <img src="//unsplash.it/150/150" alt="current conditions"/>
                    </ConditionsIcon>
                    <AlertPanel></AlertPanel>
                </ConditionsDetails>
            </ConditionsCard>
        );
    }
}