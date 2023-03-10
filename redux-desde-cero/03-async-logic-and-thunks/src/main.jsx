import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { fetchUsers } from "./features/users/usersSlice";

store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
