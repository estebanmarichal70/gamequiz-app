import React from "react";
import { Link } from "react-router-dom";
import "../assets/sass/App.scss";

const BotonInicio = (props) => {
  return (
    <Link className="link" to={props.ruta}>
      <div className="center-all boton-inicio">{props.text}</div>
    </Link>
  );
};
export default BotonInicio;
