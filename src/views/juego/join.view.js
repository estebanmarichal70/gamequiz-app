import React,{Component}  from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import '../../assets/sass/App.scss';
import "../../assets/empezar.scss";
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
            <div className="d-flex flex-column contenedorR">
                <ToastContainer position="top-center"/>
                <div className="d-flex flex-column card-join">
                    <div className="d-flex flex-column mb-20">
                        <div className="d-flex">
                            <input value={this.state.buscarU} onChange={this.onChange} name="buscarU" className="input-join" placeholder="Join Game (link)"/>
                            <button onClick={ ()=> this.fetchJuego(this.state.buscarU)} className="boton-buscar success">
                                <FontAwesomeIcon icon={faSearch}
                                                color="#909296"/>
                            </button> 
                        </div>
                        <div className="cont-pass jc-start">
                            <input className="rounded-input" value={this.state.pass} onChange={this.onChange} id="pass" name="pass" type="password" placeholder="Password" disabled/>
                        </div>
                    </div>
                    <div className="d-flex jc-start cont-filtro">
                        <input value={this.state.buscar}  onChange={this.handleSearch} className="input-buscar" type="text" 
                        placeholder="Buscar" autoFocus/>
                        <button className="boton-buscar success">
                            <FontAwesomeIcon icon={faSearch}
                                            color="#909296"/>
                        </button>   
                    </div>
                    <div className=" d-flex flex-row card-juegos scroll">
                    { this.state.juegos ? this.state.juegos.map((juego, index) => {
                        return (
                        <div key={juego.Id} onClick={ () => this.handleJugar(juego)} className="d-flex flex-column center-all card-juego">
                            <div className="imagen center-all">
                                <img src={juego.Caratula} alt="image"/>
                            </div>
                            <div className="center-all titulo">
                                <span>{juego.Nombre}({juego.Preguntas.length})</span>
                            </div>
                        </div>)
                        }) : null
                    }
                    </div>
                    <div className="d-flex center-all mt-10 cont-boton">
                        <form onSubmit={this.handleIniciar}>
                            <button id="iniciar" className="rounded-button link gold" type="submit" disabled>
                                Iniciar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Join;    