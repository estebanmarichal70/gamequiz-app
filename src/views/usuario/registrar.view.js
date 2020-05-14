import React,{Component}  from 'react';
import '../../assets/sass/App.scss';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";


class Registrar extends Component {

    constructor(props) {
        super(props);
        this.state = {startDate: new Date()};
        registerLocale('es', es)
    }

    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    render() {
        return (
            <div>
                <div className="titulo-login">Registrarse</div>
                <input type="text" placeholder="Nombre"/>
                <input type="text" placeholder="Apellido"/>
                <input type="text" placeholder="Usuario"/>
                <input type="password" placeholder="Contraseña"/>
                <input type="password" placeholder="Repetir contraseña"/>
                <DatePicker 
                    className="m-0"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    locale="es"
                />
                    <button type="submit">
                        Confirmar
                     </button>
            </div>
        );
    }
}

export default Registrar;