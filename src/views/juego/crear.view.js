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
                        <Link className="rounded-right-button link" to="/juego/configurar">
                            Configurar
                        </Link>
                    </div>
                </div>
                <div className="m-50 d-flex contenedorR flex-row jc-sa">
                    <div className="card-pregunta">
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
                            <button className="rounded-button mt-16 ">
                                Nuevo
                            </button>
                        </div>
                    </div>
                    <div className="card-media">
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
                            <div className="d-flex flex-column jc-sa w-100">
                                <div className="d-flex jc-se">
                                    <input className="rounded-input color" type="text" value={this.state.respuesta_a}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_a: event.target.value
                                           })}
                                           placeholder="A - Respuesta 1" autoFocus/>
                                    <input className="rounded-input" type="text" value={this.state.respuesta_b}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_b: event.target.value
                                           })}
                                           placeholder="B - Respuesta 2" autoFocus/>
                                </div>
                                <div className="d-flex jc-se mt-20">
                                    <input className="rounded-input" type="text" value={this.state.respuesta_c}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_c: event.target.value
                                           })}
                                           placeholder="C - Respuesta 3" autoFocus/>
                                    <input className="rounded-input" type="text" value={this.state.respuesta_d}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_d: event.target.value
                                           })}
                                           placeholder="D - Respuesta 4" autoFocus/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crear;