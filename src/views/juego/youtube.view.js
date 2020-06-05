import React, {Component} from 'react';
import '../../assets/sass/App.scss';

import Video from "../../components/video-youtube.component"
import {connect} from "react-redux";
import {agregarVideo} from "../../redux/juego/actions";
import {ToastContainer, toast} from "react-toastify";
import {withRouter} from "react-router";


class YoutubeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValueUrl: "",
            minStart: "",
            secStart: "",
            minEnd: "",
            secEnd: "",
            showVideoPlayer: false,
            width: "",
            height: "",
            videoData: {}
        };
    }

    handleSizeVideo = async event => {
        let screenSize = window.innerWidth;
        if (screenSize < 577) {
            await this.setState({
                width: "270px",
                height: "170px"
            })
        } else {
            await this.setState({
                width: "500px",
                height: "300px"
            })
        }
    }

    handleChangeUrl = event => {
        this.setState({inputValueUrl: event.target.value})
    }

    handleChangeStartMin = event => {
        this.setState({minStart: event.target.value})
    }

    handleChangeStartSec = event => {
        this.setState({secStart: event.target.value})
    }

    handleChangeEndMin = event => {
        this.setState({minEnd: event.target.value})
    }

    handleChangeEndSec = event => {
        this.setState({secEnd: event.target.value})
    }

    removeData = () => {
        this.setState({
            inputValueUrl: "",
            minStart: "",
            secStart: "",
            minEnd: "",
            secEnd: "",
            showVideoPlayer: false,
            videoData: {}
        })
    }

    handleSubmit = async event => {
        await this.handleSizeVideo(event);

        const videoData = {
            url: this.state.inputValueUrl,
            start: parseInt(this.state.minStart) * 60 + parseInt(this.state.secStart),
            end: parseInt(this.state.minEnd) * 60 + parseInt(this.state.secEnd),
            width: this.state.width,
            height: this.state.height
        }

        if(isNaN(videoData.start)) {
            videoData.start = 0
        }
        if(isNaN(videoData.end)) {
            videoData.end = this.state.duration
        }

        await this.setState({
            videoData
        })

        await this.setState({
            showVideoPlayer: true
        })
    }

    handleAceptar = async () => {
        if(this.state.videoData.url != "" && this.state.videoData.url != undefined && this.state.videoData.start != null && this.state.videoData.end != null){
            await this.props.agregarVideo(this.state.videoData, this.props.location.state.tmpId);
            this.props.history.push({
                pathname: '/juego/configurar',
                state: { tmpId: this.props.location.state.tmpId }
            });
        }else{
            toast.error("Por favor, complete todos los datos.")
        }
    }

    handleDuration = (duration) => {
        this.setState({ duration })
    }

    render() {
        return (
            <div className="center-all">
                <ToastContainer/>
                <div className="d-flex jc-center contenedorR">
                    <div className="mr-30 card-youtube">
                        <div className="card-header"><span>Configuración de Video</span></div>
                        <div className="card-body center-all flex-column">
                            <input
                                onChange={this.handleChangeUrl}
                                className="rounded-input-youtube mb-10"
                                type="text"
                                placeholder="Link del Video"
                                value={this.state.inputValueUrl}
                            />
                            <p className="titulo">Start Video</p>
                            <div className="d-flex center-all time">
                                <input
                                    onChange={this.handleChangeStartMin}
                                    className="rounded-input-time mr-10 mb-10"
                                    type="number"
                                    min="0"
                                    placeholder="Minutos"
                                    value={this.state.minStart}
                                />
                                <input
                                    onChange={this.handleChangeStartSec}
                                    className="rounded-input-time mb-10"
                                    type="number"
                                    min="0"
                                    max="60"
                                    placeholder="Segundos"
                                    value={this.state.secStart}
                                />
                            </div>
                            <p className="titulo">End Video</p>
                            <div className="d-flex center-all time">
                                <input
                                    onChange={this.handleChangeEndMin}
                                    className="rounded-input-time mr-10 mb-10"
                                    type="number"
                                    min="0"
                                    placeholder="Minutos"
                                    value={this.state.minEnd}
                                />
                                <input
                                    onChange={this.handleChangeEndSec}
                                    className="rounded-input-time mb-10"
                                    type="number"
                                    min="0"
                                    max="60"
                                    placeholder="Segundos"
                                    value={this.state.secEnd}
                                />
                            </div>
                            <button className="rounded-button button-youtube gold w-40 mb-10 mt-15"
                                    onClick={this.handleSubmit}>
                                Cargar
                            </button>
                        </div>
                    </div>
                    <div className="card-youtube">
                        <div className="card-header"><span>Vista del Video</span></div>
                        <div className="card-body center-all d-flex flex-column">
                            <div className="video-wrapper card-video">
                                { this.state.showVideoPlayer && <Video handleDuration={this.handleDuration} videoData={this.state.videoData}/> }
                            </div>
                            <div className="d-flex">
                                <button onClick={this.handleAceptar} className="rounded-left-button gold">
                                    Aceptar
                                </button>
                                <button className="rounded-right-button gold" onClick={this.removeData}>
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, {agregarVideo})(YoutubeView));