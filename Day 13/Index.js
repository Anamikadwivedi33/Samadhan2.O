// Import React library
import React from "react";

// Import ReactDOM library for rendering
import ReactDOM from "react-dom/client";

// Import main App component
import App from "./App";

// Create root element using ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
