import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Inicio from './pages/Inicio';
import Docentes from './pages/Docentes';
import Cursos from './pages/Cursos';
import './App.css'

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Inicio />} />
                            <Route path="/docentes" element={<Docentes />} />
                            <Route path="/cursos" element={<Cursos />} />
                        </Routes> 
                    </div>
                </div>

            </BrowserRouter>

        </>
    )
}

export default App;
