import React,{Component}  from 'react';
import '../../assets/sass/App.scss';

class Correccion extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    
    render() {
        return (
            <div>
                <div className="contenedorR">
                    <div className="d-flex jc-center">
                        <div className="card-chart">
                            <div className="card-header tit">Pregunta 1</div>
                            <div className="card-body center-all flex-column">
                                <div>
                                    <span className="tit2">Puntos: 10</span><br/>
                                    <span className="tit2">Respuesta: D - Respuesta 4</span>
                                    <hr className="separador"/>
                                </div>
                                <div className="chart">
                                    <div className="bar-1 center-all titulo-c"><span>A - Respuesta 1 (1521)</span></div>
                                    <div className="bar-2 center-all titulo-c"><span>B - Respuesta 2 (498)</span></div>
                                    <div className="bar-3 center-all titulo-c"><span>C - Respuesta 3 (670)</span></div>
                                    <div className="bar-4 center-all titulo-c"><span>D - Respuesta 4 (1350)</span></div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="center-all mt-30 mb-20 sig">
                        <button className="rounded-button w-25">Siguiente</button>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Correccion;