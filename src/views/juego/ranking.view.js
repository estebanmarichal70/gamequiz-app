import React, {Component} from 'react';
import '../../assets/sass/ranking.scss';
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import {toast,ToastContainer} from "react-toastify";

class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puntaje: null,
            loading: false
        }
    }

    componentWillMount() {
       this.setState({
        puntaje: this.props.location.state.puntaje
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
                            <strong className="titulo mb-2">Nombre Usuario</strong>
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
                                        <tr>
                                            <td className="column1">1</td>
                                            <td className="column2">Caste claramente</td>
                                            <td className="column3">1000</td>
                                        </tr>
                                        <tr>
                                            <td className="column1">2</td>
                                            <td className="column2">Isaac</td>
                                            <td className="column3">0</td>
                                        </tr>
                                        <tr>
                                            <td className="column1">3</td>
                                            <td className="column2">Tesla</td>
                                            <td className="column3">0</td>
                                        </tr>
                                        <tr>
                                            <td className="column1">4</td>
                                            <td className="column2">Estevi</td>
                                            <td className="column3">0</td>
                                        </tr>
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

export default Ranking;