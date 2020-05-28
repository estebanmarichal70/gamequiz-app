import React, {Suspense} from "react";
import '../../assets/sass/App.scss';
import {Redirect, Route, Switch} from "react-router-dom";

import Login from './login.view';
import Registrar from './registrar.view';
import {withRouter} from "react-router";
import ViewError from "../error";

const Usuario = ({match}) => {
    return (
        <div className="form-login h-100">
            <div className="form-box">
                <Suspense fallback={<div/>}>
                    <Switch>
                        <Route path={`${match.url}/login`} render={props => <Login {...props}/>} exact/>
                        <Route path={`${match.url}/registrar`} render={props => <Registrar {...props}/>} exact/>
                        <Route path="/error" exact render={props => <ViewError {...props} />}/>
                        <Redirect to="/error"/>
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
}

export default withRouter(Usuario);