import React,{Component}  from 'react';
import "../../assets/sass/App.scss";

import DragAndDropFileUploader from "../../components/image-uploader/image-uploader.componet";
import arrow from "./arrow.svg"

class Configurar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick(){
        let inputPass = document.getElementById("password")
        if (document.getElementById("publico").checked === true)
        inputPass.disabled = false;
        else{
            inputPass.disabled = true;
            inputPass.value = "";
        }
    }


    render() {
        return (
            <div>
                <div className="d-flex jc-center contenedorR">
                    <div className="card-summary mr-30">
                        <div className="card-header"><span>Configuración de Partida</span></div>
                        <div className="card-body d-flex flex-column">
                            <input className="rounded-input mb-10" type="text" placeholder="Título" name="titulo" autoFocus required/>
                            <textarea className="rounded-textarea mb-30" placeholder="Descripción" name="descripcion" maxLength="200"/>
                            <div className="checkbox mb-15">
                                <input id="privado" name="check" type="radio" onClick={this.onClick} defaultChecked/>
                                <label htmlFor="privado">Público</label>
                            </div>
                            <div className="checkbox mb-15">
                                <input id="publico" name="check" type="radio" onClick={this.onClick}/>
                                <label htmlFor="publico">Privado</label>
                            </div>
                            <input className="rounded-input" type="text" id="password" placeholder="Password" name="password" disabled/>
                        </div>
                    </div>
                    <div className="card-media">
                        <div className="card-header"><span>Configuración de Media</span></div>
                        <div className="card-body center-all flex-column">
                            <div className="cover center-all mb-20">
                                <DragAndDropFileUploader/>
                            </div>
                            <div className="select-box">
                                <div className="select-box__current" tabIndex="1">
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="1" name="Inp" checked readOnly/>
                                    <p className="select-box__input-text">1</p>
                                </div>
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="2" name="Inp" checked readOnly/>
                                    <p className="select-box__input-text">2</p>
                                </div>
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="3" name="Inp" checked readOnly/>
                                    <p className="select-box__input-text">3</p>
                                </div>
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="4" name="Inp" checked readOnly/>
                                    <p className="select-box__input-text">4</p>
                                </div>
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="5" name="Inp" checked readOnly/>
                                    <p className="select-box__input-text">5</p>
                                </div>
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="6" name="Inp" checked readOnly/>
                                    <p className="select-box__input-text">6</p>
                                </div>
                                <div className="select-box__value">
                                    <input className="select-box__input" type="radio" id="0" name="Inp" checked readOnly disabled/>
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
                            <button className="rounded-button success mt-20">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Configurar;