import React,{Component}  from 'react';
import "../../assets/sass/App.scss";
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';

class InicioJuego extends Component {

    constructor(props) {
        super(props);
        this.state = {
          juego: null,
          loading: true,
          nombre:"",
          logeado: true
        };
      }

    componentDidMount(){
        if(this.props.user){
            this.setState({
                logeado: false
            })
        }
        this.setState({
            juego: this.props.location.state.juego,
        });
        this.fetchCreadorData(this.props.location.state.juego.UsuarioId);
    }

    fetchCreadorData  = async (userId) => {
        await http.services.fetchCreadorData(userId)
            .then(res => {
                this.setState({user: res.data})
            })
            .catch(err => toast.error(err.toString()))
        this.setState({loading: false});
    }

    handleJugar = (e) =>{
        e.preventDefault();
        if(this.state.juego.Preguntas && this.state.juego.Preguntas.length){
            http.services.aumentarJugados(this.state.juego.Id)
            .then(res => {
                this.setState({juego: {...this.state.juego, Jugados: this.state.juego.Jugados+1}})
                
                if(this.state.nombre != ""){
                    this.props.history.push({
                        pathname: '/juego/jugando',
                        state: {juego: this.state.juego,
                                nombre: this.state.nombre,
                        },
                    })
                }
                else{
                    this.props.history.push({
                        pathname: '/juego/jugando',
                        state: {juego: this.state.juego},
                    })
                }
                
            })
            .catch(err =>toast.error(err.toString()))
        } else {
            toast.error("Este juego no tiene preguntas");
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return(
            <div className="center-all">
                <ToastContainer position="top-center"/>
                {this.state.loading ? (<ReactLoading className="spinner" type="spin" color="#fff"/>) : 
                (<div className="center-all flex-column card-inicio" style={{animation: `pop-in ${easings.easeOutExpo} 1000ms forwards`}}>
                    <div className="center-all contenedor-inicio contenedorR">
                        <div className="card-info-juego mr-30">
                            <div className="card-header">
                                Info del Juego
                            </div>
                            <div className="card-body d-flex flex-column">
                                <input className="rounded-input mb-20" disabled type="text" value={this.state.user ? "Creador: "+ this.state.user.Username : ""}/>
                                <input className="rounded-input mb-20" disabled type="text"  value={this.state.juego ? "Titulo: "+ this.state.juego.Nombre : ""}/>
                                <textarea className="rounded-textarea" disabled value={this.state.juego ? "Descripcion: "+ this.state.juego.Descripcion : ""}/>
                            </div>
                        </div>
                        <div className="imagen">
                            <img src={this.state.juego.Caratula} alt="Imagen"/>
                        </div>
                    </div>
                    <div className="d-flex jc-sb mt-20 card-inicio-nombre">
                        <Link className="rounded-button gold link mr-20" to="/usuario/login" style={{display: this.props.user ? "none" : null}}>
                            Login 
                        </Link>
                        <form className="d-flex" onSubmit={this.handleJugar}>
                            <input className="rounded-left-input" type="text" id="nombre" name="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Nombre" style={{display: this.props.user ? "none" : null}} required={this.state.logeado}/>
                            <button className={`${this.props.user ? "rounded-button" : "rounded-right-button"} purple`} type="submit">
                                Jugar 
                            </button>
                        </form>
                    </div>
                </div>)}
            </div>
        )
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default withRouter(connect(mapStateToProps)(InicioJuego));