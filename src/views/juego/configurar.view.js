import React,{Component}  from 'react';
import "../../assets/sass/App.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

class Jugar extends Component {

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
                                <input id="privado" name="check" type="radio" onClick={this.onClick}/>
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
                        <div className="card-body center-all d-flex flex-column">
                            <div className="cover center-all mb-20">
                                <FontAwesomeIcon icon={faPlus} color="#909296"/>
                            </div>
                            <div className="select">
                                <select name="slct" id="slct">
                                    <option selected disabled hidden>Música del juego</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Jugar;