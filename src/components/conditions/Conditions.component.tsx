import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from './arrow.svg';


type Props = {
    station: string;
    longName: string;
}
type State = {
    dewpoint: number;
    temperature: number;
    heatIndex: number;
    relativeHumidity: number;
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
    height: 120px;
    width: 480px;
    background: #454545;
    color: white;
    display: grid;
    place-items: center;
`

const HeaderText = styled.div`
    font-size: 4.8rem;
`

const ConditionsDetails = styled.div`
    height: 360px;
    width: 480px;
    background: rgba(69,69,69,0.8);
`

const Temperatures = styled.div`
    position: absolute;
    top: 140px;
    left: 166px;
    width: 69px;
    height: 136px;

    display: grid;
    place-items: center;

    background: #454545;
    color: white;
`

const Numbers = styled.div`
    position: absolute;
    top: 286px;
    left: 20px;

    display: grid;
    place-items: center;

    width: 215px;
    height: 174px;

    background: #454545;
`

const Wind = styled.div`
    position: absolute;
    top: 140px;
    left: 245px;

    width: 215px;
    height: 320px;

    color: white;
    background: #454545;
`

const WindSpeed = styled.div`
    text-align: center;
    height: 120px;
    & span {
        font-size: 2rem;
    }
`

type IndicatorProps = { angle: number };
const WindIndicator = styled.div<IndicatorProps>`
    transform: rotate(${props => 180 + props.angle }deg);
    margin-left: 20px;
    width: 10rem;
    height: 10rem;
`

const StyledArrow = styled(Arrow)`
    fill: white;
`

const ConditionsIcon = styled.div`
    width: 136;
    height: 136px;

    position: relative;
    top: 20px;
    left: 20px;
`

const Field = styled.div`
    display: grid;
    place-items: center;
    color: white;

    & span {
        font-size: 2rem;
    }
`

const TemperatureField = styled(Field)`
    & span::after {
        content: '\\00b0 F';
        font-size: 1rem;
    }
`
const PercentField = styled(Field)`
    & span::after {
        content: '%';
        font-size: 1rem;
    }
`

export default class Conditions extends React.Component<Props, State> {
    taskId = 0;

    constructor(props: Props) {
        super(props);
        this.state = {
            dewpoint: 0,
            temperature: 0,
            heatIndex: 0,
            relativeHumidity: 0,
            icon: "",
            windSpeed: 0,
            windDirection: 0
        }
    }

    componentDidMount() {
        console.log(`http://localhost:8000/api/v1/conditions/${this.props.station}`)
        fetch(`http://localhost:8000/api/v1/conditions/${this.props.station}`)
            .then(response => response.json())
            .then((j: State) => {
                this.setState(j);
            },
            (error) => {
                this.setState(this.state);
            });
    }

    render() {
        return (
            <ConditionsCard>
                <ConditionsHeader>
                    <HeaderText>{this.props.longName}</HeaderText>
                </ConditionsHeader>
                <ConditionsDetails>
                    <ConditionsIcon>
                        <img src={this.state.icon || "//unsplash.it/136/136"} alt="current conditions"/>
                    </ConditionsIcon>
                    <Temperatures>
                        <TemperatureField><span>{this.state.temperature.toFixed(0)}</span></TemperatureField>
                        <TemperatureField><span>{this.state.dewpoint.toFixed(0)}</span></TemperatureField>
                    </Temperatures>
                    <Numbers>
                        <PercentField>Humidity <span>{this.state.relativeHumidity.toFixed(0)}</span></PercentField>
                        {this.state.heatIndex !== 0 && <TemperatureField>Heat Index <span>{this.state.heatIndex.toFixed(0)}</span></TemperatureField>}
                    </Numbers>
                    <Wind>
                        <WindSpeed>Wind <span>{this.state.windSpeed.toFixed(0)}</span> mph<br/>at <span>{this.state.windDirection}&deg;</span></WindSpeed>
                        <WindIndicator angle={this.state.windDirection}>
                            <StyledArrow />
                        </WindIndicator>
                    </Wind>
                </ConditionsDetails>
            </ConditionsCard>
        );
    }
}