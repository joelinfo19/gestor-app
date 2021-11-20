import {
    Routes,
    Route
} from "react-router-dom";

import { Fragment } from "react";

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Docentes from '../pages/admin/Docentes'
import Cursos from '../pages/admin/Cursos'
import AsignarHorarios from '../pages/admin/AsignarHorarios'
import Estadisticas from '../pages/admin/Estadisticas'
import Sidebar_items from '../assets/JsonData/sidebar_routes.json'

import Perfil from '../pages/Perfil'

import PrivateRouteAdmin from './PrivateRouteAdmin'
import './DashRutas.css'
// import { Fragment } from "react";

export default function DashRutasAdmin() {
    return (
        <div className="contenedor">
            <Navbar />
            <div className="flex">
                <Sidebar jsonRutas={Sidebar_items} />
                <div className="content">
                    <Routes>

                        <Route exact path='/list_cursos' element={
                            <PrivateRouteAdmin>
                                <Cursos />
                            </PrivateRouteAdmin>
                        } />
                        <Route exact path='/list_docentes' element={
                            <PrivateRouteAdmin>
                                <Docentes />
                            </PrivateRouteAdmin>
                        } />
                        <Route exact path='/asignar_horarios' element={
                            <PrivateRouteAdmin>
                                <AsignarHorarios />
                            </PrivateRouteAdmin>
                        } />
                        <Route exact path='/estadisticas' element={
                            <PrivateRouteAdmin>
                                <Estadisticas />
                            </PrivateRouteAdmin>
                        } />
                        <Route exact path='/perfil' element={
                            <PrivateRouteAdmin>
                                <Perfil />
                            </PrivateRouteAdmin>
                        } />
                    </Routes>
                </div>
            </div>
        </div>
    )
}