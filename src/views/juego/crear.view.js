import React, {Component} from 'react';
import {Link} from "react-router-dom";

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
                <div className="m-50 d-flex contenedorR">
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
                            </div>
                            <button className="rounded-button mt-16 ">
                                Nuevo
                            </button>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Crear;