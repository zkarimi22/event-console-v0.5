import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";

import viewReducer from "./reducers/viewReducer";
import dataReducer from "./reducers/dataReducer";

 


export default createStore(
    combineReducers({
        viewReducer, 
        dataReducer
       
    }),
    {},
    applyMiddleware(logger)
     ); 