import React, { useEffect, useState } from "react"
import '../tabla_estilos.css'

export default function Docentes() {

    const url = 'https://testunsaac.herokuapp.com/api/docentes'

    const [docentes, setdocentes] = useState()

    const fetchApi = async () => {
        const response = await fetch(url)
        console.log(response.statusText)
        const responseJSON = await response.json()
        setdocentes(responseJSON)
        console.log(responseJSON)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <>
            <h1>Docentes</h1>

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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !docentes ? "cargando..." :
                                docentes["docentes"].map((docent,index) => (
                                    <tr key={docent._id}>       
                                        <td>{docent.codDocente}</td>
                                        <td>{docent.email}</td>
                                        <td>{docent.nombre}</td>
                                        <td>{docent.apellido}</td>
                                        {/* <td>{docent.sexo}</td> */}
                                        <td>{docent.categoria}</td>
                                        {/* <td>{docent.telefono}</td> */}
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}


