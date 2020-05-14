import React, { Component } from "react";
import BotonInicio from "../components/boton-Inicio.component";

class Inicio extends Component {
  render() {
    return (
      <div className="h-100 center-all-col">
        <h1 className="titulo-inicio">GameQuiz</h1>
        <BotonInicio ruta="/jugar" text="Jugar" />
        <BotonInicio ruta="/usuario/login" text="Crear Juego" />
      </div>
    );
  }
}

export default Inicio;
