import React, { useEffect, useState } from "react"
import '../tabla_estilos.css'
import './Docentes.css'
import { fetchSinToken } from '../../helpers/fetch'
import Boton from '../../components/Boton'
import Modal from '../../components/Modal'

export default function Docentes() {

    // const url = 'https://testunsaac.herokuapp.com/api/docentes'

    // const [docentes, setdocentes] = useState()

    // const fetchApi = async () => {
    //     const response = await fetch(url)
    //     console.log(response.statusText)
    //     const responseJSON = await response.json()
    //     setdocentes(responseJSON)
    //     console.log(responseJSON)
    // }

    // useEffect(() => {
    //     fetchApi()
    // }, [])


    /* Recuperar json docentes*/
    const [docentes, setdocentes] = useState()
    useEffect(() => {
        console.log("useEffect")
        getDatos()
    }, [])

    function getDatos() {
        const docentes = fetchSinToken("docentes", null, "GET")
        docentes.then(res => { return res.json() })
            .then(res => {
                // console.log(res)
                setdocentes(res)
            })
    }




    const [estadoModal1, cambiarEstadoModal1] = useState(false);

    return (
        <>
            {/* <h1>Docentes</h1> */}
            {
                console.log(docentes)
            }
            <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}
                color="#28a746"
                texto="Agregar Docente"
            />
            {
                <br />
            }
            <div className="tabla-div">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            {/* <th>Sexo</th> */}
                            <th>Categoria</th>
                            {/* <th>Telefono</th> */}
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
                                        <td>{docent.nombre}</td>
                                        <td>{docent.apellido}</td>
                                        {/* <td>{docent.sexo}</td> */}
                                        <td>{docent.categoria}</td>
                                        {/* <td>{docent.telefono}</td> */}

                                        <td>
                                            <Boton
                                                color="#0079f4"
                                                texto="Editar"
                                            />
                                        </td>

                                        <td>
                                            <Boton
                                                color="#da3746"
                                                texto="Eliminar"
                                            />
                                        </td>
                                    </tr>
                                ))
                        }

                    </tbody>
                </table>
            </div>






            {/* modal */}
            <Modal
                estado={estadoModal1}
                cambiarEstado={cambiarEstadoModal1}
                titulo="Formulario"
            >
                <div className="Contenido">
                    {/* <h1>Ventana Modal</h1> */}
                    {/* <p>Reutilizable y con opciones de personalización.</p> */}
                    {/* <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}
                        texto="aceptar"
                        color="#28a746"      
                    /> */}

                    <form action="">
                        <p>Codigo</p>
                        <input className="field" type="search" name="codigo" /> <br />
                        <p>Email</p>
                        <input className="field" type="search" name="email" /><br />
                        <p>Nombre</p>
                        <input className="field" type="search" name="nombre" /> <br />
                        <p>Apellido</p>
                        <input className="field" type="search" name="apellido" /> <br />
                        <p>Sexo</p>
                        <input className="field" type="search" name="sexo" /> <br />
                        <p>Categoria</p>
                        <input className="field" type="search" name="codigo" /> <br />
                        <p>Telefono</p>
                        <input className="field" type="search" name="telefono" /> <br />

                        <div className="btn_form">
                            <Boton
                                texto="Agregar"
                                color="#28a746"
                            />
                            <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}
                                texto="Cerrar"
                                color="#da3746"
                            />
                        </div>
                    </form>

                </div>
            </Modal>

        </>
    )
}


