import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import { Link } from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="titulo-login">Iniciar Sesión</div>
                <input type="text" placeholder="Username" autoFocus/>
                <input type="password" placeholder="Password"/>
                <button type="submit">
                    Login
                </button>
                <Link className="link-blanco" to="/usuario/registrar">
                    Registrarse
                </Link>
            </div>
        );
    }
    
}

export default Login;