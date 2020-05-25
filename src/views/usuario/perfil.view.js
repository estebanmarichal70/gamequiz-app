import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import BotonInicio from "../../components/boton-Inicio.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import  {Link } from "react-router-dom";

class Perfil extends Component {
    render() {
        return (
            <div>
                <div className="center-all">
                    <h1 className="titulo-inicio">GameQuiz</h1>
                </div>
                <div className="d-flex jc-sb contenedor">
                    <div className="flex-izq flex-column">
                        <div className="card">
                            <div className="card-header h-25 center-all titulo"><span>Perfil</span></div>
                            <div className="card-body subtitulo">
                                <p>Martin Aranda</p>
                                <p>MAranda1</p>
                                <p>Creados: 3</p>
                                <p>Jugadores: 150</p>
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
                                                <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit} color="#909296"/> Editar</Link><br/>
                                                {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/ }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="column1">Futboliño</td>
                                            <td className="column2">Sopa do macaco</td>
                                            <td className="column3">33</td>
                                            <td className="column4">11</td>
                                            <td className="column5">23/05/2020</td>
                                            <td className="column6">
                                                <Link className="link-gris" to="#"><FontAwesomeIcon icon={faEdit} color="#909296"/> Editar</Link><br/>
                                                {/*<Link className="link-gris"><FontAwesomeIcon icon={faCheckCircle} color="#909296"/> Activar</Link>
                                                <Link className="link-gris"><FontAwesomeIcon icon={faTimesCircle} color="#909296"/> Desactivar</Link>*/ }
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

export default Perfil;