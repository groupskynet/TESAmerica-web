import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import NiceModal from "@ebay/nice-modal-react";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NiceModal.Provider>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </NiceModal.Provider>,
);
