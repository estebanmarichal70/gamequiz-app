import React, { Component } from "react";
import BotonInicio from "../components/boton-Inicio.component";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {connect} from "react-redux";


class Inicio extends Component {
  render() {
    return (
      <div className="h-100 center-all flex-column">
        <Link className="link" to="/"><h1 className="titulo-inicio">GameQuiz</h1></Link>
        <BotonInicio ruta="/juego/join" text="Jugar" />
        <BotonInicio ruta= {this.props.user ? "/usuario/perfil" : "/usuario/login"} text="Crear Juego" />
      </div>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  const {user} = authUser;
  return {user};
};

export default withRouter(connect(mapStateToProps)(Inicio));
