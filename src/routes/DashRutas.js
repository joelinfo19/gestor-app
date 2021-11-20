import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Docentes from '../pages/Docentes'
import Cursos from '../pages/Cursos'

import './DashRutas.css'

export default function DashRutas() {
    return (
        <div className="contenedor">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route exact path='/mis_cursos' element={<Docentes />} />
                        <Route exact path='/perfil' element={<Cursos />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}