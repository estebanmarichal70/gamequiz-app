import React, {Component} from 'react';

import "../../assets/sass/App.scss";

import limbo from "../../assets/music/limbo.mp3";
import millonario from "../../assets/music/millonario.mp3";
import coffin from "../../assets/music/coffin.mp3";
import suspenso from "../../assets/music/suspenso.mp3";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeUp, faVolumeMute} from "@fortawesome/free-solid-svg-icons";

import DragAndDropFileUploader from "../../components/image-uploader/image-uploader.componet";
import arrow from "./arrow.svg"
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {crearJuego} from "../../redux/juego/actions";
import {toast, ToastContainer} from "react-toastify";
import ReactPlayer from "react-player";

class Configurar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            descripcion: "",
            privado: false,
            password: "",
            musica: null,
            muted: false
        };
    }

    onClick = () => {
        let inputPass = document.getElementById("password")
        if (document.getElementById("publico").checked === true) {
            this.setState({privado: true});
            inputPass.disabled = false;
        } else {
            this.setState({privado: false});
            inputPass.disabled = true;
            inputPass.value = "";
        }
    }

    onClickMusic = (event) => {
        switch(event.target.id){
            case "1":
                this.setState({musica: limbo});
                break;
            case "2":
                this.setState({musica: millonario});
                break;
            case "3":
                this.setState({musica: coffin});
                break;
            case "4":
                this.setState({musica: suspenso});
                break;
        }
    }

    onClickMute = (event) => {
        if(event.target.id === "mute"){
            this.setState({muted: true});
        }else{
            this.setState({muted: false});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        const {titulo, descripcion} = this.state;
        if (titulo !== "" && descripcion !== "") {
            let juego = {
                nombre: this.state.nombre,
                descripcion: this.state.descripcion,
                privado: this.state.privado,
                password: this.state.password,
                musica: this.state.musica,
                usuarioId: this.props.user.Id
            }

            this.props.crearJuego(juego, this.props.history)

        } else {
            toast.error("Por favor, complete todos los campos.");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.error !== null && this.props.error !== undefined && this.props.error !== "") {
            toast.error(this.props.error);
        }
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <div className="d-flex jc-center contenedorR">
                    <div className="card-summary mr-30">
                        <div className="card-header"><span>Configuración de Partida</span></div>
                        <div className="card-body d-flex flex-column">
                            <input className="rounded-input mb-10"
                                   type="text"
                                   placeholder="Título"
                                   value={this.state.nombre}
                                   onChange={this.handleChange}
                                   name="nombre"
                                   autoFocus
                                   required
                            />
                            <textarea className="rounded-textarea mb-30"
                                      placeholder="Descripción"
                                      name="descripcion"
                                      maxLength="200"
                                      value={this.state.descripcion}
                                      onChange={this.handleChange}
                            />
                            <div className="checkbox mb-15">
                                <input id="privado" name="check" type="radio" onClick={this.onClick} defaultChecked/>
                                <label htmlFor="privado">Público</label>
                            </div>
                            <div className="checkbox mb-15">
                                <input id="publico" name="check" type="radio" onClick={this.onClick}/>
                                <label htmlFor="publico">Privado</label>
                            </div>
                            <input className="rounded-input"
                                   type="text"
                                   id="password"
                                   placeholder="Password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   disabled/>
                        </div>
                    </div>
                    <div className="card-media">
                        <div className="card-header"><span>Configuración de Media</span></div>
                        <div className="card-body center-all flex-column">
                            <div className="cover center-all mb-20">
                                <DragAndDropFileUploader history={this.props.history} tipo="JUEGO"
                                                         tipoId={this.props.juego ? this.props.juego.Id : null}/>
                            </div>
                            <div className="select-box">
                                <div className="select-box__current" tabIndex="1">
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="1" name="sel" readOnly checked/>
                                        <p className="select-box__input-text">Daddy Yankee- Limbo</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="2" name="sel" readOnly checked/>
                                        <p className="select-box__input-text">Quien quiere ser millonario</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="3" name="sel" readOnly checked/>
                                        <p className="select-box__input-text">Coffin Dance</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="4" name="sel" readOnly checked/>
                                        <p className="select-box__input-text">Música de Suspenso</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" name="sel" readOnly checked/>
                                        <p className="select-box__input-text">Música del Juego</p>
                                    </div>
                                    <img className="select-box__icon" src={arrow} alt="Arrow" aria-hidden="true"/>
                                </div>
                                <ul className="select-box__list scroll">
                                    <li><label className="select-box__option" htmlFor="1" id="1" onClick={this.onClickMusic}>Daddy Yankee - Limbo</label></li>
                                    <li><label className="select-box__option" htmlFor="2" id="2" onClick={this.onClickMusic}>Quien quiere ser millonario</label></li>
                                    <li><label className="select-box__option" htmlFor="3" id="3" onClick={this.onClickMusic}>Coffin Dance</label></li>
                                    <li><label className="select-box__option" htmlFor="4" id="4" onClick={this.onClickMusic}>Música de Suspenso</label></li>
                                </ul>
                            </div>
                            {this.state.muted ? (
                                <FontAwesomeIcon className="iconVol mt-15" icon={faVolumeMute} color="#53575f" size="2x" id="unmute" onClick={this.onClickMute}/>
                            ) : (
                                <FontAwesomeIcon className="iconVol mt-15" icon={faVolumeUp} color="#53575f" size="2x" id="mute" onClick={this.onClickMute} />
                            )}
                            <ReactPlayer width="0" height="0" url={this.state.musica} muted={this.state.muted} loop={true} volume={0.1} playing={true} start={60}/>
                            <button className="rounded-button success mt-20" onClick={this.handleSubmit}>
                                Crear juego y configurar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({authUser, juegoModule}) => {
    const {user} = authUser;
    const {juego, error} = juegoModule;
    return {user, juego, error};
};

export default withRouter(connect(mapStateToProps, {crearJuego})(Configurar));
