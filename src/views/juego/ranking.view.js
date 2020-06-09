import React, {Component} from 'react';
import '../../assets/sass/ranking.scss';
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import {ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puntaje: null,
            juego: null,
            loading: false,
            puntajesPorJuegoId: [],
            nombre: null
        }
    }

    async componentDidMount() {
       await this.setState({
           puntaje: this.props.location.state.puntaje,
           juego: this.props.location.state.juego,
           nombre: this.props.location.state.nombre,
           puntajesPorJuegoId: this.props.location.state.puntajesPorJuegoId
        });
     }

    render() {
        return (
            <div className="center-all">
                <ToastContainer position="top-center"/>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                (<div className="d-flex jc-center flex-column center-all contenedorR" style={{animation: `pop-in ${easings.easeOutExpo} 1000ms forwards`}}>
                    <div className="card-ranking">
                        <div className="card-header">
                            {this.state.juego ? this.state.juego.Nombre : null}
                        </div>
                        <div className="card-body d-flex flex-column">
                            <strong className="titulo mb-2"><span className="subtitulo">Usuario:</span> {this.props.user ? this.props.user.Username : this.state.nombre}</strong>
                            <strong className="titulo mt-1"><span className="subtitulo">Puntaje Total:</span> {this.state.puntaje}</strong>
                            <hr className="barra mb-30"/>
                                <div className="table style">
                                    <div className="table-head">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th className="column1">Puesto</th>
                                                <th className="column2">Nombre</th>
                                                <th className="column3">Puntaje</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div className="table-body scroll">
                                    <table>
                                        <tbody>
                                        {this.state.puntajesPorJuegoId ? this.state.puntajesPorJuegoId.map((puntaje, index) => {
                                                if(index < 10) {
                                                    return (
                                                        <tr key={puntaje.Id}>
                                                            <td className="column1">{index + 1}</td>
                                                            <td className="column2">{puntaje.Username}</td>
                                                            <td className="column3">{puntaje.Puntos}</td>
                                                        </tr>
                                                    )
                                                }
                                                return (null)
                                            })
                                            :
                                            null
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                        </div>
                    </div>
                    <Link className="mt-20 rounded-button purple link" to="/juego/join"> Finalizar </Link>
                </div>)}
            </div>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
  };

export default withRouter(connect(mapStateToProps)(Ranking));