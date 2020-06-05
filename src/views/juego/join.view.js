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
            buscar : ""
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

    fetchJuego  = debounce(async (busqueda) => {
        await http.services.fetchJuegoUuid(busqueda)
            .then(res => {
                this.setState({juegoU: res.data})
            })
            .catch(err => toast.error(err.toString()))
    },300)

    handleSearch = async(event) => {
        await this.setState({buscar: event.target.value});
        this.fetchData(this.state.buscar);
    }
    render() {
        return (
            <div className="d-flex flex-column contenedorR">
                <div className="d-flex flex-column card-join">
                    <div className="d-flex center-all flex-column">
                        <input className="input-join" placeholder="Join Game (link)"/>
                        <div className="cont-pass">
                            <input className="rounded-input" type="password" placeholder="Password" name="password" required/>
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
                        <div key={juego.Id} className="d-flex flex-column center-all card-juego">
                            <div className="imagen center-all">
                                <img src={juego.Caratula} alt="image"/>
                            </div>
                            <div className="center-all titulo">
                                <span>{juego.Nombre}(Cantidad Preguntas)</span>
                            </div>
                        </div>)
                        }) : null
                    }
                    </div>
                    <div className="d-flex center-all mt-10 cont-boton">
                        <Link className="rounded-button link gold" to="/juego/jugando">
                            Iniciar
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Join;    