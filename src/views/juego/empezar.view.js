import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "../../assets/sass/App.scss";
import "../../assets/empezar.scss";
import CustomModal from "../../components/modal.component"


class Empezar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen:false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen(){
        this.setState({...this.state, modalIsOpen:true});
    }
    handleClose(){
        this.setState({...this.state, modalIsOpen:false});
    }

    render() {
        return (
            <div>
                <div className="d-flex jc-center contenedorR">
                    <div className="card-pregunta mr-30">
                        <div className="card-body flex-column center-all">
                            <div className="datos-cont ">
                                <div className="imagen-juego">
                                    Va la imagen
                                </div>
                                <div>
                                <h3 className="subtitulo">El titulo</h3>
                                </div>
                                <div className="datos">
                                    <li>## | Jugados</li>   
                                    <li>## | Jugadores</li>
                                    <li>Privado/Publico</li>
                                </div>
                            </div>
                            <Link className="rounded-button link gold" to="/juego/jugar">
                                Jugar
                            </Link>
                            <Link className="link-blanco" onClick={this.handleOpen}>
                                Compartir
                            </Link>
                            <CustomModal onModalClose={this.handleClose} modalIsOpen={this.state.modalIsOpen}/>
                        </div>
                    </div>
                    <div className="card-preguntas">
                        <div className="card-body">
                            <div>
                                <h3 className="subtitulo">Preguntas (10)</h3>
                            </div>
                            <div className=" cont-preguntas scroll">
                                <div>
                                </div>
                                <div className="d-flex cont-pregunta m-10">
                                    <div className="card-body d-flex flex-row jc-sb w-100">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex jc-start h-20">
                                                1-Quiz
                                            </div>
                                            <div className="d-flex ai-center h-80">
                                                Pregunta del juego que pregunta algo para responder
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="imagen-juego">
                                            </div>
                                            20s
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex cont-pregunta m-10">
                                    <div className="card-body d-flex flex-row jc-sb w-100">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex jc-start h-20">
                                                1-Quiz
                                            </div>
                                            <div className="d-flex ai-center h-80">
                                                Pregunta del juego que pregunta algo para responder
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="imagen-juego">
                                            </div>
                                            20s
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex cont-pregunta m-10">
                                    <div className="card-body d-flex flex-row jc-sb w-100">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex jc-start h-20">
                                                1-Quiz
                                            </div>
                                            <div className="d-flex ai-center h-80">
                                                Pregunta del juego que pregunta algo para responder
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="imagen-juego">
                                            </div>
                                            20s
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex cont-pregunta m-10">
                                    <div className="card-body d-flex flex-row jc-sb w-100">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex jc-start h-20">
                                                1-Quiz
                                            </div>
                                            <div className="d-flex ai-center h-80">
                                                Pregunta del juego que pregunta algo para responder
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="imagen-juego">
                                            </div>
                                            20s
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Empezar;