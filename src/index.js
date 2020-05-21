import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainView from './app/containers/mainView';
import store from "./app/store";
import * as serviceWorker from './serviceWorker';
import { Provider }from "react-redux";
 
serviceWorker.unregister();

 
ReactDOM.render(
<Provider store={store}>
<MainView />
</Provider>, document.getElementById('root'));
 
 