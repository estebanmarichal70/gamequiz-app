import React,{Component, Suspense}  from 'react';
import './assets/sass/App.scss';
import {Switch,Route,BrowserRouter} from 'react-router-dom'

const VistaInicio = React.lazy(()=> import('./views/index.view'));
const Auth = React.lazy(()=> import('./views/usuario/index.view'));
const Juego = React.lazy(()=> import('./views/juego/index.view'));

class App extends Component {
  render() { 
      return ( 
      <div className="App h-100">
        <Suspense fallback={ <div></div>}>
          <BrowserRouter>
            <Switch>
              <Route path='/' render={props => <VistaInicio {...props}/>} exact />
              <Route path='/usuario' render={props => <Auth {...props}/>} />  
              <Route path='/app' render={props => <Juego {...props}/>} />  
            </Switch>
          </BrowserRouter>
        </Suspense>
      </div>
    );
  }
}

export default App;
