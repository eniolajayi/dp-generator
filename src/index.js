import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Help from "./routes/help";
import Home from "./routes/home";
import CreateDP from "./routes/createdp";
import GenerateDP from "./routes/generatedp";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/banner"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route path="/banner/create" element={<CreateDP />} />
            <Route path="/banner/generate/:bannerid" element={<GenerateDP />} />
          </Route>
          <Route path="*" element={<h1>404 - no matching url</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
