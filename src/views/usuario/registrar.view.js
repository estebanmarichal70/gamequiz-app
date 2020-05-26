import React,{Component}  from 'react';
import '../../assets/sass/App.scss';

import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import {registerUser} from "../../redux/actions";

import "react-datepicker/dist/react-datepicker.css";


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
            errorPrinted: false
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

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.password === this.state.conPass){
            const usuario = {
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                username: this.state.username,
                password: this.state.password,
                fechaNac: this.state.fechaNac,
                juegos: this.state.juegos
            }

            this.props.registerUser(usuario, this.props.history);
            /*gamequizServices.services.registrar(usuario)
            .then(response => {
                console.log(response.data)

                toast.success('Se ha creado el usuario correctamente');
            }).catch(err => console.log(err))*/
        } else {
            toast.error('Las contraseñas no coinciden');
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
                <ToastContainer position="top-center" />
                <form onSubmit={this.onSubmit}>
                    <div className="titulo-login">Registrarse</div>
                    <input type="text" placeholder="Nombre" name="nombre" value={this.state.nombre} onChange={this.onChange} autoFocus required/>
                    <input type="text" placeholder="Apellido" name="apellido" value={this.state.apellido} onChange={this.onChange} required/>
                    <input type="text" placeholder="Usuario" name="username" value={this.state.usuario} onChange={this.onChange} required/>
                    <input type="password" placeholder="Contraseña" name="password" value={this.state.pass} onChange={this.onChange} required/>
                    <input type="password" placeholder="Repetir contraseña" name="conPass" value={this.state.conPass} onChange={this.onChange} required/>
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
    const {user, error} = authUser;
    return {user, error};
};

export default connect(mapStateToProps, {registerUser})(Registrar);