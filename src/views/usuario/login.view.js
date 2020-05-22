import React, {Component} from 'react';

import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {loginUser} from "../../redux/actions";

import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import '../../assets/sass/App.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorPrinted: false
        };
    }

    handleClick() {
        if (this.state.username != "" && this.state.password.length > 4) {
            this.setState({...this.state, errorPrinted: false});
            this.props.loginUser({username: this.state.username, password: this.state.password}, this.props.history);
        } else {
            if (this.state.username == "") {
                toast.error("Ingrese un nombre de usuario correcto.")
            }
            if (this.state.password < 4) {
                toast.error("La contraseña debe ser mayor a 4 carácteres")
            }
        }
    }

    componentDidUpdate() {
        if (this.props.error && !this.state.errorPrinted) {
            this.setState({...this.state, errorPrinted: true});
            switch (this.props.error.message) {
                case "Request failed with status code 404":
                    toast.error("El usuario especificado no existe.");
                    break;
                case "Request failed with status code 401":
                    toast.error("La contraseña ingresada es incorrecta.");
                    break;
                default:
                    toast.error(this.props.error.message);
                    break;
            }

        }
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <div className="titulo-login">Iniciar Sesión</div>
                <input type="text" value={this.state.username}
                       onChange={event => this.setState({...this.state, username: event.target.value})}
                       placeholder="Username" autoFocus/>
                <input type="password" value={this.state.password}
                       onChange={event => this.setState({...this.state, password: event.target.value})}
                       placeholder="Password"/>
                <button onClick={e => this.handleClick(e)} type="submit">
                    Iniciar Sesion
                </button>
                <Link className="link-blanco" to="/usuario/registrar">
                    Registrarse
                </Link>
            </div>

        );
    }

}

const mapStateToProps = ({authUser}) => {
    const {user, error} = authUser;
    return {user, error};
};

export default connect(mapStateToProps, {loginUser})(Login);
