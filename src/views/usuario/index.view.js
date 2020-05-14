import React, {Suspense} from "react";
import '../../assets/sass/App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";

const Login = React.lazy(()=> import('./login.view'));
const Registrar = React.lazy(()=> import('./registrar.view'));

const Usuario = ({match}) => {
    return (
        <div className="form-login h-100">
            <div className="form-box">
                <Suspense fallback={ <div>Cargando</div>}>
                    <BrowserRouter>
                        <Switch>
                            <Route path={`${match.url}/login`} render={props => <Login {...props}/>} exact />
                            <Route path={`${match.url}/registrar`} render={props => <Registrar {...props}/>} exact />
                        </Switch>
                    </BrowserRouter>
                </Suspense>
            </div>
        </div>
    );
}

export default Usuario;