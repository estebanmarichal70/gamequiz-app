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
            <div className="d-flex flex-column contenedorR">
                <div className="nombre-config d-flex jc-center mb-25">
                    <input className="rounded-left-input" type="text" value={this.state.nombre}
                            onChange={event => this.setState({...this.state, nombre: event.target.value})}
                            placeholder="Nombre" autoFocus/>
                    <Link className="rounded-right-button success link" to="/juego/configurar">Configurar</Link>   
                </div>
                <div className="crear-cont mb-40 d-flex jc-center">
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
                            <button className="rounded-button success mt-16 ">
                                Nuevo
                            </button>
                        </div>
                    </div>
                    <div className="card-opciones-crear mr-60">
                        <div className="card-header">Opciones de pregunta</div>
                        <div className="card-body center-all flex-column">
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
                                <input id="quiz" name="check" type="radio" onClick={this.onClick}
                                       defaultChecked/>
                                <label htmlFor="quiz">Quiz</label>
                            </div>
                            <div className="checkbox-small mt-15">
                                <input id="tf" name="check" type="radio" onClick={this.onClick}/>
                                <label htmlFor="tf">True/False</label>
                            </div>
                        </div>
                    </div>
                    <div className="main-card-crear">
                        <div className="card-body">
                            <div className="center-all mb-20 flex-column">
                                <DragAndDropFileUploader/>
                                <div className="d-flex mt-10 w-90">
                                    <hr className="w-30 separador"/>
                                    <span className="titulo">o</span>
                                    <hr className="w-30 separador"/>
                                </div>
                                <Link className="rounded-button link mt-5" to="/juego/youtube">
                                    Agregar video
                                </Link>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="contenedorR arriba d-flex mb-10">
                                    <input className="rounded-input error-i mr-10" type="text"
                                           value={this.state.respuesta_a}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_a: event.target.value
                                           })}
                                           placeholder="A - Respuesta"/>
                                    <input className="rounded-input success-i" type="text" value={this.state.respuesta_b}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_b: event.target.value
                                           })}
                                           placeholder="B - Respuesta"/>
                                </div>
                                <div className="contenedorR d-flex">
                                    <input className="rounded-input gold-i mr-10" type="text"
                                           value={this.state.respuesta_c}
                                           onChange={event => this.setState({
                                               ...this.state,
                                               respuesta_c: event.target.value
                                           })}
                                           placeholder="C - Respuesta"/>
                                    <input className="rounded-input purple-i" type="text" value={this.state.respuesta_d}
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
                    <button className="rounded-button success fin w-30">Finalizar</button>
                </div>
            </div>
        );
    }
}

export default Crear;