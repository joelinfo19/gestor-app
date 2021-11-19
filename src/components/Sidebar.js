import { NavLink } from 'react-router-dom'
import './Sidebar.css'

import sidebar_items from '../assets/JsonData/sidebar_routes.json'
import logo from '../assets/images/log.png'

const SidebarItem = (props) => {

    return (
        <div className="sidebar__item">
            <div className={"sidebar__item-inner"}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

export default function Sidebar() {

    // const activeItem = sidebar_items.findIndex(item => item.route === window.location.pathname)

    return (
        <>
            <div className='sidebar'>
                <div className="sidebar__logo">
                    <img src={logo} alt="company logo" />
                </div>
                {
                    sidebar_items.map((item, index) => (
                        <NavLink to={item.route} key={index}>
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                            />
                        </NavLink>
                    ))
                }
            </div>

        </>
    )
}



{/* <div className="sidebar">
                <ul>
                    <li>
                        <NavLink to="/docentes" activeClassName="active">Docentes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cursos" activeClassName="active">Cursos</NavLink>
                    </li>

                    <br />
                    <li>
                        <NavLink to="/login" >Salir</NavLink>
                    </li>

                </ul>
            </div> */}