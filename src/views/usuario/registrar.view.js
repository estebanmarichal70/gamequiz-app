import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import gamequizServices from '../../api/gamequizServices';

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
            juegos: null
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
                password: this.state.pass,
                conPass: this.state.conPass,
                fechaNac: this.state.fechaNac,
                juegos: this.state.juegos
            }

            gamequizServices.services.registrar(usuario)
            .then(response => {
                console.log(response.data)

                toast.success('Se ha creado el usuario correctamente', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(err => console.log(err))
        } else {
            toast.error('Las contraseñas no coinciden', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    render() {
        return (
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
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

export default Registrar;