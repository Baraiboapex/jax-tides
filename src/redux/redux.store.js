//experiment with this later! ==> import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
//NOTE: Aways remember to turn off redux debug middleware before deploying to prod!
//=================================================================================

import {createStore, applyMiddleware /*,compose*/ } from "redux";
import rootReducer from "./reducers/root.reducer";
import thunk from "redux-thunk";

const middleWare = [thunk];

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...middleWare),
    //compose(
       // applyMiddleware(...middleWare),
       // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     //)
);

export default store;
