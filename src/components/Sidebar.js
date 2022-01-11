import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { useEffect } from 'react'

import logo from '../assets/images/log.png'

// const SidebarItem = (props) => {

//     // return (
//     //     <>
//     //         <div className={"sidebar__onlylink"}>
//     //             <i className={props.icon}></i>
//     //             <span>
//     //                 {props.title}
//     //             </span>
//     //         </div>
//     //     </>
//     // )
// }
let nombre = "load..."
let esAdmin = "load..."


export default function Sidebar({ jsonRutas }) {


    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
        // console.log(nombre)
        nombre = user.nombre
        esAdmin = user.esAdmin ? "Admin" : "Regular"
        // console.log("mostrando user",nombre)
    }
    else {
        console.log("no hay user")
    }

    const recupUser = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            // console.log(nombre)
            nombre = user.nombre
            esAdmin = user.esAdmin ? "Admin" : "Regular"
            // console.log("mostrando user",nombre)
        }
        else {
            console.log("no hay user")
        }
    }

    useEffect(() => {
        console.log("useefect sidebar")
        recupUser()
    }, [])

    return (
        <>
            <div className='sidebar'>
                <div className="sidebar__logo">
                    <img src={logo} alt="company logo" />
                </div>
                <div className="user_name">
                    <p>{nombre}</p>
                </div>
                <div className="user_carga">
                    <p>{esAdmin}</p>
                </div>
                <div className="sidebar__links">
                    {
                        jsonRutas.map((item, index) => (
                            <NavLink to={item.route} key={index}>
                                <i className={item.icon}></i>
                                <span>
                                    {item.display_name}
                                </span>
                                {/* <SidebarItem
                                    title={item.display_name}
                                    icon={item.icon}
                                /> */}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </>
    )
}