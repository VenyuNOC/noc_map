import React from 'react';
import styled from 'styled-components';

type Alert = {
    headline: string,
    affecting: string[],
    severity: "moderate" | "severe" | "extreme",
    expiration: string
}
type Props = {}
type State = {
    alerts: Alert[]
}

type AlertProps = { severity: "moderate" | "severe" | "extreme" }
const AlertRow = styled.div<AlertProps>`
    background: ${props => {
        if (props.severity === "severe") return "orange";
        if (props.severity === "extreme") return "red";
        return "aqua";
    }};

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 1rem;
    font-size: larger;
    align-items: center;

    & > div:not(:last-child) {
        margin-right: 1rem;
    }

    & #affected { 
        flex-basis: 12rem;
    }

    & #description {
        flex-basis: 16rem;
        flex-grow: 3;
    }
`

const AlertContainer = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 1440px;
    max-height: 480px;
    background: $454545;
`

export default class Alerts extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            alerts: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/v1/alerts")
            .then(response => response.json())
            .then((alerts: Alert[]) => {
                this.setState({
                    alerts: alerts
                })
            })
    }

    render() {
        var alerts = this.state.alerts.map((a) => {
            return (
                <AlertRow severity={a.severity} key={a.expiration}>
                    <div id="affected">
                        {a.affecting.join(', ')}
                    </div>
                    <div id="description">
                        {a.headline}
                    </div>
                    <div id="expires">
                        until {a.expiration}
                    </div>
                </AlertRow>
            );
        })
        return (
            <AlertContainer>
                {alerts}
            </AlertContainer>
        )
    }
}