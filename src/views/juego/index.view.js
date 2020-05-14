import React, { Suspense } from "react";
import "../../assets/sass/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Perfil = React.lazy(() => import("./perfil.view"));
const Crear = React.lazy(() => import("./crear.view"));
const Jugar = React.lazy(() => import("./jugar.view"));

const Usuario = ({ match }) => {
  return (
      // PONER BARRA 
    <Suspense fallback={<div>Cargando</div>}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Suspense>
  );
};

export default Usuario;
