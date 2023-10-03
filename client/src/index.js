import React from "react";
import ReactDOM from "react-dom/client";
import "@picocss/pico";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context/appContext";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "/api/v1";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <AppProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </AppProvider>
  </>
);
