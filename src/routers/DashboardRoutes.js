// este archivo se encarga de que todas las rutas que queramos este en el NavBar
import { Routes, Route } from "react-router-dom";
import { Cocinero } from "../components/cocinero/CocineroInicio";

import {Navbar} from "../components/navBar/NavBar";

import {Pedidos} from "../components/pedidos/Pedidos";
import {TomarOrden} from "../components/tomarOrden/TomarOrden";


export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="cocinero" element={<Cocinero />}/>
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="tomarorden" element={<TomarOrden />} />
      </Routes>
    </>
  )
}