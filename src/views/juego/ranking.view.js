import React, {Component} from 'react';
import '../../assets/sass/ranking.scss';
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import {toast,ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puntaje: null,
            juego: null,
            loading: false,
            nombre: null
        }
    }

    async componentDidMount() {
       await this.setState({
           puntaje: this.props.location.state.puntaje,
           juego: this.props.location.state.juego,
           nombre: this.props.location.state.nombre
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
                            Animal Quiz
                        </div>
                        <div className="card-body d-flex flex-column">
                            <strong className="titulo mb-2">{this.props.user ? this.props.user : this.state.nombre}</strong>
                            <strong className="titulo mt-1">Puntaje: {this.state.puntaje}</strong>
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
                                        {this.state.juego ? this.state.juego.Puntajes.map((puntaje, index) => {
                                                if(index < 10){
                                                    return(
                                                        <tr key={puntaje.Id}>
                                                            <td className="column1">1</td>
                                                            <td className="column2">{puntaje.Usuario.Nombre}</td>
                                                            <td className="column3">{puntaje.Puntaje.Puntos}</td>
                                                        </tr>
                                                    )
                                                }
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
                    <button className="mt-20 rounded-button purple"> Finalizar </button>
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