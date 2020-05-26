import React,{Component, Suspense}  from 'react';
import './assets/sass/App.scss';
import {Switch,Route,BrowserRouter} from 'react-router-dom'

import './assets/sass/image-uploader.scss';

import VistaInicio from "./views/index.view";
import Auth from "./views/usuario/index.view"
import Juego from './views/juego/index.view';
import Perfil from './views/usuario/perfil.view';

class App extends Component {
  render() { 
      return ( 
      <div className="App h-100">
        <Suspense fallback={ <div/>}>
          <BrowserRouter>
            <Switch>
              <Route path='/' render={props => <VistaInicio {...props}/>} exact />
              <Route path='/usuario' render={props => <Auth {...props}/>} />  
              <Route path='/juego' render={props => <Juego {...props}/>} />
              <Route path='/perfil' render={props => <Perfil {...props}/>} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </div>
    );
  }
}

export default App;
