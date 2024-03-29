import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import reducer from "./store/reducer";
import config from "./config";
import MyProvider from "./core/ContextProvider";
import InitApp from "./core/InitApp";

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <MyProvider>
      <InitApp />
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </MyProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
