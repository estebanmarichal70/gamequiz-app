import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/index.scss';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {configureStore} from './redux/store';

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={configureStore()}>
            <Suspense fallback={<div/>}>
                <App/>
            </Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
