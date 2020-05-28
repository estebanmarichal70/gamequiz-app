import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DragAndDropFileUploader from "../../components/image-uploader/image-uploader.componet";

class Crear extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: ''
        };

    }

    render() {
        return (
            <div>
                <div>
                    <div className="d-flex jc-center mt-25">
                        <input className="rounded-left-input" type="text" value={this.state.nombre}
                               onChange={event => this.setState({...this.state, nombre: event.target.value})}
                               placeholder="Nombre" autoFocus/>
                        <Link className="rounded-right-button gold link" to="/juego/configurar">
                            Configurar
                        </Link>
                    </div>
                </div>
                <div className="m-30 d-flex crear-cont flex-row jc-center">
                    <div className="card-pregunta mr-60">
                        <div className="card-header">
                            Tablero de preguntas
                        </div>
                        <div className="card-body d-flex flex-column center-all">
                            <div className="preguntas-cont scroll">
                                <div className="pregunta-cont mb-5">

                                </div>
                                <div className="pregunta-cont mb-5">

                                </div>
                                <div className="pregunta-cont mb-5">

                                </div>
                                <div className="pregunta-cont mb-5">

                                </div>
                            </div>
                            <button className="rounded-button gold mt-16 ">
                                Nuevo
                            </button>
                        </div>
                    </div>
                    <div className="card-opciones-crear mr-60">
                        <div className="card-header">Opciones de pregunta</div>
                        <div className="card-body d-flex flex-column jc-center">
                            <input className="rounded-small-input mt-15"
                                   type="text"
                                   placeholder="Escribe aqui tu pregunta"
                            />
                            <input className="rounded-small-input mt-15"
                                   type="number"
                                   placeholder="Segundos para responder"
                            />

                            <input className="rounded-small-input mt-15"
                                   type="number"
                                   placeholder="Puntaje de respuesta"
                            />

                            <div className="checkbox-small mt-15">
                                <input id="privado" name="check" type="radio" onClick={this.onClick}
                                       defaultChecked/>
                                <label htmlFor="privado">Quiz</label>
                            </div>
                            <div className="checkbox-small mt-15">
                                <input id="publico" name="check" type="radio" onClick={this.onClick}/>
                                <label htmlFor="publico">True/False</label>
                            </div>
                        </div>
                    </div>
                    <div className="main-card-crear">
                        <div className="card-body center-all d-flex flex-column">
                            <div className="cover card-upload-image center-all mb-20 d-flex flex-column">
                                <DragAndDropFileUploader/>
                                <div className="d-flex mt-10 flex-row w-90">
                                    <hr className="w-30 separador"/>
                                    <span className="texto">o</span>
                                    <hr className="w-30 separador"/>
                                </div>
                                <Link className="link texto mt-5" to="/juego/youtube">
                                    Agregar video
                                </Link>
                            </div>
                            <div className="d-flex flex-column w-100 card-bottom">
                                <div className="d-flex cont-respuestas">
                                    <input className="rounded-input left error" type="text"
                                           value={this.state.respuesta_a}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_a: event.target.value
                                           })}
                                           placeholder="A - Respuesta"/>
                                    <input className="rounded-input success" type="text" value={this.state.respuesta_b}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_b: event.target.value
                                           })}
                                           placeholder="B - Respuesta"/>
                                </div>
                                <div className="cont-respuestas">
                                    <input className="rounded-input left purple" type="text"
                                           value={this.state.respuesta_c}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_c: event.target.value
                                           })}
                                           placeholder="C - Respuesta"/>
                                    <input className="rounded-input gold" type="text" value={this.state.respuesta_d}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_d: event.target.value
                                           })}
                                           placeholder="D - Respuesta"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex jc-center">
                    <Link className="rounded-button success center-all w-30" to="/juego/empezar">
                        Finalizar
                    </Link>
                </div>
                
            </div>
        );
    }
}

export default Crear;