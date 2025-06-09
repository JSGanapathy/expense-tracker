/*
 * File         : main.jsx
 * Author       : Ganapathy
 * Description  : Entry point for the React application that renders the main App component.
 *               It uses StrictMode for highlighting potential problems in the application.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
