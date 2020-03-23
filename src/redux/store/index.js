import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //redux dev tools

const middleware = [logger, thunk];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { persistor, store as default };
