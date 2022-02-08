import { Routes, Route,BrowserRouter } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";

import {Inicio} from "../components/inicio/Inicio";

export const AppRouter = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}