import React, { Component } from 'react'


export default class Timer extends Component {
    state = {
        seconds: this.props.time
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds} = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
           
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const {seconds } = this.state
        return (
            <div className="timer center-all">
                { seconds === 0
                    ? <span>Fin</span>
                    : <span>{seconds}</span>
                }
            </div>
        )
    }
}