import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './Login.css'
import { axios } from '../helpers/axios'

import Imagen1 from '../assets/images/Logo_info.png'
import Imagen2 from '../assets/images/Logo_unsaac.png'

export default function Login() {


    const [sidebar, setSidebar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [db, setDb] = useState([])

    const showSidebar = () => setSidebar(!sidebar);

    // const [stateForm, setStateForm] = useState({})
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // const handleInputChange = (event) => {
    //     setStateForm({
    //         ...stateForm,
    //         [event.target.name]: event.target.value
    //     })
    //     console.log(stateForm)
    // }


    // useEffect(() => {
    //     if (localStorage.getItem('user-info')){
    //         navigate("/")
    //     }
    // }, [])
    // localStorage.setItem("user-info", JSON.stringify(result))



    let navigate = useNavigate()

    let api = axios()
    let url = 'https://reqres.in/api/login'

    useEffect(() => {
        // axios.get(url).then((res) => {
        //     console.log(res);
        // })  
    }, [])

    let data = {
        // email: "edward2@gmail.com",
        // contrasenia: "123"
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    }

    const clickLogin = () => {
        setError(null)
        setLoading(true)
        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }
        api.post(url, options)
            .then((res) => {
                console.log(res)
                if (!res.err) {
                    setLoading(false)
                    console.log("logueado")
                    navigate("/admin/perfil")
                }
                else {
                    setLoading(false)
                    setError("Email or Password failed")
                    console.log("nooo logueado")
                }
            })
            .catch((error) => {
                setError("mething went wrong. Please try again")
                console.error("error >>> ", error)
            })
    }


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
                            <input type="text" placeholder="Email" defaultValue={'edward@gmail.com'} />
                        </div>
                        <div className="form-element">
                            <i className="fas fa-user icon"></i>
                            <input type="text" placeholder="Username" defaultValue={'edward'} />
                        </div>
                        <div className="form-element">
                            <i className="fas fa-key icon"></i>
                            <input type="password" placeholder="Password" defaultValue={'edward'} />
                        </div>
                        <div className="form-element-label">
                            <input type="checkbox" id='remenber_me' />
                            <label htmlFor='remenber_me'>Remember</label>
                        </div>
                        <div className="form-element ">
                            <NavLink to="/mi_cuenta">
                                <button>
                                    Registro
                                </button>
                            </NavLink>

                        </div>
                    </div>


                    <div className={sidebar ? 'tab-body' : 'tab-body active'}>
                        <div className="form-element">
                            <i className="fas fa-envelope icon"></i>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-element">
                            <i className="fas fa-key icon"></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error && <div className="txt-error">{error}</div>}
                        <div className="form-element">
                            {/* <NavLink to="/mi_cuenta"> */}
                            <button
                                onClick={
                                    clickLogin
                                }
                                value= {loading ? "Loading..." : "Login"} >
                                Iniciar como admin
                            </button>
                            <NavLink to="user/mis_cursos">
                                <button>
                                    Iniciar con Docente
                                </button>

                            </NavLink>

                            {/* </NavLink> */}



                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}