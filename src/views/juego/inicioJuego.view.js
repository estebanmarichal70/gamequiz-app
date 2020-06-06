import React,{Component}  from 'react';
import "../../assets/sass/App.scss";
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import ReactLoading from "react-loading";
import { easings } from 'react-animation';
import {DEFAULT_IMAGE_URL} from "../../constants/constants";

class InicioJuego extends Component {

    constructor(props) {
        super(props);
        this.state = {
          juego: null,
          loading: true
        };
      }

    componentDidMount(){
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
        if(this.state.juego.Preguntas && this.state.juego.Preguntas.lenght){
            this.props.history.push({
                pathname: '/juego/jugando',
                state: {juego: this.state.juego}
            })
        } else {
            toast.error("Este juego no tiene preguntas");
        }
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
                            <img src={this.state.juego.Caratula != "default" ? this.state.juego.Caratula : DEFAULT_IMAGE_URL} alt="Imagen"/>
                        </div>
                    </div>
                    <div className="mt-20 card-inicio-nombre">
                        <Link className="rounded-button gold link" to="/usuario/login" style={{display: this.props.user ? "none" : null}}>
                            Login 
                        </Link>
                        <form className="d-flex" onSubmit={this.handleJugar}>
                            <input className="rounded-left-input" type="text" placeholder="Nombre" style={{display: this.props.user ? "none" : null}}/>
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