import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from './reducers';
import rootSaga from "./sagas";


import {persistReducer, persistStore} from 'redux-persist';

import localForage from "localforage";

const persistConfig = {
    key: 'root',
    storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

export const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);


if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
}

export const persistor = persistStore(store);

