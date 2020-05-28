import React, {Component, Suspense} from 'react';

import {connect} from "react-redux";
import './assets/sass/App.scss';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import AuthRoute from "./components/auth-route/auth-route.component";

import './assets/sass/image-uploader.scss';

import VistaInicio from "./views/index.view";
import Auth from "./views/usuario/index.view"
import Juego from './views/juego/index.view';
import Perfil from './views/usuario/perfil.view';


import ViewError from "./views/error";

class App extends Component {
    render() {
        console.log(this.props.user);
        return (
            <div className="App h-100">
                <Suspense fallback={<div/>}>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/' render={props => <VistaInicio {...props}/>} exact/>
                            <AuthRoute path='/usuario/perfil' user={this.props.user} exact
                                       render={props => <Perfil {...props}/>}/>
                            <Route path='/usuario' render={props => <Auth {...props}/>}/>
                            <AuthRoute path='/juego' user={this.props.user} render={props => <Juego {...props}/>}/>
                            <Route path="/error" exact render={props => <ViewError {...props} />}/>
                            <Redirect to="/error"/>
                        </Switch>
                    </BrowserRouter>
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps)(App);
