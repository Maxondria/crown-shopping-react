import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./cart/cart.reducer";
import { directoryReducer } from "./directory/directory.reducer";
import { userReducer } from "./user/user.reducer";

const persistConfig = { key: "root", storage, whitelist: ["cart"] };

const combinedReducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer
});

export const rootReducer = persistReducer(persistConfig, combinedReducers);
