import React, {Suspense} from "react";
import "../../assets/sass/App.scss";
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";


const Crear = React.lazy(() => import("./crear.view"));
const Jugar = React.lazy(() => import("./jugar.view"));
const Configurar = React.lazy(() => import("./configurar.view"));

const Juego = ({match}) => {
    return (
        // PONER BARRA
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
                    path={`${match.url}/jugar`}
                    render={(props) => <Jugar {...props} />}
                    exact
                />
                <Route
                    path={`${match.url}/configurar`}
                    render={(props) => <Configurar {...props} />}
                    exact
                />
            </Switch>
        </Suspense>
    );
};

export default withRouter(Juego);
