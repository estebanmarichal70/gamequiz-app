import React,{Component, Suspense}  from 'react';
import './assets/sass/App.scss';
import {Switch,Route,BrowserRouter} from 'react-router-dom'

const VistaInicio = React.lazy(()=> import('./views/app/inicio.view'));
const Auth = React.lazy(()=> import('./views/usuario/index.view'));

class App extends Component {
  render() { 
      return ( 
      <div className="App h-100">
        <Suspense fallback={ <div>Cargando</div>}>
          <BrowserRouter>
            <Switch>
              <Route path='/' render={props => <VistaInicio {...props}/>} exact />
              <Route path='/usuario' render={props => <Auth {...props}/>} exact />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </div>
    );
  }
}

export default App;
