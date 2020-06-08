import React, {Suspense} from "react";
import "../../assets/sass/App.scss";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import ViewError from "../error";

import AuthRoute from "../../components/auth-route/auth-route.component";
import {connect} from "react-redux";


const Crear = React.lazy(() => import("./crear.view"));
const Configurar = React.lazy(() => import("./configurar.view"));
const Empezar = React.lazy(() => import("./empezar.view"));
const Jugando = React.lazy(() => import("./jugando.view"));
const Youtube = React.lazy(() => import("./youtube.view"));
const Join = React.lazy(() => import("./join.view"));
const Correccion = React.lazy(() => import("./correccion.view"));
const Inicio = React.lazy(() => import("./inicioJuego.view"));
const Ranking = React.lazy(() => import("./ranking.view"));

class Juego extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Suspense fallback={<div/>}>
                <div className="center-all">
                    <Link className="link" to="/"><h1 className="titulo-inicio">GameQuiz</h1></Link>
                </div>
                <Switch>
                    <AuthRoute
                        path={`${this.props.match.url}/crear`}
                        user={this.props.user}
                        component={Crear}
                        exact
                    />
                    <AuthRoute
                        path={`${this.props.match.url}/configurar`}
                        user={this.props.user}
                        component={Configurar}
                        exact
                    />
                    <Route
                        path={`${this.props.match.url}/empezar`}
                        render={(props) => <Empezar {...props} />}
                        exact
                    />
                    <Route
                        path={`${this.props.match.url}/jugando`}
                        render={(props) => <Jugando {...props} />}
                        exact
                    />
                    <AuthRoute
                        path={`${this.props.match.url}/youtube`}
                        user={this.props.user}
                        component={Youtube}
                        exact
                    />
                    <Route
                        path={`${this.props.match.url}/join`}
                        render={(props) => <Join {...props} />}
                        exact
                    />
                    <Route
                        path={`${this.props.match.url}/correccion`}
                        render={(props) => <Correccion {...props} />}
                        exact
                    />
                    <Route
                        path={`${this.props.match.url}/inicio`}
                        render={(props) => <Inicio {...props} />}
                        exact
                    />
                    <Route
                        path={`${this.props.match.url}/ranking`}
                        render={(props) => <Ranking {...props} />}
                        exact
                    />
                    <Route path="/error" exact render={props => <ViewError {...props} />}/>
                    <Redirect to="/error"/>
                </Switch>
            </Suspense>
        )
            ;
    }
}

const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default withRouter(connect(mapStateToProps)(Juego));
