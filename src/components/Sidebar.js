import { NavLink } from 'react-router-dom'
import './Sidebar.css'
// https://www.youtube.com/watch?v=vlpw4VgeR9w

export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active">• Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/docentes" activeClassName="active">• Docentes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cursos" activeClassName="active">• Cursos</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}
