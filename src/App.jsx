import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { Comisiones } from "./pages/comisiones/Comisiones";
import { Ventas } from "./pages/ventas/Ventas";
import { Pedidos } from "./pages/pedidos/pedidos";
import { RootLayouts } from "./layouts/rootLayouts";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayouts />}>
      <Route path="/comisiones" element={<Comisiones />}></Route>
      <Route path="/ventas" element={<Ventas />}></Route>
      <Route path="/pedido" element={<Pedidos />}></Route>
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
