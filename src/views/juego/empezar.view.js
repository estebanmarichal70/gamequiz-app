import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../../assets/sass/App.scss";
import CustomModal from "../../components/modal.component"
import http from "../../api/gamequizServices";
import {toast, ToastContainer} from "react-toastify";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic, faLock, faLockOpen, faDoorOpen, faDoorClosed} from "@fortawesome/free-solid-svg-icons";


class Empezar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            juego: null,
            loading: true,
            link: 'localhost:3000/juego/inicio?uuid='
        };
    }

    componentDidMount() {
        http.services.fetchJuegoIdData(this.props.location.state.juegoId)
        .then(res => {
            this.setState({juego: res.data})
            this.setState({loading: false})
        })
        .catch(err =>toast.error(err.toString()))
    }

    handleOpen = async () =>{
        let concat = this.state.link.concat(this.state.juego.Uuid)
        await this.setState({
            shareLink: concat
        })
        this.setState({modalIsOpen:true});
    }
    handleClose = () =>{
        this.setState({modalIsOpen:false});
    }

    musicSwitch(music){
        switch(music){
            case 0:
                return "Sin Música";
            case 1:
                return "Daddy Yankee - Limbo";
            case 2:
                return "Quien quiere ser millonario";
            case 3:
                return "Coffin Dance";
            case 4:
                return "Música de Suspenso";
            default:
                return null;
        }
    }

    handleClick = async() => {
        await http.services.cambiarEstado(this.state.juego.Id)
        .then(res => {})
        .catch(err =>toast.error(err.toString()))
    }

    render() {
        return (
            <div className="center-all">
                <ToastContainer position="top-center"/>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                (this.state.juego ? 
                    (<div className="d-flex center-all contenedorR" style={{animation: `pop-in ${easings.easeOutExpo} 1000ms forwards`}}>
                        <div className="card-datos mr-30">
                            <div className="card-body flex-column center-all">
                                <div className="center-all imagen-juego">
                                    <img src={this.state.juego.Caratula} alt="Imagen"/>
                                </div>
                                <div>
                                    <h3 className="subtitulo">{this.state.juego.Nombre}</h3>
                                </div>
                                <div className="datos mb-10">
                                    <li><FontAwesomeIcon icon={this.state.juego.Privado ? faDoorClosed : faDoorOpen} color="#d1d2d3"/> {this.state.juego.Privado ? "Partida Privada" : "Partida Pública"}</li>   
                                    <li><FontAwesomeIcon icon={this.state.juego.Password ? faLock : faLockOpen} color="#d1d2d3"/> {this.state.juego.Password !== "" ? "Con contraseña" : "Sin contraseña"}</li>
                                    <li><FontAwesomeIcon icon={faMusic} color="#d1d2d3"/> {this.musicSwitch(this.state.juego.Musica)}</li>
                                </div>
                                <Link className="rounded-button link purple mb-10" onClick={this.handleClick} to="/juego/join">
                                    Jugar
                                </Link>
                                <Link className="link-blanco" onClick={this.handleOpen} to="#">
                                    Compartir
                                </Link>
                                <CustomModal onModalClose={this.handleClose} LinkOrPassword="Link" juegoUUid={this.state.shareLink} modalIsOpen={this.state.modalIsOpen}/>
                            </div>
                        </div>
                        <div className="card-preguntas">
                            <div className="card-body">
                                <div>
                                    <h3 className="subtitulo">Preguntas ({this.state.juego.Preguntas.length})</h3>
                                </div>
                                {this.state.juego.Preguntas.length ? 
                                (<div className="cont-preguntas scroll">
                                    {
                                         this.state.juego.Preguntas.map((pregunta, index) => {
                                            return(<div className="d-flex cont-pregunta jc-sb mb-10" key={pregunta.Id}>
                                                <div className="d-flex flex-column">
                                                    <div className="d-flex">
                                                        <span className="subtitulo mb-4"><strong>{index+1} - {pregunta.Quiz ? "Quiz" : "Verdadero / Falso"}</strong></span>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span className="texto">{pregunta.Mensaje}</span> 
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column ">
                                                    <div className="imagen-juego center-all">
                                                        <img src={pregunta.Imagen} alt="Imagen"/>
                                                    </div>
                                                    <span className="subtitulo" style={{textAlign: "center"}}><strong>{pregunta.Tiempo}s</strong></span>
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>) :
                                (<div className="cont-preguntas vacio">
                                    <div className="cont-pregunta center-all">
                                        <span className="subtitulo"><strong>No hay preguntas</strong></span>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>) : null
                )} 
            </div>
        );
    }
}

export default Empezar;