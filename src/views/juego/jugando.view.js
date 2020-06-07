import React, { Component } from "react";
import "../../assets/sass/App.scss";

import limbo from "../../assets/music/limbo.mp3";
import millonario from "../../assets/music/millonario.mp3";
import coffin from "../../assets/music/coffin.mp3";
import suspenso from "../../assets/music/suspenso.mp3";

import Timer from "../../components/timer";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import ReactPlayer from "react-player";

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
      puntaje: 0,
      height: null,
      width: null,
      musica: null
    };
  }

  async componentWillMount() {
    if(this.props.location.state.preguntaActiva != null){
        await this.setState({
          juego: this.props.location.state.juego,
          preguntaActiva: this.props.location.state.preguntaActiva,
        });
        if(this.props.location.state.puntaje != null){
          await this.setState({
            puntaje: this.props.location.state.puntaje
        });
      }
    }
    else{
      await this.setState({
        juego: this.props.location.state.juego,
        preguntaActiva:{
          pregunta: this.props.location.state.juego.Preguntas[0],
          index: 0
        } 
      });
    }
    this.handleMedia()
  }

  handleMedia = async() => {
    let screenSize = window.innerWidth;
    if (screenSize < 577) {
        await this.setState({
            width: 250,
            height: 150
        })
    } else {
        await this.setState({
            width: 400,
            height: 250
      })
    }
    switch (this.state.juego.Musica) {
      case 0:
          this.setState({musica: null});
          break;
      case 1:
          this.setState({musica: limbo});
          break;
      case 2:
          this.setState({musica: millonario});
          break;
      case 3:
          this.setState({musica: coffin});
          break;
      case 4:
          this.setState({musica: suspenso});
          break;
      default:
          this.setState({musica: null})
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
    if(this.state.respuestaSel !== "null"){
      await this.state.preguntaActiva.pregunta.Respuestas.forEach(respuesta => {
            if(respuesta.Mensaje === this.state.respuestaSel){
                http.services.aumentarSelRespuesta(respuesta.Id)
                .then(res => {
                    respuesta.VecesSeleccionada++;
                    this.handleSiguiente(this.state.respuestaSel);
                })
                .catch(err =>toast.error(err.toString()))
            }
      })
    }
    else
      this.handleSiguiente(this.state.respuestaSel);
  }

  render() {
    return (
      <div>
        <ToastContainer position="top-center"/>
        {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
        (<div className="d-flex jc-center contenedorR" style={{animation: `fade-in ${easings.easeOutExpo} 2000ms forwards`}}>
          <ReactPlayer height="0" width="0" url={this.state.musica} loop={true} volume={0.1} playing={true}/>
          <div className="card-jugando">
            <div className="card-header">{this.state.preguntaActiva.pregunta.Mensaje}</div>
            <div className="card-body">
              <div className="center-all mb-20 media">
                <div className="cover center-all m-10" style={{display: this.state.preguntaActiva.pregunta.Imagen ? null : "none"}}>
                    <img src={this.state.preguntaActiva.pregunta.Imagen} alt="Imagen"/>
                </div>
                <div className="cover center-all" style={{display: this.state.preguntaActiva.pregunta.Video ? null : "none"}}>
                    <ReactPlayer
                      url={this.state.preguntaActiva.pregunta.Video}
                      playing
                      width={this.state.width}
                      height={this.state.height}
                      config={{
                        youtube: {
                            playerVars: {
                                start: this.state.preguntaActiva.pregunta.InicioVideo,
                                end: this.state.preguntaActiva.pregunta.FinVideo
                            }
                        }
                      }}
                    />
                </div>
              </div>
              <div>
                  <div className="center-all arriba mb-10">
                    <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje} className="rounded-button success mr-20">
                      {this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje}
                    </button>
                    <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje} className="rounded-button error">
                      {this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje}
                    </button>
                  </div>
                  {this.state.preguntaActiva.pregunta.Quiz ?
                      <div className="center-all arriba mb-20">
                        <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[2].Mensaje} className="rounded-button gold mr-20">
                          {this.state.preguntaActiva.pregunta.Respuestas[2].Mensaje}
                        </button>
                        <button onClick={this.onClick} name={this.state.preguntaActiva.pregunta.Respuestas[3].Mensaje} className="rounded-button purple">
                          {this.state.preguntaActiva.pregunta.Respuestas[3].Mensaje}
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
        </div>)}
      </div>
    );
  }
}

export default Jugando;
