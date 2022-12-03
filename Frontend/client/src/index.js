import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
//devtools
import { composeWithDevTools } from "redux-devtools-extension";
//css
import "./Styles/_index.scss";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
