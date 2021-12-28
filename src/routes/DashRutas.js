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

import './DashRutas.css'

export default function DashRutas() {
    return (
        <div className="contenedor">
            <Navbar />
            <div className="flex">
                <Sidebar jsonRutas={Sidebar_items} />
                <div className="content">
                    <Routes>
                        <Route exact path='/mis_cursos' element={<MisCursos />} />
                        <Route exact path='/mis_cursos/:courseId' element={<Curso />} />
                        <Route exact path='/perfil' element={<Perfil />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}