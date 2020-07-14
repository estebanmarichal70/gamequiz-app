import React, {Component} from 'react';
import '../../assets/sass/App.scss';

import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheckCircle, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import {timeago} from "../../utils";
import {logoutUser} from "../../redux/actions";
import {connect} from "react-redux";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';

class Perfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async componentDidMount() {
        this.fetchData();
    }

    fetchData  = async () => {
        await http.services.fetchUserData()
            .then(res => {
                this.setState({user: res.data.data})
            })
            .catch(err => toast.error(err.toString()))
        this.setState({loading:false})
    }

    handleEmp = async(id) => {
        await this.setState({juegoId: id})
        this.handleEmpezar()
    }

    handleEmpezar = () => {
        this.props.history.push({
            pathname: '/juego/empezar',
            state: {juegoId: this.state.juegoId}
        })
    }

    handleLogout = () => {
        this.props.logoutUser(this.props.history);
    }

   handleClick = async(id) => {
        await http.services.cambiarEstado(id)
        .then(res => {
        })
        .catch(err =>toast.error(err.toString()))
        this.fetchData();
    }



    render() {
        return (
            <div className="center-all flex-column">
                <ToastContainer position="top-center"/>
                <div className="center-all">
                        <Link className="link" to="/"><h1 className="titulo-inicio">GameQuiz</h1></Link>
                </div>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                (<div className="d-flex jc-center contenedorR" style={{animation: `fade-in ${easings.easeOutExpo} 2000ms forwards`}}>
                    <div className="flex-izq mr-25">
                        <div className="card-perfil mb-20">
                            <div className="card-header"><span>Perfil</span></div>
                            <div className="card-body subtitulo">
                                <p>{this.state.user ? `Nombre: ${this.state.user.Nombre} ${this.state.user.Apellido}` : null}</p>
                                <p>{this.state.user ? `Usuario: ${this.state.user.Username}` : null}</p>
                                <p>{this.state.user && this.state.user.Juegos !== undefined ? `Creados: ${this.state.user.Juegos.length}` : `Creados: 0`}</p>
                            </div>
                        </div>

                        <div className="botones-perfil d-flex mb-20">
                            <button className="rounded-button purple mr-10" onClick={this.handleLogout}>
                                Cerrar Sesión
                            </button>
                            <Link to="/juego/crear" className="rounded-button purple link">Crear Juego</Link>
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
                                                    <td className="column3">{juego.Preguntas.length}</td>
                                                    <td className="column4">{juego.Jugados}</td>
                                                    <td className="column5">{timeago(juego.Creado)}</td>
                                                    <td className="column6">
                                                        <Link className="link-gris ml-5" to="#" onClick={ () => this.handleClick(juego.Id)}>
                                                            <FontAwesomeIcon
                                                            icon={juego.Activo ? faTimesCircle : faCheckCircle}
                                                            color="#909296"/>
                                                            {juego.Activo ? " Desactivar " : " Activar "}
                                                        </Link>
                                                        |
                                                        <Link className="link-gris ml-5" to="#" onClick={ () => this.handleEmp(juego.Id)}>
                                                            <FontAwesomeIcon
                                                            icon={faInfoCircle}
                                                            color="#909296"/>
                                                            &nbsp;Información
                                                        </Link>
                                                    </td>
                                                </tr>)
                                        }) : null
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }

}


export default withRouter(connect(null, {logoutUser})(Perfil));
