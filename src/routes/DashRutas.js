import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Docentes from '../pages/Docentes'
import Cursos from '../pages/Cursos'
import AsignarHorarios from '../pages/AsignarHorarios'
import Estadisticas from '../pages/Estadisticas'
import Perfil from '../pages/Perfil'

import './DashRutas.css'

export default function Dashrutas() {
    return (
        <div className="contenedor">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path='/list_docentes' element={<Docentes />} />
                        <Route path='/list_cursos' element={<Cursos />} />
                        <Route path='/asignar_horarios' element={<AsignarHorarios />} />
                        <Route path='/estadisticas' element={<Estadisticas />} />
                        <Route path='/perfil' element={<Perfil />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}