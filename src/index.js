import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./theme/GlobalStyle";

const WidgetDivs = document.querySelectorAll(".W__multistep-lead-form-jcx02l");

WidgetDivs.forEach((Div) => {
  const root = ReactDOM.createRoot(Div);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App domElement={Div} />
    </React.StrictMode>
  );
});
