import React, {Component} from 'react';

import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {loginUser} from "../../redux/actions";

import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import '../../assets/sass/App.scss';
import {withRouter} from "react-router";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorPrinted: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({...this.state, errorPrinted: false});
            this.props.loginUser({username: this.state.username, password: this.state.password}, this.props.history);
        } else {
            if (this.state.username === "" || this.state.password === "") {
                toast.error("Por favor, ingrese todos los datos")
            }
        }
    }


    componentDidUpdate() {
        if (this.props.error && !this.state.errorPrinted) {
            this.setState({...this.state, errorPrinted: true});
            switch (this.props.error.message) {
                case "Request failed with status code 404":
                    toast.error("El usuario especificado no existe");
                    break;
                case "Request failed with status code 401":
                    toast.error("La contraseña ingresada es incorrecta");
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
                <ToastContainer position="top-center"/>
                <form onSubmit={this.onSubmit} >
                    <div className="center-all flex-column">
                        <div className="titulo-login mb-10">Iniciar Sesión</div>
                        <input type="text"
                            className="rounded-input mb-10"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                            placeholder="Username"
                            autoFocus/>
                        <input type="password"
                            className="rounded-input mb-10"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder="Password"/>
                        <button className="rounded-button mb-10" type="submit">Iniciar Sesion</button>
                        <Link className="link-blanco" to="/usuario/registrar">
                            Registrarse
                        </Link>
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = ({authUser}) => {
    const {user, error} = authUser;
    return {user, error};
};

export default withRouter(connect(mapStateToProps, {loginUser})(Login));
