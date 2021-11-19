import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Login.css'

import Imagen from '../assets/images/Logo_info.png'

export default function Login() {


    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className='ala'>
            <div className="form">
                <div className="tab-header">
                    <div onClick={showSidebar} className={sidebar ? 'active' : ''}>Registro</div>
                    <div onClick={showSidebar} className={sidebar ? '' : 'active'}>Inicio</div>
                </div>
                <div className="image">
                    <img src={Imagen} alt="" />
                </div>
                <div className="tab-content">
                    <div className={sidebar ? 'tab-body active' : 'tab-body'}>
                        <div className="form-element">
                            <i class="fas fa-envelope icon"></i>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="form-element">
                            <i class="fas fa-user icon"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="form-element">
                            <i class="fas fa-key icon"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="form-element-label">
                            <input type="checkbox" id='remenber_me' />
                            <label for='remenber_me'>Remember</label>
                        </div>
                        <div className="form-element">
                            <button>
                                <NavLink to="/list_cursos">Registro</NavLink>
                            </button>
                        </div>
                    </div>


                    <div className={sidebar ? 'tab-body' : 'tab-body active'}>
                        <div className="form-element">
                            <i class="fas fa-envelope icon"></i>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="form-element">
                            <i class="fas fa-key icon"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="form-element">
                            <button>
                                <NavLink to="/list_cursos">Iniciar</NavLink>
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
