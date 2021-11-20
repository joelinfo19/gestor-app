import React, { useEffect, useState } from "react"
import '../tabla_estilos.css'

export default function Cursos() {

    const url = 'https://testunsaac.herokuapp.com/api/cursos'

    const [cursos, setcursos] = useState()

    const fetchApi = async () => {
        const response = await fetch(url)
        console.log(response.statusText)
        const responseJSON = await response.json()
        setcursos(responseJSON)
        // console.log(responseJSON)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <>
            <h1>Cursos</h1>
            
            <div className="tabla-div">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Grupo</th>
                            <th>Creditos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !cursos ? "cargando..." :
                                cursos.map((todo,index) => (
                                    <tr key={todo._id}>       
                                        <td>{todo.codigo}</td>
                                        <td>{todo.nombre}</td>
                                        <td>{todo.categoria}</td>
                                        <td>{todo.grupo}</td>
                                        <td>{todo.creditos}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}


