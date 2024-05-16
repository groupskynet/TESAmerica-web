import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import NiceModal from "@ebay/nice-modal-react";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NiceModal.Provider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </NiceModal.Provider>,
);
