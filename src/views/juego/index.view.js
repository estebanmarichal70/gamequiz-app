import React, { Suspense } from "react";
import "../../assets/sass/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {withRouter} from "react-router";

const Perfil = React.lazy(() => import("./perfil.view"));
const Crear = React.lazy(() => import("./crear.view"));
const Jugar = React.lazy(() => import("./jugar.view"));

const Juego = ({ match }) => {
  return (
      // PONER BARRA 
    <Suspense fallback={<div>Cargando</div>}>
        <Switch>
          <Route
            path={`${match.url}/perfil`}
            render={(props) => <Perfil {...props} />}
            exact
          />
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
        </Switch>
    </Suspense>
  );
};

export default withRouter(Juego);
