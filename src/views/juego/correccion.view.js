import React,{Component}  from 'react';
import '../../assets/sass/App.scss';

class Correccion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            juego: null,
            preguntaActiva: null,
            respuestaSel: null,
            puntaje: null
        }
    }

    componentWillMount() {
         this.setState({
          juego: this.props.location.state.juego,
          preguntaActiva: this.props.location.state.preguntaActiva,
          respuestaSel: this.props.location.state.respuestaSel,
          puntaje: this.props.location.state.puntaje
        });
      }

    handleSiguiente = async() => {
        let index = this.state.preguntaActiva.index + 1;

        await this.state.preguntaActiva.pregunta.Respuestas.map((respuesta, index) => {
            if(respuesta.Correcta === true){
                if(respuesta.Mensaje === this.state.respuestaSel){
                        this.setState({
                            puntaje: this.state.puntaje + this.state.preguntaActiva.pregunta.Puntos
                        })
                }
            }
        })

        if(this.state.juego.Preguntas.length !== index){
            this.props.history.push({
                pathname: '/juego/jugando',
                state: {
                    preguntaActiva: {
                        index,
                        pregunta: this.state.juego.Preguntas[index]
                    },
                    juego: this.state.juego,
                    puntaje: this.state.puntaje
                }
            })
        }
        else{
            
            this.props.history.push({
                pathname: '/juego/ranking',
                state: {
                    preguntaActiva: {
                        index,
                        pregunta: this.state.juego.Preguntas[index]
                    },
                    juego: this.state.juego,
                    puntaje: this.state.puntaje
                }
            })
        }
    }
    
    render() {
        return (
            <div>
                <div className="contenedorR">
                    <div className="d-flex jc-center">
                        <div className="card-chart">
                            <div className="card-header tit">{this.state.preguntaActiva.pregunta.Mensaje}</div>
                            <div className="card-body center-all flex-column">
                                <div>
                                    {this.state.respuestaSel === "null" ?
                                        this.state.preguntaActiva.pregunta.Respuestas.map((respuesta, index) => {
                                            if(respuesta.Correcta === true){
                                                return(
                                                    <div key={respuesta.Id}>
                                                        <span className="tit2">Puntos: {this.state.puntaje}</span><br/>
                                                        <span className="tit2">Respuesta Correcta: {respuesta.Mensaje}</span>
                                                    </div>
                                                )
                                            }
                                            return(null)
                                        })
                                        :
                                        this.state.preguntaActiva.pregunta.Respuestas.map((respuesta, index) => {
                                            if(respuesta.Correcta === true){
                                                if(respuesta.Mensaje === this.state.respuestaSel){
                                                    return(
                                                        <div key={respuesta.Id}>
                                                            <span className="tit2">Puntos: {this.state.puntaje + this.state.preguntaActiva.pregunta.Puntos}</span><br/>
                                                            <span className="tit2">Respondiste correctamente</span>
                                                        </div>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <div key={respuesta.Id}>
                                                            <span className="tit2">Puntos: {this.state.puntaje}</span><br/>
                                                            <span className="tit2">Respuesta Correcta: {respuesta.Mensaje}</span>
                                                        </div>
                                                    )
                                                }
                                            }
                                            return(null)
                                        })
                                    }
                                    <hr className="separador"/>
                                </div>
                                {!this.state.preguntaActiva.Quiz ? 
                                <div className="chart">
                                    <div className="bar-1 center-all titulo-c"><span>A - {this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje} (1521)</span></div>
                                    <div className="bar-2 center-all titulo-c"><span>B - {this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje} (498)</span></div>
                                    <div className="bar-3 center-all titulo-c"><span>C - {this.state.preguntaActiva.pregunta.Respuestas[2].Mensaje} (670)</span></div>
                                    <div className="bar-4 center-all titulo-c"><span>D - {this.state.preguntaActiva.pregunta.Respuestas[3].Mensaje} (1350)</span></div>
                                </div>
                                :
                                <div className="chart">
                                    <div className="bar-1 center-all titulo-c"><span>A - {this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje} (1521)</span></div>
                                    <div className="bar-2 center-all titulo-c"><span>B - {this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje} (498)</span></div>
                                </div>
                                }
                            </div>
                        </div>
                    </div> 
                    <div className="center-all mt-30 mb-20 sig">
                        <button onClick={this.handleSiguiente} className="rounded-button w-25">Siguiente</button>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Correccion;