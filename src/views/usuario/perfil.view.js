import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import BotonInicio from "../../components/boton-Inicio.component";

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
                            <div className="card-header h-20 center-all titulo"><span>Perfil</span></div>
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
                                            <td className="column1">Like a butterfly</td>
                                            <td className="column2">Boxing</td>
                                            <td className="column3">9:00 AM - 11:00 AM</td>
                                            <td className="column4">Aaron Chapman</td>
                                            <td className="column5">10</td>
                                            <td className="column6">10</td>
                                        </tr>
                                        <tr>
                                            <td className="column1">Mind & Body</td>
                                            <td className="column2">Yoga</td>
                                            <td className="column3">8:00 AM - 9:00 AM</td>
                                            <td className="column4">Adam Stewart</td>
                                            <td className="column5">15</td>
                                            <td className="column6">10</td>
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