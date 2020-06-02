import React, {Component} from 'react';
import "../../assets/sass/App.scss";

import DragAndDropFileUploader from "../../components/image-uploader/image-uploader.componet";
import arrow from "./arrow.svg"
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {crearJuego} from "../../redux/juego/actions";
import {toast, ToastContainer} from "react-toastify";

class Configurar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            descripcion: "",
            privado: false,
            password: "",
            musica: 1
        };
    }

    onClick = () => {
        let inputPass = document.getElementById("password")
        if (document.getElementById("publico").checked === true) {
            this.setState({privado: true});
            inputPass.disabled = false;
        } else {
            inputPass.disabled = true;
            inputPass.value = "";
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        const {titulo, descripcion} = this.state;
        if (titulo != "" && descripcion != "") {
            let juego = {
                ...this.state,
                usuarioId: this.props.user.Id
            }

            this.props.crearJuego(juego, this.props.history)

        } else {
            toast.error("Por favor, complete todos los campos.");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.error != null && this.props.error != undefined && this.props.error != "") {
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
                                        <input className="select-box__input" type="radio" id="1" name="Inp" checked
                                               readOnly/>
                                        <p className="select-box__input-text">1</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="2" name="Inp" checked
                                               readOnly/>
                                        <p className="select-box__input-text">2</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="3" name="Inp" checked
                                               readOnly/>
                                        <p className="select-box__input-text">3</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="4" name="Inp" checked
                                               readOnly/>
                                        <p className="select-box__input-text">4</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="5" name="Inp" checked
                                               readOnly/>
                                        <p className="select-box__input-text">5</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="6" name="Inp" checked
                                               readOnly/>
                                        <p className="select-box__input-text">6</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input className="select-box__input" type="radio" id="0" name="Inp" checked
                                               readOnly disabled/>
                                        <p className="select-box__input-text">Música del juego</p>
                                    </div>
                                    <img className="select-box__icon" src={arrow} alt="Arrow" aria-hidden="true"/>
                                </div>
                                <ul className="select-box__list scroll">
                                    <li><label className="select-box__option" htmlFor="1">1</label></li>
                                    <li><label className="select-box__option" htmlFor="2">2</label></li>
                                    <li><label className="select-box__option" htmlFor="3">3</label></li>
                                    <li><label className="select-box__option" htmlFor="4">4</label></li>
                                    <li><label className="select-box__option" htmlFor="5">5</label></li>
                                    <li><label className="select-box__option" htmlFor="6">6</label></li>
                                </ul>
                            </div>
                            <button className="rounded-button success mt-20" onClick={this.handleSubmit}>Crear juego y
                                configurar
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
