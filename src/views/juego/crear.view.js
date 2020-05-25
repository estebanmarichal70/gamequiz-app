import React, {Component} from 'react';

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
                        <button className="rounded-right-button" onClick={e => this.handleClick(e)} type="submit">
                            Configurar
                        </button>
                    </div>
                </div>
                <div className="m-50 d-flex contenedor">
                    <div className="card-pregunta">
                        <div className="card-header h-10">
                            Tablero de preguntas
                        </div>
                        <div className="card-body d-flex flex-column center-all">
                            <div className="scroll preguntas-cont">
                                <div className="pregunta-cont">

                                </div>
                                <div className="pregunta-cont">

                                </div>
                            </div>
                            <button className="rounded-button mt-16 " onClick={e => this.handleClick(e)} type="submit">
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