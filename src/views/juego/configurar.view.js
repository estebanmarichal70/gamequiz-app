import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import DragAndDropFileUploader from "../../components/image-uploader/image-uploader.componet";
import {withRouter} from "react-router";
import arrow from "./arrow.svg";

import {agregarPreguntaTemporal, crearPregunta, crearRespuesta} from "../../redux/actions";
import {toast, ToastContainer} from "react-toastify";
import {DEFAULT_IMAGE_URL} from "../../constants/constants";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';

import gamequizServices from "../../api/gamequizServices";

class Configurar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preguntas: [],
            preguntaId: null,
            quiz: true,
            correcta: "",
            respuesta_a: "",
            respuesta_b: "",
            respuesta_c: "",
            respuesta_d: "",
            mensaje: "",
            puntos: "",
            tiempo: "",
            loading: false,
            tmpId: this.props.location.state
                ?
                this.props.location.state.tmpId
                :
                Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        };
    }

    onClickCorrecta = (event) => {
        switch (event.target.id) {
            case "A":
                this.setState({correcta: "A"})
                break;
            case "B":
                this.setState({correcta: "B"})
                break;
            case "C":
                this.setState({correcta: "C"})
                break;
            case "D":
                this.setState({correcta: "D"})
                break;
            default:
                this.setState({correcta: null})
                break;
        }
    }

    handleAgregarVideo = () => {
        this.props.agregarPreguntaTemporal(this.state);
        this.props.history.push({
            pathname: '/juego/youtube',
            state: {tmpId: this.state.tmpId}
        })
    }

    componentDidMount() {
        if (this.props.preguntas) {
            if (this.props.preguntas.list) {
                let question = this.props.preguntas.list.find(pregunta => pregunta.tmpId === this.state.tmpId);
                if (question) {
                    this.setState({...this.state, ...question});
                }
            }
        }
    }

    onClick = () => {
        document.getElementById("0").checked = true;
        if (document.getElementById("quiz").checked === true) {
            this.setState({quiz: true});
        } else {
            this.setState({quiz: false});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCrearPregunta = () => {
        if (this.state.mensaje !== "" && this.state.puntos !== "" && this.state.tiempo !== "" && this.state.correcta !== "") {
            const {mensaje, puntos, tiempo, quiz, tmpId, video} = this.state;
            let pregunta = {
                mensaje,
                puntos,
                tiempo,
                quiz,
                tmpId,
                video: video ? video.url : null,
                finVideo: video ? video.end : null,
                inicioVideo: video ? video.start : null,
                juegoId: this.props.juego.Id
            }
            if(!this.state.quiz){
                this.props.crearPregunta(pregunta);
            } else { 
                if (this.state.respuesta_a !== "" && this.state.respuesta_b !== "" && (this.state.quiz && this.state.respuesta_c !== "" && this.state.respuesta_d !== ""))
                    this.props.crearPregunta(pregunta);
                else
                    toast.error("Por favor, complete todas las respuestas.")
            }
        } else {
            toast.error("Por favor, complete todos los campos.")
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.success !== prevProps.success && this.props.success != null) {
            const pregunta = this.props.preguntas.list.find(pregunta => pregunta.tmpId === this.state.tmpId);
            if (pregunta !== null) {
                await this.setState({preguntaId: pregunta.Id})

                let respuestas_posibles = pregunta.Quiz ? ['a', 'b', 'c', 'd'] : ['a', 'b'];

                
                respuestas_posibles.forEach((el,index) => {
                    let respuesta = {
                        mensaje: pregunta.Quiz ? this.state[`respuesta_${el}`] : index === 0 ? "Verdadero" : "Falso",
                        correcta: this.state[`correcta`] === el.toUpperCase(),
                        preguntaId: pregunta.Id,
                        vecesSeleccionada: 0,
                        tmpId: pregunta.tmpId
                    }
                    this.props.crearRespuesta(respuesta);
                });
                document.getElementById("0").checked = true;
            }
        }
    }

    loadPreguntaActualizada = async () => {

        await gamequizServices.services.fetchPreguntaActualizada(this.state.preguntaId)
            .then(res => this.setState({preguntas: [...this.state.preguntas, res.data]}))
            .catch(err => toast.error("Error al crear la pregunta.: " + err.toString()))

        await this.resetState();
    }

    resetState = async () => {
        await this.setState({
            preguntaId: null,
            quiz: true,
            correcta: "",
            respuesta_a: "",
            respuesta_b: "",
            respuesta_c: "",
            respuesta_d: "",
            mensaje: "",
            puntos: "",
            tiempo: "",
            tmpId: this.props.location.state
                ?
                this.props.location.state.tmpId
                :
                Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        })
    }

    render() {
        return (
            <div className="d-flex flex-column contenedorR">
                <ToastContainer position="top-center"/>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                (<div style={{animation: `pop-in ${easings.easeOutExpo} 1000ms forwards`}}>
                   <div className="nombre-config d-flex jc-center mb-25">
                    <div className="texto">
                        {this.props.juego.Nombre}
                    </div>
                    </div>
                    <div className="crear-cont mb-40 d-flex jc-center">
                        <div className="card-pregunta mr-60">
                            <div className="card-header">
                                Tablero de preguntas
                            </div>
                            <div className="card-body d-flex flex-column center-all">
                                <div className="preguntas-cont scroll">
                                    {
                                        this.state.preguntas.map((pregunta, index) => {
                                            if (pregunta.Id) {
                                                return (
                                                    <div key={pregunta.Id} className="pregunta-cont center-all flex-column mb-5">
                                                        <div className="titulo">{pregunta.Mensaje}</div>
                                                        <div className="imagen mt-6">
                                                            <img alt="Miniatura de pregunta"
                                                                src={pregunta.Imagen != null ? pregunta.Imagen : DEFAULT_IMAGE_URL}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return (null)
                                        })
                                    }
                                    <div className="pregunta-cont mb-5">

                                    </div>
                                </div>
                                <button onClick={this.handleCrearPregunta} className="rounded-button success mt-16">
                                    Crear nueva pregunta
                                </button>
                            </div>
                        </div>
                        <div className="card-opciones-crear mr-60">
                            <div className="card-header">Opciones de pregunta</div>
                            <div className="card-body center-all flex-column">
                                <input className="rounded-small-input mt-15"
                                    type="text"
                                    placeholder="Escribe aqui tu pregunta"
                                    value={this.state.mensaje}
                                    name="mensaje"
                                    onChange={this.handleChange}
                                    maxLength="40"
                                />
                                <input className="rounded-small-input mt-15"
                                    type="number"
                                    name="tiempo"
                                    value={this.state.tiempo}
                                    onChange={this.handleChange}
                                    placeholder="Segundos para responder"
                                    min="10"
                                    max="80"
                                />

                                <input className="rounded-small-input mt-15"
                                    type="number"
                                    name="puntos"
                                    value={this.state.puntos}
                                    onChange={this.handleChange}
                                    placeholder="Puntaje de respuesta"
                                    min="1"
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
                                <div className="select-box respuesta-correcta-select w-100 mt-15">
                                    <div className="select-box__current" tabIndex="1">
                                        <div className="select-box__value">
                                            <input className="select-box__input" type="radio" id="A" name="Inp"
                                                readOnly/>
                                            <p className="select-box__input-text">{this.state.quiz ? "A" : "Verdadero"}</p>
                                        </div>
                                        <div className="select-box__value">
                                            <input className="select-box__input" type="radio" id="B" name="Inp"
                                                readOnly/>
                                            <p className="select-box__input-text">{this.state.quiz ? "B" : "Falso"}</p>
                                        </div>
                                        <div className="select-box__value"
                                            style={{display: !this.state.quiz ? "none" : null}}>
                                            <input className="select-box__input" type="radio" id="C" name="Inp"
                                                readOnly/>
                                            <p className="select-box__input-text">C</p>
                                        </div>
                                        <div className="select-box__value"
                                            style={{display: !this.state.quiz ? "none" : null}}>
                                            <input className="select-box__input" type="radio" id="D" name="Inp"
                                                readOnly/>
                                            <p className="select-box__input-text">D</p>
                                        </div>
                                        <div className="select-box__value">
                                            <input className="select-box__input" type="radio" id="0" name="Inp" defaultChecked
                                                readOnly disabled/>
                                            <p className="select-box__input-text">Respuesta correcta</p>
                                        </div>
                                        <img className="select-box__icon" src={arrow} alt="Arrow" aria-hidden="true"/>
                                    </div>
                                    <ul className="select-box__list scroll">
                                        <li>
                                            <label className="select-box__option" id="A" onClick={this.onClickCorrecta}
                                                htmlFor="A">
                                                {this.state.quiz ? "A" : "Verdadero"}
                                            </label>
                                        </li>
                                        <li>
                                            <label className="select-box__option" id="B" onClick={this.onClickCorrecta}
                                                htmlFor="B">
                                                {this.state.quiz ? "B" : "Falso"}
                                            </label>
                                        </li>
                                        <li style={{display: !this.state.quiz ? "none" : null}}><label
                                            className="select-box__option" id="C" onClick={this.onClickCorrecta}
                                            htmlFor="C">C</label></li>
                                        <li style={{display: !this.state.quiz ? "none" : null}}><label
                                            className="select-box__option" id="D" onClick={this.onClickCorrecta}
                                            htmlFor="D">D</label></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="main-card-crear">
                            <div className="card-body">
                                <div className="center-all mb-20 flex-column">
                                    <DragAndDropFileUploader tipo="PREGUNTA" afterSuccess={this.loadPreguntaActualizada}
                                                            tipoId={this.state.preguntaId}/>
                                    <div className="d-flex mt-10 w-90">
                                        <hr className="w-30 separador"/>
                                        <span className="titulo">o</span>
                                        <hr className="w-30 separador"/>
                                    </div>
                                    <button className="rounded-button link mt-5" onClick={this.handleAgregarVideo}>
                                        Agregar video
                                    </button>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="contenedorR arriba d-flex mb-10">

                                        <input className="rounded-input success-i mr-10" type="text"
                                            value={this.state.quiz ? this.state.respuesta_a : "Verdadero"}
                                            onChange={this.handleChange}
                                            placeholder="A - Respuesta"
                                            name="respuesta_a"
                                            maxLength="40"
                                            readOnly={this.state.quiz ? false : true}
                                            />


                                        <input className="rounded-input error-i" type="text"
                                            value={this.state.quiz ? this.state.respuesta_b : "Falso"}
                                            onChange={this.handleChange}
                                            placeholder="B - Respuesta"
                                            name="respuesta_b"
                                            maxLength="40"
                                            readOnly={this.state.quiz ? false : true}
                                            />
                                            
                                    </div>
                                    <div className="contenedorR d-flex" style={{display: !this.state.quiz ? "none" : null}}>

                                        <input className="rounded-input gold-i mr-10" type="text"
                                            value={this.state.respuesta_c}
                                            onChange={this.handleChange}
                                            placeholder="C - Respuesta"
                                            name="respuesta_c"
                                            maxLength="40"
                                            />
                                            

                                        <input className="rounded-input purple-i" type="text"
                                            value={this.state.respuesta_d}
                                            onChange={this.handleChange}
                                            placeholder="D - Respuesta"
                                            name="respuesta_d"
                                            maxLength="40"
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex jc-center">
                        <Link className="rounded-button success link center-all fin w-30"
                            to="/juego/empezar">Finalizar configuracion</Link>
                    </div> 
                </div>)}
                
            </div>
        );
    }
}

const mapStateToProps = ({juegoModule}) => {
    const {juego, preguntas, success} = juegoModule;
    return {juego, preguntas, success};
};

export default withRouter(connect(mapStateToProps, {
    crearPregunta,
    agregarPreguntaTemporal,
    crearRespuesta
})(Configurar));