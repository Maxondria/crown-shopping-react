import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../reducers";
import logger from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //redux dev tools

const middleware = [logger];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export { store as default };
