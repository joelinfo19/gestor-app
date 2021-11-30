
import './Navbar.css'
import { NavLink } from 'react-router-dom'

import Boton from './Boton'

import user_image from '../assets/images/tuat.png'

const curr_user = {
    display_name: 'Edward',
    esAdmin: 'Es Admin',
    image: user_image
}



export default function Navbar() {
    return (
        <>
            <div className="navbar-contenido">
                <div className="navContent">
                    <div className="navbar_right-item">
                        {/* <div className="user_image">
                        <img src={curr_user.image} alt="" />
                    </div> */}
                        <div className="user_name">
                            <h3>{curr_user.display_name}</h3>
                        </div>
                        <div className="user_carga">
                            <h3>{curr_user.esAdmin}</h3>
                        </div>
                        <div className="btn_salir">
                            <NavLink to="/">
                                <button className="btn btn-danger" >
                                    Salir
                                </button>
                            </NavLink>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}



{/* <div className="navbar_search">
                    <input type="search" placeholder='Search here...' />
                    <i className='fa fa-search'></i>
                </div> */}
