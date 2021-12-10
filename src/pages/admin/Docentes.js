// codDocente: consolaSeleccionada.codDocente,
// email: consolaSeleccionada.email,
// contrasenia: consolaSeleccionada.contrasenia,
// nombre: consolaSeleccionada.nombre,
// apellido: consolaSeleccionada.apellido,
// sexo: consolaSeleccionada.sexo,
// categoria: consolaSeleccionada.categoria,
// esAdmin: consolaSeleccionada.esAdmin,
// telefono: consolaSeleccionada.telefono,


import React, { useEffect, useState } from "react"
import '../tabla_estilos.css'
import './Docentes.css'
import Modal from '../../components/Modal'


export default function Docentes() {

    const url = 'https://testunsaac.herokuapp.com/api/docentes/'

    const [docentes, setdocentes] = useState()
    const [consolaSeleccionada, setConsolaSeleccionada] = useState({})
    const [stateModalNuevo, setStateModalNuevo] = useState(false)
    const [stateModalEditar, setStateModalEditar] = useState(false)
    const [searchTerm, setSearchTerm]= useState("")

    const fetchApi = async () => {
        const response = await fetch(url)
        // console.log(response.statusText)
        const responseJSON = await response.json()
        setdocentes(responseJSON["docentes"])
        // console.log(responseJSON)
    }
    useEffect(() => {
        fetchApi()
    }, [])






    const handleInputChange = (event) => {
        setConsolaSeleccionada({
            ...consolaSeleccionada,
            [event.target.name]: event.target.value
        })
        console.log(consolaSeleccionada)
    }


    /* metodos crud */
    const insertarNuevoDocente = () => {
        console.log("----insertar vista inputs")
        console.log(consolaSeleccionada)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                _id: consolaSeleccionada._id,
                codDocente: consolaSeleccionada.codDocente,
                email: consolaSeleccionada.email,
                contrasenia: consolaSeleccionada.contrasenia,
                nombre: consolaSeleccionada.nombre,
                apellido: consolaSeleccionada.apellido,
                sexo: consolaSeleccionada.sexo,
                categoria: consolaSeleccionada.categoria,
                esAdmin: (consolaSeleccionada.esAdmin == "True"),
                telefono: consolaSeleccionada.telefono,
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                fetchApi()
                setStateModalNuevo(!stateModalNuevo)
                // console.log("----vista datos..")
                // console.log(data)
            })
            .catch(error => console.log(error))
    }

    const editarDocente = (id) => {
        delete consolaSeleccionada._id
        console.log(consolaSeleccionada)
        fetch(url + id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                codDocente: consolaSeleccionada.codDocente,
                email: consolaSeleccionada.email,
                contrasenia: consolaSeleccionada.contrasenia,
                nombre: consolaSeleccionada.nombre,
                apellido: consolaSeleccionada.apellido,
                sexo: consolaSeleccionada.sexo,
                categoria: consolaSeleccionada.categoria,
                esAdmin: consolaSeleccionada.esAdmin,
                telefono: consolaSeleccionada.telefono,
            })
        })
            .then(response => response.json())
            .then(data => {
                fetchApi()
                setStateModalEditar(!stateModalEditar)
                console.log("Curso Editado", data)
            })
            .catch(error => console.log(error))
    }

    const eliminarDocente = (id) => {
        fetch(url + id, {
            method: 'DELETE'
        })
            .then(res => fetchApi())
            .then(res => console.log(res))
    }
    
    return (
        <>
            {/* <h1>Docentes</h1> */}
            <input 
                type="text"
                placeholder="search..."
                onChange={(event)=>{
                    setSearchTerm(event.target.value)
                }}
            />
            {
                // console.log(docentes)
            }
            <button className="btn btn-success" onClick={() => {
                setStateModalNuevo(!stateModalNuevo)
                setConsolaSeleccionada({})
            }}>
                Nuevo docente
            </button>
            <div className="tabla-div">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Email</th>
                            {/* <th>Contraseña</th> */}
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Sexo</th>
                            <th>Categoria</th>
                            <th>EsAdmin</th>
                            <th>Telefono</th>
                            <th>Acciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            // search(
                                !docentes ? "cargando..." :
                                docentes.filter((val)=>{
                                    if (searchTerm==""){
                                        return val
                                    } else if (val.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val
                                    }
                                }).map((docent, index) => (
                                    <tr key={docent._id}>
                                        <td>{docent.codDocente}</td>
                                        <td>{docent.email}</td>
                                        {/* <td>{docent.contrasenia}</td> */}
                                        <td>{docent.nombre}</td>
                                        <td>{docent.apellido}</td>
                                        <td>{docent.sexo}</td>
                                        <td>{docent.categoria}</td>
                                        <td>{docent.esAdmin.toString()}</td>
                                        <td>{docent.telefono}</td>

                                        <td>
                                            <button className="btn btn-primary" onClick={
                                                () => {
                                                    setStateModalEditar(!stateModalEditar)
                                                    setConsolaSeleccionada(docent)

                                                }} >
                                                Editar
                                            </button>
                                        </td>

                                        <td>
                                            <button className="btn btn-danger" onClick={() => eliminarDocente(docent._id)} >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                
                            // )
                        }

                    </tbody>
                </table>
            </div>




            <Modal
                estado={stateModalNuevo}
                cambiarEstado={setStateModalNuevo}
                titulo="Nuevo"
            >
                <div className="Contenido">
                    <form >
                        <div className="form__grupo">
                            <div className="item1">
                                <label>Id docente</label>
                                <input
                                    className="field"
                                    type="search"
                                    name="codDocente"
                                    autoComplete="off"
                                    onChange={handleInputChange} required />
                            </div>
                            <div className="item2">
                                <label>Email</label>
                                <input
                                    className="field"
                                    type="search"
                                    name="email"
                                    autoComplete="off"
                                    onChange={handleInputChange} required />
                            </div>
                        </div>
                        <label>Contraseña</label>
                        <input
                            className="field"
                            type="search"
                            name="contrasenia"
                            autoComplete="off"
                            onChange={handleInputChange} required />
                        <label>Nombre</label>
                        <input
                            className="field"
                            type="search"
                            name="nombre"
                            autoComplete="off"
                            onChange={handleInputChange} required />
                        <label>Apellido</label>
                        <input
                            className="field"
                            type="search"
                            name="apellido"
                            autoComplete="off"
                            onChange={handleInputChange} required />
                        <div className="form__grupo">
                            <div className="item1">
                                <label>Sexo</label>
                                {/* <input
                                    className="field"
                                    type="search"
                                    name="sexo"
                                    autoComplete="off"
                                    onChange={handleInputChange} required /> */}
                                <select className="field" name="sexo" onChange={handleInputChange}>
                                    <option value='otro'>Otro</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="item1">
                                <label>Categoria</label>
                                {/* <input 
                                    className="field" 
                                    type="search" 
                                    name="categoria" 
                                    autoComplete="off" 
                                    onChange={handleInputChange} required /> */}
                                <select className="field" name="categoria" onChange={handleInputChange}>
                                    <option value=''>...elige</option>
                                    <option value="Nombrado">Nombrado</option>
                                    <option value="Contratado">Contratado</option>
                                </select>
                            </div>
                            {/* <select id="inputState" className="form-control field" type="search" name="esAdmin" autoComplete="off" onChange={handleInputChange}>
                                <option selected>False</option>
                                <option>True</option>
                            </select> */}
                            <div className="item">
                                <label>esadmin</label>
                                {/* <input
                                    className="field"
                                    type="search"
                                    name="esAdmin"
                                    autoComplete="off"
                                    onChange={handleInputChange} required /> */}
                                <select className="field" name="esAdmin" onChange={handleInputChange}>
                                    <option value="False">No</option>
                                    <option value="True">Si</option>
                                </select>
                            </div>
                        </div>
                        <label>Telefono</label>
                        <input
                            className="field"
                            type="search"
                            name="telefono"
                            autoComplete="off"
                            onChange={handleInputChange} required />
                        <button
                            className="btn btn-success"
                            type="button"
                            // value="Submit"
                            // onClick={() => {
                            //     insertarNuevoDocente()
                            //     setConsolaSeleccionada({})
                            // }}
                            onClick={() => {
                                insertarNuevoDocente()
                                setConsolaSeleccionada({})
                            }}
                        >Guardar Docente</button>
                    </form>
                </div>
            </Modal>


            <Modal
                estado={stateModalEditar}
                cambiarEstado={setStateModalEditar}
                titulo="Editar"
            >
                <div className="Contenido">

                <form >
                        <div className="form__grupo">
                            <div className="item1">
                                <label>Id docente</label>
                                <input
                                    className="field"
                                    type="search"
                                    name="codDocente"
                                    autoComplete="off"
                                    value={consolaSeleccionada.codDocente} required onChange={handleInputChange}/>
                            </div>
                            <div className="item2">
                                <label>Email</label>
                                <input
                                    className="field"
                                    type="search"
                                    name="email"
                                    autoComplete="off"
                                    value={consolaSeleccionada.email} required onChange={handleInputChange}/>
                            </div>
                        </div>
                        <label>Contraseña</label>
                        <input
                            className="field"
                            type="search"
                            name="contrasenia"
                            autoComplete="off"
                            value={consolaSeleccionada.contrasenia} required onChange={handleInputChange}/>
                        <label>Nombre</label>
                        <input
                            className="field"
                            type="search"
                            name="nombre"
                            autoComplete="off"
                            value={consolaSeleccionada.nombre} required onChange={handleInputChange}/>
                        <label>Apellido</label>
                        <input
                            className="field"
                            type="search"
                            name="apellido"
                            autoComplete="off"
                            value={consolaSeleccionada.apellido} required onChange={handleInputChange}/>
                        <div className="form__grupo">
                            <div className="item1">
                                <label>Sexo</label>
                                {/* <input
                                    className="field"
                                    type="search"
                                    name="sexo"
                                    autoComplete="off"
                                    value={consolaSeleccionada} required onChange={handleInputChange}/> */}
                                <select className="field" name="sexo" value={consolaSeleccionada.sexo} onChange={handleInputChange}>
                                    <option value='otro'>Otro</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="item1">
                                <label>Categoria</label>
                                {/* <input 
                                    className="field" 
                                    type="search" 
                                    name="categoria" 
                                    autoComplete="off" 
                                    value={consolaSeleccionada} required onChange={handleInputChange}/> */}
                                <select className="field" name="categoria" value={consolaSeleccionada.categoria} onChange={handleInputChange}>
                                    <option value=''>...elige</option>
                                    <option value="Nombrado">Nombrado</option>
                                    <option value="Contratado">Contratado</option>
                                </select>
                            </div>
                            {/* <select id="inputState" className="form-control field" type="search" name="esAdmin" autoComplete="off" value={consolaSeleccionada}>
                                <option selected>False</option>
                                <option>True</option>
                            </select> */}
                            <div className="item">
                                <label>esadmin</label>
                                {/* <input
                                    className="field"
                                    type="search"
                                    name="esAdmin"
                                    autoComplete="off"
                                    value={consolaSeleccionada} required onChange={handleInputChange}/> */}
                                <select className="field" name="esAdmin" value={consolaSeleccionada.esAdmin} onChange={handleInputChange}>
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </select>
                            </div>
                        </div>
                        <label>Telefono</label>
                        <input
                            className="field"
                            type="search"
                            name="telefono"
                            autoComplete="off"
                            value={consolaSeleccionada.telefono} required 
                            onChange={handleInputChange}/>
                    
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={() => {
                                editarDocente(consolaSeleccionada._id)
                            }}
                        >Editar Docente</button>
                    </form>
                </div>
            </Modal>

        </>
    )
}










