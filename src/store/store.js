import thunk from "redux-thunk";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";

//Usar middleware con redux tools
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//Este combineReduce recibe todos los reduces independientes de la aplicacion
const reducers = combineReducers({
  auth: authReducer,
  //Ui->UserInterface
  ui: uiReducer,
});

//Create store solo se puede crear una vez y recibe solo un reducer
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
