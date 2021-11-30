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
// import './Docentes.css'
import Modal from '../../components/Modal'


export default function Docentes() {

    const url = 'https://testunsaac.herokuapp.com/api/docentes/'
    const urla = 'https://testunsaac.herokuapp.com/api/docentes'

    const [docentes, setdocentes] = useState()
    const [consolaSeleccionada, setConsolaSeleccionada] = useState({})
    const [stateModalNuevo, setStateModalNuevo] = useState(false)
    const [stateModalEditar, setStateModalEditar] = useState(false)

    const fetchApi = async () => {
        const response = await fetch(url)
        // console.log(response.statusText)
        const responseJSON = await response.json()
        setdocentes(responseJSON)
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
                esAdmin: (consolaSeleccionada=="True"),
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
                            {/* <th>Apellido</th> */}
                            {/* <th>Sexo</th> */}
                            <th>Categoria</th>
                            {/* <th>EsAdmin</th> */}
                            <th>Telefono</th>
                            <th>Acciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !docentes ? "cargando..." :
                                docentes["docentes"].map((docent, index) => (
                                    <tr key={docent._id}>
                                        <td>{docent.codDocente}</td>
                                        <td>{docent.email}</td>
                                        {/* <td>{docent.contrasenia}</td> */}
                                        <td>{docent.nombre}</td>
                                        {/* <td>{docent.apellido}</td> */}
                                        {/* <td>{docent.sexo}</td> */}
                                        <td>{docent.categoria}</td>
                                        {/* <td>{docent.esAdmin.toString()}</td> */}
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
                        }

                    </tbody>
                </table>
            </div>




            <Modal
                estado={stateModalNuevo}
                cambiarEstado={setStateModalNuevo}
                titulo="Nuevo   "
            >
                <div className="Contenido">

                    <form action="">
                        <label>Cod Docente</label>
                        <input className="field" type="text" name="codDocente" autoComplete="off" onChange={handleInputChange} />
                        <label>Email</label>
                        <input className="field" type="text" name="email" autoComplete="off" onChange={handleInputChange} />
                        <label>Contraseña</label>
                        <input className="field" type="text" name="contrasenia" autoComplete="off" onChange={handleInputChange} />
                        <label>Nombre</label>
                        <input className="field" type="text" name="nombre" autoComplete="off" onChange={handleInputChange} />
                        <label>Apellido</label>
                        <input className="field" type="text" name="apellido" autoComplete="off" onChange={handleInputChange} />
                        <div className="form__grupo">
                            <label>Sexo</label>
                            <input className="field" type="text" name="sexo" autoComplete="off" onChange={handleInputChange} />
                            <label>Categoria</label>
                            <input className="field" type="text" name="categoria" autoComplete="off" onChange={handleInputChange} />
                            {/* <select id="inputState" className="form-control field" type="text" name="esAdmin" autoComplete="off" onChange={handleInputChange}>
                                <option selected>False</option>
                                <option>True</option>
                            </select> */}
                            <label>esadmin</label>
                            <input className="field" type="text" name="esAdmin" autoComplete="off" onChange={handleInputChange} />
                        </div>
                        <label>Telefono</label>
                        <input className="field" type="text" name="telefono" autoComplete="off" onChange={handleInputChange} />
                        <button
                            className="btn btn-success"
                            type="button"
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

                    <form action="">
                        <label>Cod Docente</label>
                        <input className="field" type="text" name="codDocente" autoComplete="off"
                            value={consolaSeleccionada.codDocente}
                            onChange={handleInputChange} />
                        <label>Email</label>
                        <input className="field" type="text" name="email" autoComplete="off"
                            value={consolaSeleccionada.email}
                            onChange={handleInputChange} />
                        {/* <label>Contraseña</label>
                        <input className="field" type="text" name="contrasenia" autoComplete="off"
                            onChange={handleInputChange} /> */}
                        <label>Nombre</label>
                        <input className="field" type="text" name="nombre" autoComplete="off"
                            value={consolaSeleccionada.nombre}
                            onChange={handleInputChange} />
                        <label>Apellido</label>
                        <input className="field" type="text" name="apellido" autoComplete="off"
                            value={consolaSeleccionada.apellido}
                            onChange={handleInputChange} />
                        <div className="form__grupo">
                            <label>Sexo</label>
                            <input className="field" type="text" name="sexo" autoComplete="off"
                                value={consolaSeleccionada.sexo}
                                onChange={handleInputChange} />
                            <label>Categoria</label>
                            <input className="field" type="text" name="categoria" autoComplete="off"
                                value={consolaSeleccionada.categoria}
                                onChange={handleInputChange} />
                            <label>Es Admin</label>
                            <input className="field" type="text" name="esAdmin" autoComplete="off"
                                value={consolaSeleccionada.esAdmin}
                                onChange={handleInputChange} />
                        </div>
                        <label>Telefono</label>
                        <input className="field" type="text" name="telefono" autoComplete="off"
                            value={consolaSeleccionada.telefono}
                            onChange={handleInputChange} />
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










