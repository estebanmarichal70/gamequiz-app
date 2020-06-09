import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import http from "../../api/gamequizServices";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {toast,ToastContainer} from "react-toastify";

class Correccion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            juego: null,
            nombre: null,
            preguntaActiva: null,
            respuestaSel: null,
            puntaje: null,
            puntajesPorJuegoId: [],
            graficaA: null,
            graficaB: null,
            graficaC: null,
            graficaD: null,
            loading: true
        }
    }

    async componentDidMount() {
        await this.setState({
          juego: this.props.location.state.juego,
          preguntaActiva: this.props.location.state.preguntaActiva,
          respuestaSel: this.props.location.state.respuestaSel,
          puntaje: this.props.location.state.puntaje,
          nombre: this.props.location.state.nombre
        })
        this.calcularGrafica();
    }

    calcularGrafica = async() =>{
        let total = 0;
        const respuestas = this.state.preguntaActiva.pregunta.Respuestas;

        await respuestas.forEach(respuesta => {
            total += respuesta.VecesSeleccionada;
        })

        if(total !== 0){
            let A, B, C, D = 0;

            A = parseInt(100 - ((respuestas[0].VecesSeleccionada * 100) / total));
            B = parseInt(100 - ((respuestas[1].VecesSeleccionada * 100) / total));
            A = (A === 0 ? 1 : A===100 ? 95 : A);
            B = (B === 0 ? 1 : B===100 ? 95 : B);
            this.setState({graficaA: A});
            this.setState({graficaB: B});

            if(this.state.preguntaActiva.pregunta.Quiz){
                C = parseInt(100 - ((respuestas[2].VecesSeleccionada * 100) / total));
                D = parseInt(100 - ((respuestas[3].VecesSeleccionada * 100) / total));
                C = (C === 0 ? 1 : C===100 ? 95 : C);
                D = (D === 0 ? 1 : D===100 ? 95 : D);
                this.setState({graficaC: C === 100 ? 1 : C===0 ? 95 : C});
                this.setState({graficaD: D === 100 ? 1 : D===0 ? 95 : D});
            }
        }

        await this.setState({loading: false})
    }

    handleSiguiente = async() => {
        await this.setState({
            loading: true
        })
        let index = this.state.preguntaActiva.index + 1;

        await this.state.preguntaActiva.pregunta.Respuestas.forEach((respuesta) => {
            if(respuesta.Correcta === true){
                if(respuesta.Mensaje === this.state.respuestaSel){
                        this.setState({
                            puntaje: this.state.puntaje + this.state.preguntaActiva.pregunta.Puntos
                        })
                }
            }
        })

        if(this.state.juego.Preguntas.length !== index){
            this.props.history.push({
                pathname: '/juego/jugando',
                state: {
                    preguntaActiva: {
                        index,
                        pregunta: this.state.juego.Preguntas[index]
                    },
                    juego: this.state.juego,
                    puntaje: this.state.puntaje,
                    nombre: this.state.nombre ? this.state.nombre : null
                }
            })
        }
        else{
            let nombreUser = ""
            if(this.props.user) {
                nombreUser = this.props.user.Username
            }
            else {
                nombreUser = this.state.nombre
            }
            await http.services.agregarPuntaje({
                username: nombreUser,
                juegoId: this.state.juego.Id,
                puntos: this.state.puntaje
            })
                .then()
                .catch(err =>toast.error(err.toString()))
            await http.services.fetchPuntaje(this.state.juego.Id)
                .then( res => {
                        this.setState({
                            puntajesPorJuegoId: res.data
                        })
                    }
                )
                .catch(err =>toast.error(err.toString()))
            this.props.history.push({
                pathname: '/juego/ranking',
                state: {
                    preguntaActiva: {
                        index,
                        pregunta: this.state.juego.Preguntas[index]
                    },
                    juego: this.state.juego,
                    puntaje: this.state.puntaje,
                    nombre: this.state.nombre ? this.state.nombre : null,
                    puntajesPorJuegoId: this.state.puntajesPorJuegoId ? this.state.puntajesPorJuegoId : null
                }
            })
        }
    }
    
    render() {
        return (
            <div className="center-all">
                <ToastContainer position="top-center"/>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                (<div className="contenedorR" style={{animation: `pop-in ${easings.easeOutExpo} 1000ms forwards`}}>
                    <div className="d-flex jc-center">
                        <div className="card-chart">
                            <div className="card-header tit">{this.state.preguntaActiva.pregunta.Mensaje}</div>
                            <div className="card-body center-all flex-column">
                                <div>
                                    {this.state.respuestaSel === "null" ?
                                        this.state.preguntaActiva.pregunta.Respuestas.map((respuesta, index) => {
                                            if(respuesta.Correcta === true){
                                                return(
                                                    <div key={respuesta.Id}>
                                                        <span className="tit2">Total de Puntos: {this.state.puntaje}</span><br/>
                                                        <span className="tit2">La respuesta correcta era: {respuesta.Mensaje}</span>
                                                    </div>
                                                )
                                            }
                                            return(null)
                                        })
                                        :
                                        this.state.preguntaActiva.pregunta.Respuestas.map((respuesta, index) => {
                                            if(respuesta.Correcta === true){
                                                if(respuesta.Mensaje === this.state.respuestaSel){
                                                    return(
                                                        <div key={respuesta.Id}>
                                                            <span className="tit2">Total de Puntos: {this.state.puntaje + this.state.preguntaActiva.pregunta.Puntos}</span><br/>
                                                            <span className="tit2">Respondiste correctamente!</span>
                                                        </div>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <div key={respuesta.Id}>
                                                            <span className="tit2">Total de Puntos: {this.state.puntaje}</span><br/>
                                                            <span className="tit2">La respuesta correcta era: {respuesta.Mensaje}</span>
                                                        </div>
                                                    )
                                                }
                                            }
                                            return(null)
                                        })
                                    }
                                    <hr className="separador"/>
                                </div>
                                {this.state.preguntaActiva.pregunta.Quiz ? 
                                <div className="chart">
                                    <div className="bar-1 center-all titulo-c" style={{gridRowStart: this.state.graficaA}}><span className="recorteTexto">{this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje}</span><span>({this.state.preguntaActiva.pregunta.Respuestas[0].VecesSeleccionada})</span></div>
                                    <div className="bar-2 center-all titulo-c" style={{gridRowStart: this.state.graficaB}}><span className="recorteTexto">{this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje}</span> <span>({this.state.preguntaActiva.pregunta.Respuestas[1].VecesSeleccionada})</span></div>
                                    <div className="bar-3 center-all titulo-c" style={{gridRowStart: this.state.graficaC}}><span className="recorteTexto">{this.state.preguntaActiva.pregunta.Respuestas[2].Mensaje}</span> <span>({this.state.preguntaActiva.pregunta.Respuestas[2].VecesSeleccionada})</span></div>
                                    <div className="bar-4 center-all titulo-c" style={{gridRowStart: this.state.graficaD}}><span className="recorteTexto">{this.state.preguntaActiva.pregunta.Respuestas[3].Mensaje}</span> <span>({this.state.preguntaActiva.pregunta.Respuestas[3].VecesSeleccionada})</span></div>
                                </div>
                                :
                                <div className="chart2">
                                    <div className="bar-1 center-all titulo-c" style={{gridRowStart: this.state.graficaA}}><span>{this.state.preguntaActiva.pregunta.Respuestas[0].Mensaje} ({this.state.preguntaActiva.pregunta.Respuestas[0].VecesSeleccionada})</span></div>
                                    <div className="bar-2 center-all titulo-c" style={{gridRowStart: this.state.graficaB}}><span>{this.state.preguntaActiva.pregunta.Respuestas[1].Mensaje} ({this.state.preguntaActiva.pregunta.Respuestas[1].VecesSeleccionada})</span></div>
                                </div>
                                }
                            </div>
                        </div>
                    </div> 
                    <div className="center-all mt-30 mb-20 sig">
                        <button onClick={this.handleSiguiente} className="rounded-button w-25">Siguiente</button>
                    </div>
                </div>)}
            </div>
            
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
  };
  
export default withRouter(connect(mapStateToProps)(Correccion));