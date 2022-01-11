import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './Login.css'
import { axios } from '../helpers/axios'

import Imagen1 from '../assets/images/Logo_info.png'
import Imagen2 from '../assets/images/Logo_unsaac.png'

export default function Login() {

    const [dominio, setdominio] = useState('@gmail.com')
    const [email, setEmail] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [view, setView] = useState(false);
    const [error, setError] = useState(false);

    const [docentes, setDocentes] = useState(null)

    const changeView = () => setView(!view);


    // guardar en local storage
    const setLocalStorageUser = value => {
        try {
            // setSaveEmail(value)
            localStorage.setItem('user', value)
        } catch (e) { console.log(e) }
    }
    const fetchApi = async () => {
        const response = await fetch('https://testunsaac.herokuapp.com/api/docentes')
        // console.log(response.statusText)
        const responseJSON = await response.json()
        setDocentes(responseJSON.docentes)
        // console.log(responseJSON.docentes)
    }
    useEffect(() => {
        fetchApi()
    }, [])


    let navigate = useNavigate()
    let api = axios()
    let url = 'https://testunsaac.herokuapp.com/api/login'


    const devolverDominio = (event) => {
        console.log("cambiodominio")
        console.log(event.target.value)
        return setdominio(event.target.value)
        
    }
    let data = {
        email: email + dominio,
        contrasenia: contrasenia

    }

    const clickLogin = (e) => {
        console.log("enviando: ", data)
        e.preventDefault()
        setError(false)
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                // setDataLogin(data.menu)
                console.log("sucess >>> ", data)
                console.log("data >>> ", data.menu[1].submenu)
                // setLocalStorage(email+'@gmail.com')

                console.log("es admmin: ", esAdmin())
                if (esAdmin()) {
                    navigate("/admin/perfil")
                }
                else { navigate("/user/perfil") }
            })
            .catch(error => (
                console.log(error),
                setError(true)
            ))
    }

    const esAdmin = () => {
        ////////
        // console.log(emailCorrecto)
        for (var i = 0; i < docentes.length; i++) {
            console.log(data.email, "==", docentes[i].email)
            if (data.email == docentes[i].email) {
                setLocalStorageUser(JSON.stringify(docentes[i]))
                if (docentes[i].esAdmin) { return true }
                break
            }
        }
        return false
    }


    return (
        <div className='contenedor-general'>
            <div className="contenedor-log-reg">
                {/* cabecera dinamica */}
                <div className="tab-header">
                    <div onClick={changeView} className={view ? '' : 'active'}>Inicio</div>
                    <div onClick={changeView} className={view ? 'active' : ''}>Registro</div>
                </div>

                <div className="tab-imagenes">
                    <img src={Imagen1} alt="..." />
                    <img src={Imagen2} alt="..." />
                </div>

                {/* <img class="img-responsive" src={Imagen1} alt="Chania" width="120" height="120" /> */}


                <div className="tab-content">
                    <div className={view ? 'tab-body' : 'active'}>

                        <form action="">
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Email</label>
                                <div className="form-group row">
                                    <div className="col-sm-5">
                                        <input name="email" onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="inputPassword" placeholder="Enter email" autoFocus />
                                    </div>
                                    {/* <label for="inputPassword" class="col-sm-1 col-form-label">Password</label> */}
                                    <div className="form-group col-md-7">
                                        <select id="inputState" className="form-select" onChange={(e) => {devolverDominio(e)}} >
                                            <option value="@gmail.com.pe">@gmail.com</option>
                                            <option value="@unsaac.edu.pe">@unsaac.edu</option>
                                            <option>...</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="formGroupExampleInput2">Password</label>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <input name="contrasenia" onChange={(e) => setContrasenia(e.target.value)} type="email" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group form-check mt-3 mb-1">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>

                            {error && <p className="text-danger">Ocurrio un error !!!</p>}

                            <button className="pushable mt-4"
                                onClick={clickLogin}
                            >
                                <span className="front">
                                    Sign In
                                </span>

                            </button>
                        </form>
                    </div>
                    <div className={view ? 'active' : 'tab-body'}>
                        <div className="content">
                            <h1>2</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}