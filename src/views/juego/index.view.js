import React, {Suspense} from "react";
import "../../assets/sass/App.scss";
import {Redirect, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import ViewError from "../error";


const Crear = React.lazy(() => import("./crear.view"));
const Configurar = React.lazy(() => import("./configurar.view"));
const Empezar = React.lazy(() => import("./empezar.view"));
const Jugando = React.lazy(() => import("./jugando.view"));
const Youtube = React.lazy(() => import("./youtube.view"));
const Join = React.lazy(() => import("./join.view"));
const Correccion = React.lazy(() => import("./correccion.view"));
const Inicio = React.lazy(() => import("./inicioJuego.view"));
const Ranking = React.lazy(() => import("./ranking.view"));

const Juego = ({match}) => {
    return (
        <Suspense fallback={<div/>}>
            <div className="center-all">
                <h1 className="titulo-inicio">GameQuiz</h1>
            </div>
            <Switch>
                <Route
                    path={`${match.url}/crear`}
                    render={(props) => <Crear {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/configurar`}
                    render={(props) => <Configurar {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/empezar`}
                    render={(props) => <Empezar {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/jugando`}
                    render={(props) => <Jugando {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/youtube`}
                    render={(props) => <Youtube {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/join`}
                    render={(props) => <Join {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/correccion`}
                    render={(props) => <Correccion {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/inicio`}
                    render={(props) => <Inicio {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/ranking`}
                    render={(props) => <Ranking {...props} />}
                    exact
                />
                <Route path="/error" exact render={props => <ViewError {...props} />}/>
                <Redirect to="/error"/>
            </Switch>
        </Suspense>
    );
};

export default withRouter(Juego);
