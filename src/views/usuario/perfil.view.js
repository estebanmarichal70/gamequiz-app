import React, {Component} from 'react';
import '../../assets/sass/App.scss';

import BotonInicio from "../../components/boton-Inicio.component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";

class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let user = this.props.user;
        this.setState({...this.state, user});
    }

    render() {
        return (
            <div>
                <div className="center-all">
                    <h1 className="titulo-inicio">GameQuiz</h1>
                </div>
                <div className="d-flex jc-center contenedorR">
                    <div className="flex-izq mr-25">
                        <div className="card-perfil mb-20">
                            <div className="card-header"><span>Perfil</span></div>
                            <div className="card-body subtitulo">
                                <p>{this.state.user ? `Nombre: ${this.state.user.Nombre} ${this.state.user.Apellido}` : null}</p>
                                <p>{this.state.user ? `Usuario: ${this.state.user.Username}` : null}</p>
                                <p>{this.state.user && this.state.user.Juegos !== undefined ? `Creados: ${this.state.user.Juegos.length}` : `Creados: 0`}</p>
                                
                            </div>
                        </div>
                        <BotonInicio ruta="/juego/crear" text="Crear Juego"/>
                    </div>
                    <div className="wrap-table">
                        <div className="table style">
                            <div className="table-head">
                                <table>
                                    <thead>
                                    <tr>
                                        <th className="hide">Lista de juegos</th>
                                        <th className="column1">Nombre</th>
                                        <th className="column2">Descripción</th>
                                        <th className="column3">Pregunta</th>
                                        <th className="column4">Jugados</th>
                                        <th className="column5">Creado</th>
                                        <th className="column6">Acciones</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="table-body scroll">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="column1">El juegazo</td>
                                        <td className="column2">Ni idea bro</td>
                                        <td className="column3">80</td>
                                        <td className="column4">55</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="column1">Futboliño</td>
                                        <td className="column2">Sopa do macaco</td>
                                        <td className="column3">33</td>
                                        <td className="column4">11</td>
                                        <td className="column5">23/05/2020</td>
                                        <td className="column6">
                                            <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit}
                                                                                                color="#909296"/> Editar</Link><br/>
                                            {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/}
                                        </td>
                                    </tr>
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps)(Perfil);
