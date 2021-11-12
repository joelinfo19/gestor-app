import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Docentes from '../pages/Docentes'
import Cursos from '../pages/Cursos'

import './DashRutas.css'

export default function Dashrutas() {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path='/docentes' element={<Docentes />} />
                        <Route path='/cursos' element={<Cursos />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}