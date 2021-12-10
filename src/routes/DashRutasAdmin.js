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
import Sidebar_items from '../assets/JsonData/sidebar_routes.json'

import Perfil from '../pages/user/Perfil'

import PrivateRouteAdmin from './PrivateRouteAdmin'
import './DashRutas.css'
// import { Fragment } from "react";

export default function DashRutas() {
    return (
        <>
            <div className="contenedor-dash">
                <Navbar />
                <div className="flex">
                    <Sidebar jsonRutas={Sidebar_items} />
                    <div className="content">
                        <Routes>

                            <Route exact path='/list_cursos' element={
                                <PrivateRouteAdmin conRol="admin">
                                    <Cursos />
                                </PrivateRouteAdmin>
                            } />
                            <Route exact path='/list_docentes' element={
                                <PrivateRouteAdmin conRol="admin">
                                    <Docentes />
                                </PrivateRouteAdmin>
                            } />
                            <Route exact path='/asignar_horarios' element={
                                <PrivateRouteAdmin conRol="admin">
                                    <AsignarHorarios />
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
        </>
    )
}