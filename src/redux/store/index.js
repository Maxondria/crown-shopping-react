import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../reducers";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import rootSaga from "../sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //redux dev tools

const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, sagaMiddleware];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { persistor, store as default };
