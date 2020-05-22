import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";
import rootReducer from './reducers';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export function configureStore(initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
