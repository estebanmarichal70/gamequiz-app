import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import { Link } from "react-router-dom";

class Perfil extends Component {
    render() {
        return (
            <div>
                <div className="d-flex center-all">
                    <h1 className="titulo-inicio">GameQuiz</h1>
                </div>
                <div className="d-flex">
                    <div className="d-flex flex-column info-perfil">
                        <p>Martin Aranda</p>
                        <p>MAranda1</p>
                        <p>Creados: 3</p>
                        <p>Jugadores: 150</p>
                    </div>
                    <div>
                        <table className="tabla-perfil">
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Pregunta</th>
                                <th>Jugadores</th>
                                <th>Creado</th>
                                <th>Acciones</th>
                            </tr>
                            <tr>
                                <td>Joe</td>
                                <td>Swanson</td>
                                <td>$300</td>
                                <td>$300</td>
                                <td>$300</td>
                                <td>$300</td>
                            </tr>
                            <tr>
                                <td>Cleveland</td>
                                <td>Brown</td>
                                <td>$250</td>
                                <td>$300</td>
                                <td>$300</td>
                                <td>$300</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default Perfil;