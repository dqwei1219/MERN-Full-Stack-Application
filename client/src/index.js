import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import {GoogleOAuthProvider} from "@react-oauth/google"

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="1066398324699-7asprsbm2u0tdg6cfd49mvk6o26nvkf7.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
