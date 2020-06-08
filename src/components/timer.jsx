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
           if(seconds === 0) {
            this.props.finTimer();
           }
        }, 1000)
        
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }


    render() {
        const { seconds } = this.state
        return (
            <div className="timer center-all">
                <span>{seconds}</span>
            </div>
        )
    }
}