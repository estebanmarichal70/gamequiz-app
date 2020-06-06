import React, { Component } from "react";
import "../../assets/sass/App.scss";
import Timer from "../../components/timer";

class Jugando extends Component {
  constructor(props) {
    super(props);
    this.state = {
      juego: null,
      preguntaActiva: {
        pregunta: null,
        index: null
      },
      respuestaSel: null,
      puntaje: 0
    };
  }

  componentWillMount() {
      if(this.props.location.state.preguntaActiva != null){
        this.setState({
          juego: this.props.location.state.juego,
          preguntaActiva: this.props.location.state.preguntaActiva,
        });
        if(this.props.location.state.puntaje != null){
          this.setState({
            puntaje: this.props.location.state.puntaje
        });
      }
    }
    else{
      this.setState({
        juego: this.props.location.state.juego,
        preguntaActiva:{
          pregunta: this.props.location.state.juego.Preguntas[0],
          index: 0
        } 
      });
    }
  }

  handleSiguiente =(respuestaSel) => {
      this.props.history.push({
          pathname: '/juego/correccion',
          state: {
            preguntaActiva: this.state.preguntaActiva,
            juego: this.state.juego,
            respuestaSel: respuestaSel,
            puntaje: this.state.puntaje
          }
      })
  }

  onClick = async (e) => {
    e.preventDefault();
    await this.setState({respuestaSel: e.target.name});
    this.handleSiguiente(this.state.respuestaSel);
}

  render() {
    return (
      <div>
        <div className="d-flex jc-center contenedorR">
          <div className="card-jugando">
            <div className="card-header">{this.state.preguntaActiva.pregunta.Mensaje}</div>
            <div className="card-body">
              <div className="d-flex media ai-center">
                <div className="cover mb-20 mr-20"></div>
                <div className="cover mb-20"></div>
              </div>
              <div>
                <div className="arriba mb-10">
                  <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje} className="rounded-button error mr-20">
                    A - {this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje}
                  </button>
                  <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje} className="rounded-button success">
                    B - {this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje}
                  </button>
                </div>
                {!this.state.preguntaActiva.Quiz ?
                    <div className="mb-10">
                      <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[2].Mensaje} className="rounded-button gold mr-20">
                        C - {this.state.preguntaActiva.pregunta.Respuestas[2].Mensaje}
                      </button>
                      <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[3].Mensaje} className="rounded-button purple">
                        D - {this.state.preguntaActiva.pregunta.Respuestas[3].Mensaje}
                      </button>
                    </div>
                   :
                   null
                }
                <div className="d-flex jc-sb ai-center">
                  <Timer time={this.state.preguntaActiva.pregunta.Tiempo}/>
                  <button name="null" onClick={this.onClick} className="rounded-button-s">Siguiente</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jugando;
