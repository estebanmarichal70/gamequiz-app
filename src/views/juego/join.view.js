import React,{Component}  from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";
import '../../assets/sass/App.scss';
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import ReactLoading from "react-loading";
import { AnimateOnChange } from 'react-animation'
import debounce from "lodash.debounce";

class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {
            juegos: null,
            buscar : "",
            buscarU : "",
            pass : "",
            loading: true
        };
       
    }

    async componentDidMount() {
        this.fetchData();
    }

    fetchData  = debounce(async (busqueda) => {
        await http.services.fetchJuegoData(busqueda)
            .then(res => {
                if(res.data.length){
                    this.setState({juegos: res.data})
                } else {
                    this.setState({juegos: null})
                }
            })
            .catch(err => toast.error(err.toString()))
            this.setState({loading: false})
    },200)

    fetchJuego  = async (Uuid) => {
        await http.services.fetchJuegoUuid(Uuid)
            .then(res => {
                this.setState({juegoU: res.data})
                
                document.getElementById("iniciar").disabled = false;
                if(res.data.Password !== ""){
                    document.getElementById("pass").disabled = false;
                }
                else{
                    document.getElementById("pass").disabled = true;
                    this.setState({pass:""});
                }
            })
            .catch(err => {
                toast.error("No se encontro el juego")
                document.getElementById("pass").disabled = true;
            })
    }

    handleSearch = async(event) => {
        await this.setState({buscar: event.target.value});
        this.fetchData(this.state.buscar);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleIniciar = (e) =>{
        e.preventDefault();
        if(this.state.pass === this.state.juegoU.Password){
            this.props.history.push({
                pathname: '/juego/inicio',
                state: {juego: this.state.juegoU}
            })
        }
        else{
            toast.error("Password incorrecto")
        }
    }

    handleJugar = (juego) => {
        this.props.history.push({
            pathname: '/juego/inicio',
            state: {juego}
        })
    }


    render() {
        return (
            <div className="center-all contenedorR">
                <ToastContainer position="top-center"/>
                <AnimateOnChange animationIn="bounceIn" animationOut="bounceOut" durationOut={2000}>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                    (<div className="center-all flex-column">
                        <div className="d-flex flex-column mb-20">
                            <div className="card-entrar">
                                <div className="card-header">Ingresar con Enlace</div>
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex mb-10">
                                        <input className="rounded-left-input" value={this.state.buscarU} onChange={this.onChange} name="buscarU" type="text" placeholder="Join Game (link)" autoFocus/>
                                        <button className="rounded-right-button purple" onClick={ ()=> this.fetchJuego(this.state.buscarU)} >
                                            <FontAwesomeIcon icon={faSearch} color="#909296"/>
                                        </button> 
                                    </div> 
                                    <input className="rounded-input" value={this.state.pass} onChange={this.onChange} id="pass" name="pass" type="password" placeholder="Password" disabled/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="card-grid">
                            <div className="card-body flex-column">
                                <div className="d-flex">
                                    <input className="rounded-left-input" value={this.state.buscar}  onChange={this.handleSearch} type="text" placeholder="Buscar"/>
                                    <button className="rounded-right-button purple">
                                        <FontAwesomeIcon icon={faSearch} color="#909296"/>
                                    </button>   
                                </div>
                                <div className={`${this.state.juegos ? "" : "center-all"} card-juegos d-flex scroll mt-20`}>
                                { this.state.juegos ? this.state.juegos.map((juego) => {
                                    return (
                                    < div key={juego.Id} onClick={ () => this.handleJugar(juego)} className="card-juego center-all flex-column">
                                        <div className="center-all mb-5">
                                            <FontAwesomeIcon icon={juego.Password ? faLock : faLockOpen} color="#d1d2d3"/>
                                        </div>
                                        <div className="imagen center-all">
                                            <img src={juego.Caratula} alt="Imagen"/>
                                        </div>
                                        <span className="titulo">{juego.Nombre}({juego.Preguntas.length})</span>
                                    </div>)
                                    }) : <span className="subtitulo">No hay resultados</span>
                                }
                                </div>
                            </div>
                            
                        </div>
                        <form onSubmit={this.handleIniciar}>
                            <button id="iniciar" className="rounded-button mt-10 gold fin" type="submit" disabled>
                                Iniciar
                            </button>
                        </form>
                    </div>)}
                </AnimateOnChange>
            </div>
        );
    }
}

export default Join;    