import React,{Component}  from 'react';
import "../../assets/sass/inicioJuego.scss";
import http from "../../api/gamequizServices";
import {toast,ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class InicioJuego extends Component {

    constructor(props) {
        super(props);
        this.state = {
          juego: null,
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
                //console.log(res.data);
                this.setState({user: res.data})
            })
            .catch(err => toast.error(err.toString()))
    }

    render() {
        return(
            <div className="d-flex jc-center center-all contenedorR">
            <ToastContainer />
                <div className="d-flex flex-column card-inicio">
                    <div className="d-flex center-all contenedor-inicio">
                        <div className="card-info-juego mr-30">
                            <div className="card-header">
                                Info del Juego
                            </div>
                            <div className="card-body d-flex flex-column">
                                <input className="rounded-input mb-20" disabled type="text" value={this.state.user ? "Creador: "+ this.state.user.Username : null}/>
                                <input className="rounded-input mb-20" disabled type="text"  value={this.state.juego ? "Titulo: "+ this.state.juego.Nombre : null}/>
                                <textarea className="rounded-textarea" disabled value={this.state.juego ? "Descripcion: "+ this.state.juego.Descripcion : null}/>
                            </div>
                        </div>
                        <div className="card-imagen">
                            <img src={this.state.juego ? this.state.juego.Caratula : null} alt="Imagen"/>
                        </div>
                    </div>
                    <div className="mt-30 center-all card-inicio-nombre">
                        <Link className="rounded-button gold link center-all w-10 mr-10"
                              to="/usuario/login" style={{display: this.props.user ? "none" : null}}>Login 
                        </Link>
                        <input className="rounded-left-input" type="text" placeholder="Nombre" style={{display: this.props.user ? "none" : null}}/>
                        <button className={`${this.props.user ? "rounded-button" : "rounded-right-button"} gold`}>Jugar </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default withRouter(connect(mapStateToProps)(InicioJuego));