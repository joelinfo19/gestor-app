import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Login.css'

import Imagen1 from '../assets/images/Logo_info.png'
import Imagen2 from '../assets/images/Logo_unsaac.png'

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
                    <img src={Imagen1} alt="" />
                    <img src={Imagen2} alt="" />
                </div>
                <div className="tab-content">
                    <div className={sidebar ? 'tab-body active' : 'tab-body'}>
                        <div className="form-element">
                            <i className="fas fa-envelope icon"></i>
                            <input type="text" placeholder="Email" value={'edward@gmail.com'} />
                        </div>
                        <div className="form-element">
                            <i className="fas fa-user icon"></i>
                            <input type="text" placeholder="Username" value={'edward'}/>
                        </div>
                        <div className="form-element">
                            <i className="fas fa-key icon"></i>
                            <input type="password" placeholder="Password" value={'edward'} />
                        </div>
                        <div className="form-element-label">
                            <input type="checkbox" id='remenber_me' />
                            <label htmlFor='remenber_me'>Remember</label>
                        </div>
                        <div className="form-element ">
                            <NavLink to="/admin/list_cursos">
                                <button>
                                    Registro
                                </button>
                            </NavLink>

                        </div>
                    </div>


                    <div className={sidebar ? 'tab-body' : 'tab-body active'}>
                        <div className="form-element">
                            <i className="fas fa-envelope icon"></i>
                            <input type="text" placeholder="Email" value={'edward@gmail.com'} />
                        </div>
                        <div className="form-element">
                            <i className="fas fa-key icon"></i>
                            <input type="password" placeholder="Password" value={'login'} />
                        </div>
                        <div className="form-element">
                            <NavLink to="admin/list_cursos">
                                <button>
                                    Iniciar
                                </button>

                            </NavLink>



                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}