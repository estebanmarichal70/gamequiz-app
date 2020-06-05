import React, { Component } from "react";
import "../../assets/sass/App.scss";
import Timer from "../../components/timer";

class Juegando extends Component {
  constructor(props) {
    super(props);
    this.state = {
      juego: null,
      preguntaActiva: null,
    };
  }
  componentWillMount() {
    this.setState({
      juego: this.props.location.state.juego,
      preguntaActiva: this.props.location.state.juego.Preguntas[0],
    });
    //console.log(this.props.location.state.juego);
  }

  render() {
    return (
      <div>
        <div className="d-flex jc-center contenedorR">
          <div className="card-jugando">
            <div className="card-header">¿Como se llama Zte Men?</div>
            <div className="card-body">
              <div className="d-flex media ai-center">
                <div className="cover mb-20 mr-20"></div>
                <div className="cover mb-20"></div>
              </div>
              <div>
                <div className="arriba mb-10">
                  <button className="rounded-button error mr-20">
                    A - Maria
                  </button>
                  <button className="rounded-button success">
                    B - Bonfrisco
                  </button>
                </div>
                <div className="mb-10">
                  <button className="rounded-button gold mr-20">
                    C - Roberta
                  </button>
                  <button className="rounded-button purple">
                    D - Gualberto
                  </button>
                </div>
                {/*<div>
                                    <button className="rounded-button success mr-20">Verdadero</button>
                                    <button className="rounded-button error">Falso</button>
                                </div>*/}
                <div className="d-flex jc-sb ai-center">
                  <Timer />
                  <button className="rounded-button-s">Siguiente</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Juegando;
