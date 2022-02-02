import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import MisCursos from '../pages/user/MisCursos'
import Curso from '../pages/user/Curso'
import Perfil from "../pages/user/Perfil"

import Sidebar_items from '../assets/JsonData/sidebar_user_routes.json'

import PrivateRouteUser from './PrivateRouteUser'
import './DashRutas.css'
import Reportes from "../pages/user/Reportes";

export default function DashRutas() {
    return (
        <>
            <div className="contenedor">
                <Navbar />
                <div className="flex">
                    <Sidebar jsonRutas={Sidebar_items} />
                    <div className="content">
                        <Routes>
                            <Route exact path='/mis_cursos' element={
                                <PrivateRouteUser conRol="regular">
                                    <MisCursos />
                                </PrivateRouteUser>
                            } />
                            <Route exact path='/mis_cursos/:courseId' element={
                                <PrivateRouteUser conRol="regular">
                                    <Curso />
                                </PrivateRouteUser>
                            } />

                            <Route exact path='/perfil' element={
                                <PrivateRouteUser conRol="regular">
                                    <Perfil />
                                </PrivateRouteUser> 
                            } />
                            <Route exact path='/reportes' element={
                                <PrivateRouteUser  conRol='regular'>
                                    <Reportes />
                                </PrivateRouteUser>
                            }
                            
                            />
                        </Routes>
                    </div>

                </div>
            </div>
        </>
    )
}
