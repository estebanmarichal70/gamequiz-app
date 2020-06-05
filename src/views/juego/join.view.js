import React,{Component}  from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import '../../assets/sass/App.scss';
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import debounce from "lodash.debounce";

class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buscar : "",
            buscarU : "",
            pass : ""
        };
    }

    async componentDidMount() {
        this.fetchData();
    }

    fetchData  = debounce(async (busqueda) => {
        await http.services.fetchJuegoData(busqueda)
            .then(res => {
                this.setState({juegos: res.data})
            })
            .catch(err => toast.error(err.toString()))
    },300)

    fetchJuego  = debounce(async (Uuid) => {
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
    },300)

    handleSearch = async(event) => {
        await this.setState({buscar: event.target.value});
        this.fetchData(this.state.buscar);
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }

    handleIniciar = (e) =>{
        e.preventDefault();
        if(this.state.pass === this.state.juegoU.Password){
            this.props.history.push({
                pathname: '/juego/jugando',
                state: {juego: this.state.juegoU}
            })
        }
        else{
            toast.error("Password incorrecto")
        }
    }


    render() {
        return (
            <div className="center-all contenedorR">
                <ToastContainer position="top-center"/>
                <div className="center-all flex-column">
                    <div className="d-flex flex-column mb-20">
                        <div className="card-entrar">
                            <div className="card-header">Ingresar con Enlace</div>
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex mb-10">
                                    <input className="rounded-left-input" value={this.state.buscarU} onChange={this.onChange} name="buscarU" type="text" placeholder="Join Game (link)" autoFocus/>
                                    <button className="rounded-right-button gold" onClick={ ()=> this.fetchJuego(this.state.buscarU)} >
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
                                <button className="rounded-right-button gold">
                                    <FontAwesomeIcon icon={faSearch} color="#909296"/>
                                </button>   
                            </div>
                            <div className="card-juegos d-flex scroll mt-20">
                            { this.state.juegos ? this.state.juegos.map((juego, index) => {
                                return (
                                <div key={juego.Id} className="card-juego center-all flex-column">
                                    <div className="imagen center-all">
                                        <img src={juego.Caratula} alt="Imagen"/>
                                    </div>
                                    <span className="titulo">{juego.Nombre}({juego.Preguntas.length})</span>
                                </div>)
                                }) : null
                            }
                            </div>
                        </div>
                        
                    </div>
                    <form onSubmit={this.handleIniciar}>
                        <button id="iniciar" className="rounded-button mt-10 gold fin" type="submit" disabled>
                            Iniciar
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Join;    