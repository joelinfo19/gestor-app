import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Login.css'

export default function Login() {


    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className='ala'>
            <div className="form">
                <div className="tab-header">
                    <div onClick={showSidebar} className={sidebar ? 'active' : ''}>Sign Up</div>
                    <div onClick={showSidebar} className={sidebar ? '' : 'active'}>Sign In</div>
                </div>
                <div className="tab-content">
                    <div className={sidebar ? 'tab-body active' : 'tab-body'}>
                        <div className="form-element">
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="form-element">
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="form-element">
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="form-element">
                            <input type="checkbox" id='remenber_me' />
                            <label for='remenber_me'>Remember</label>
                        </div>
                        <div className="form-element">
                            <button>
                                <NavLink to="/">Sign Up</NavLink>
                            </button>
                        </div>
                    </div>


                    <div className={sidebar ? 'tab-body' : 'tab-body active'}>
                        <div className="form-element">
                            <input type="text" placeholder="Email" />
                        </div>
                        <div className="form-element">
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className="form-element">
                            <button>
                                <NavLink to="/">Sign In</NavLink>
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
