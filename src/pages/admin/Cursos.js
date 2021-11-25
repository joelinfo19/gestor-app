import React, { useEffect, useState } from "react"
import '../tabla_estilos.css'
import './Cursos.css'

export default function Cursos() {

  const url = 'https://testunsaac.herokuapp.com/api/cursos/'

  const [cursos, setcursos] = useState()
  const [selectedCourse, setSelectedCouse] = useState({})
  const [newCourse, setNewCourse] = useState({})

  const handleInputChange = (event) => {
    setNewCourse({
      ...newCourse,
      [event.target.name]: event.target.value
    })
    console.log(newCourse)
  }

  const insertarNuevoCurso = () => {
    console.log(newCourse)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        codigo: newCourse.codigo,
        nombre: newCourse.nombre,
        categoria: newCourse.categoria,
        grupo: newCourse.grupo,
        tipo: newCourse.tipo,
        creditos: Number(newCourse.creditos),
        horario: [{ dia: 'Lunes', horaInicio: '9:00', horaFin: '11:00' }]//newCourse.horario
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        fetchApi()
        console.log(data)
      })
      .catch(error => console.log(error))
  }
  const editarCurso = (id) => {
    fetch(url + id, {
      body: JSON.stringify(selectedCourse),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        fetchApi()
        console.log(data)
      })
      .catch(error => console.log(error))
  }
  const eliminarCurso = (id) => {
    fetch(url + id, {
      method: 'DELETE'
    })
      .then(res => fetchApi())
      .then(res => console.log(res))
  }
  const fetchApi = async () => {
    const response = await fetch(url)
    // console.log(response.statusText)
    const responseJSON = await response.json()
    setcursos(responseJSON)
    console.log(responseJSON)
  }

  useEffect(() => {
    fetchApi()
  }, [])


  return (
    <>
      <h1>Cursos</h1>

      <div className="tabla-div">
        <button>Nuevo curso</button>
        <table className="content-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Grupo</th>
              <th>Tipo</th>
              <th>Creditos</th>
              <th>Horario</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              !cursos ? "cargando..." :
                cursos.map((todo, index) => (
                  <tr key={todo._id}>
                    <td>{todo.codigo}</td>
                    <td>{todo.nombre}</td>
                    <td>{todo.categoria}</td>
                    <td>{todo.grupo}</td>
                    <td>{todo.tipo}</td>
                    <td>{todo.creditos}</td>
                    <td>
                      {
                        todo.horario.map(hora => (
                          <div key={hora._id}>
                            <span>{hora.dia} </span>
                            <span>{hora.horaInicio} </span>
                            <span>{hora.horaFin} </span>
                          </div>
                        ))
                      }
                    </td>
                    <td>
                      <button onClick={() => setSelectedCouse(todo)}>
                        Editar
                      </button>
                      <button onClick={() => eliminarCurso(todo._id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>

        <form>
          <div className="form-element">
            <label>Codigo</label>
            <input type="text" name="codigo" onChange={handleInputChange} />
          </div>
          <div className="form-element">
            <label>Nombre</label>
            <input type="text" name="nombre" onChange={handleInputChange} />
          </div>
          <div className="form-element">
            <label>Categoria</label>
            <input type="text" name="categoria" onChange={handleInputChange} />
          </div>
          <div className="form-element">
            <label>Grupo</label>
            <input type="text" name="grupo" onChange={handleInputChange} />
          </div>
          <div className="form-element">
            <label>Tipo</label>
            <input type="text" name="tipo" onChange={handleInputChange} />
          </div>
          <div className="form-element">
            <label>Cant. Creditos</label>
            <input type="text" name="creditos" onChange={handleInputChange} />
          </div>
          <button type="button" onClick={insertarNuevoCurso}>Guardar</button>
        </form>
      </div>

    </>
  )
}

