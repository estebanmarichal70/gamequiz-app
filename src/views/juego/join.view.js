import React,{Component}  from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import '../../assets/sass/App.scss';
import "../../assets/empezar.scss";

class Join extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="d-flex flex-column contenedorR">
                <div className="d-flex center-all flex-column">
                    <input className="input-join" placeholder="Join Game (link)"/>
                    <div className="cont-pass">
                        <input className="rounded-input" type="password" placeholder="Password" name="password" required/>
                    </div>
                </div>
                <div className="card-join ">
                    <input className="input-buscar" type="text"   
                            placeholder="Buscar" autoFocus/>
                    <Link className="boton-buscar gold link">
                    <FontAwesomeIcon icon={faSearch}
                                    color="#909296"/>
                    </Link>
                </div>
                
            </div>
        );
    }
}

export default Join;    