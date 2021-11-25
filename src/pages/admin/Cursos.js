import React, { useEffect, useState } from "react"
import '../tabla_estilos.css'
import './Cursos.css'
import Modal from '../../components/Modal'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react"

export default function Cursos() {

  const url = 'https://testunsaac.herokuapp.com/api/cursos/'

  const [cursos, setcursos] = useState()
  const [selectedCourse, setSelectedCouse] = useState({})
  const [newCourse, setNewCourse] = useState(true)
  const [stateModal, setStateModal] = useState(false)

  const handleInputChange = (event) => {
    setSelectedCouse({
      ...selectedCourse,
      [event.target.name]: event.target.value
    })
    console.log(selectedCourse)
  }

  const insertarNuevoCurso = () => {
    console.log(selectedCourse)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        codigo: selectedCourse.codigo,
        nombre: selectedCourse.nombre,
        categoria: selectedCourse.categoria,
        grupo: selectedCourse.grupo,
        tipo: selectedCourse.tipo,
        creditos: Number(selectedCourse.creditos),
        horario: [{ dia: 'Lunes', horaInicio: '9:00', horaFin: '11:00' }]//newCourse.horario
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        fetchApi()
        setStateModal(!stateModal)
        setNewCourse(true)
        console.log(data)
      })
      .catch(error => console.log(error))
  }
  const editarCurso = (id) => {
    delete selectedCourse._id
    console.log(selectedCourse)
    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        codigo: selectedCourse.codigo,
        nombre: selectedCourse.nombre,
        categoria: selectedCourse.categoria,
        grupo: selectedCourse.grupo,
        tipo: selectedCourse.tipo,
        creditos: Number(selectedCourse.creditos),
        horario: selectedCourse.horario
      })
    })
      .then(response => response.json())
      .then(data => {
        fetchApi()
        setStateModal(!stateModal)
        setNewCourse(true)
        console.log("Curso Editado", data)
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
        <button className="btn btn-success" onClick={() => {
          setStateModal(!stateModal)
        }}
        >Nuevo curso</button>
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
              <th>Acciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              !cursos ? "cargando..." :
                cursos.map((todo) => {
                  return (
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
                        <button className="btn btn-primary" onClick={() => {
                          setSelectedCouse(todo)
                          setStateModal(!stateModal)
                          setNewCourse(false)
                        }}>
                          Editar
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => eliminarCurso(todo._id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>)
                })
            }
          </tbody>
        </table>
        <Modal
          estado={stateModal}
          cambiarEstado={setStateModal}
          titulo="Nuevo Curso"
        >
          <form>
            <div className="form-element">
              <label>Codigo</label>
              <input type="text" name="codigo" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.codigo} onChange={handleInputChange} />
            </div>
            <div className="form-element">
              <label>Nombre</label>
              <input type="text" name="nombre" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.nombre} onChange={handleInputChange} />
            </div>
            <div className="form-element">
              <label>Categoria</label>
              <input type="text" name="categoria" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.categoria} onChange={handleInputChange} />
            </div>
            <div className="form-element">
              <label>Grupo</label>
              <input type="text" name="grupo" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.grupo} onChange={handleInputChange} />
            </div>
            <div className="form-element">
              <label>Tipo</label>
              <input type="text" name="tipo" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.tipo} onChange={handleInputChange} />
            </div>
            <div className="form-element">
              <label>Cant. Creditos</label>
              <input type="text" name="creditos" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.creditos} onChange={handleInputChange} />
            </div>
            <button
              className="btn btn-success"
              type="button"
              
              onClick={() => {

                newCourse ?
                  //Nuevo curso
                  insertarNuevoCurso()
                  
                  //console.log("nuevo curso", newCourse)
                  :
                  //Editando curso
                  editarCurso(selectedCourse._id)
                  //console.log("editando", newCourse)

              }}
            >Guardar</button>
          </form>
        </Modal>

      </div>

    </>
  )
}

function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}