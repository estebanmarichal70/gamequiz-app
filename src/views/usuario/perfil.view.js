import React, {Component} from 'react';
import '../../assets/sass/App.scss';


import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import http from "../../api/gamequizServices";
import {toast} from "react-toastify";
import {timeago} from "../../utils";
import {logoutUser} from "../../redux/actions";
import {connect} from "react-redux";


class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        await http.services.fetchUserData()
            .then(res => {
                this.setState({user: res.data.data})
            })
            .catch(err => toast.error(err.toString()))
    }

    handleLogout = () => {
        this.props.logoutUser(this.props.history);
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

                        <div className="mb-20 w-100 d-flex center-all">
                            <button className="rounded-button gold link mr-10" onClick={this.handleLogout}>
                                Cerrar sesion
                                <FontAwesomeIcon icon={faSignOutAlt} color="#909296"/>
                            </button>
                            <Link to="/juego/crear" className="rounded-button gold link">Crear Juego</Link>
                        </div>
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
                                    {
                                        this.state.user ? this.state.user.Juegos.map((juego, index) => {
                                            return (
                                                <tr key={juego.Id}>
                                                    <td className="column1">{juego.Nombre}</td>
                                                    <td className="column2">{juego.Descripcion}</td>
                                                    <td className="column3">cambiar</td>
                                                    <td className="column4">{juego.Jugados}</td>
                                                    <td className="column5">{timeago(juego.Creado)}</td>
                                                    <td className="column6">
                                                        <Link className="link-gris" to="#"><FontAwesomeIcon
                                                            icon={faEdit}
                                                            color="#909296"/> {juego.Activo ? "Desactivar" : "Activar"}
                                                        </Link><br/>
                                                    </td>
                                                </tr>)
                                        }) : null
                                    }
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


export default withRouter(connect(null, {logoutUser})(Perfil));
