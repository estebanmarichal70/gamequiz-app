import React, {Component} from 'react';
import '../../assets/sass/App.scss';
import DatePicker, {registerLocale} from "react-datepicker";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import es from 'date-fns/locale/es';
import {Link} from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {registerUser} from "../../redux/authUser/actions";


class Registrar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            username: '',
            password: '',
            conPass: '',
            fechaNac: new Date(),
            juegos: null,
            messagePrinted: false
        };
        registerLocale('es', es)

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = date => {
        this.setState({
            fechaNac: date
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        this.setState({...this.state, messagePrinted: false});
        e.preventDefault();
        if (this.state.password === this.state.conPass) {
            const usuario = {
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                username: this.state.username,
                password: this.state.password,
                fechaNac: this.state.fechaNac,
                juegos: this.state.juegos
            }
            this.props.registerUser(usuario, this.props.history);
        } else {
            toast.error('Las contraseñas no coinciden');
        }
    }


    componentDidUpdate() {
        if (this.props.error !== '' && !this.state.messagePrinted) {
            this.setState({...this.state, messagePrinted: true});
            switch (this.props.error) {
                case "Request failed with status code 409":
                    toast.error("El usuario ingresado ya existe");
                    break;
                default:
                    toast.error(this.props.error)
                    break;
            }
        }

        if (this.props.success_message !== '' && !this.state.messagePrinted) {
            this.setState({...this.state, messagePrinted: true});
            toast.success(this.props.success_message);
        }
    }

    render() {
        return (
            <div>
                <ToastContainer position="top-center"/>
                <form onSubmit={this.onSubmit}>
                    <div className="titulo-login">Registrarse</div>
                    <input type="text" placeholder="Nombre" name="nombre" value={this.state.nombre}
                           onChange={this.onChange} autoFocus required/>
                    <input type="text" placeholder="Apellido" name="apellido" value={this.state.apellido}
                           onChange={this.onChange} required/>
                    <input type="text" placeholder="Usuario" name="username" value={this.state.usuario}
                           onChange={this.onChange} required/>
                    <input type="password" placeholder="Contraseña" name="password" value={this.state.pass}
                           onChange={this.onChange} required/>
                    <input type="password" placeholder="Repetir contraseña" name="conPass" value={this.state.conPass}
                           onChange={this.onChange} required/>
                    <DatePicker
                        className="m-0"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Fecha de Nacimiento"
                        selected={this.state.fechaNac}
                        onChange={this.handleChange}
                        locale="es"
                        required
                    />
                    <button type="submit">
                        Confirmar
                    </button>
                    <Link className="link-blanco" to="/usuario/login">
                        Iniciar Sesión
                    </Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({authUser}) => {
    const {success_message, error} = authUser;
    return {success_message, error};
};

export default withRouter(connect(mapStateToProps, {registerUser})(Registrar));