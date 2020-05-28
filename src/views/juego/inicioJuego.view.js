import React,{Component}  from 'react';
import "../../assets/sass/inicioJuego.scss";

class InicioJuego extends Component {
    render() {
        return(
            <div className="d-flex jc-center center-all contenedorR">
                <div className="d-flex flex-column card-inicio">
                    <div className="d-flex center-all contenedor-inicio">
                        <div className="card-info-juego mr-30">
                            <div className="card-header">
                                Info del Juego
                            </div>
                            <div className="card-body d-flex flex-column">
                                <input className="rounded-input mb-20" disabled type="text" value="NombreCreador"/>
                                <input className="rounded-input mb-20" disabled type="text"  value="NombreJuego"/>
                                <textarea className="rounded-textarea" disabled value="Descripcion"/>
                            </div>
                        </div>
                        <div className="card-imagen">
                            <img src="https://static.guiainfantil.com/pictures/jugar-y-aprender/33000/33008-adivinanzas-con-mi-cara-tan-cuadrada-lisa-o-con-dibujitos.jpg"/>
                        </div>
                    </div>
                    <div className="mt-30 center-all card-inicio-nombre">
                        <input className="rounded-left-input" type="text" placeholder="Nombre"/>
                        <button className="rounded-right-button gold">Jugar </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default InicioJuego;