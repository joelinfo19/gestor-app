import React, { useEffect, useState } from "react"
import { Dropdown } from "react-bootstrap"
import './Cursos.css'

import { Button, Modal } from 'react-bootstrap'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import CSVCursos from "../../components/CSVCursos"
import MiniHorario from "../../components/MiniHorario"
import Spinner from "../../components/Spinner"

const Modalv2 = ({ show, setShow, title, children, guardar = null, buttons = true }) => {

  const handleClose = () => {
    setShow(false)
  }
  const handleSave = () => {
    guardar()
    setShow(false)
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        {
          buttons ?
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
            :
            null
        }
      </Modal>
    </>
  )
}


const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

const Horario = ({ horario, setHorario }) => {
  const [inicio, setInicio] = useState(new Date('January 1, 2000 00:00:00'))
  const [fin, setFin] = useState(new Date('January 1, 2000 00:00:00'))
  const [dia, setDia] = useState('Lunes')
  const [mapHorario, setMapHorario] = useState(horario)

  const agregarHorario = () => {
    setHorario([...horario, {
      dia: dia,
      horaInicio: `${addZero(inicio.getHours())}:${addZero(inicio.getMinutes())}`,
      horaFin: `${addZero(fin.getHours())}:${addZero(fin.getMinutes())}`
    }])

  }
  const eliminarHorario = (index) => {
    const newHorario = horario.filter((hora, i) =>
      index != i ? hora : null
    )
    setHorario(newHorario)
  }
  // console.log(mapHorario)
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="rounded-3 border border-secondary p-2">

        <div className="container">
          <div className="row">
            <div className="col-6 p-0">
              <Dropdown>
                <Dropdown.Toggle className="w-100" variant="success" id="dropdown-basic">
                  {dia}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    dias.map((dia, i) =>
                      <Dropdown.Item key={i} onClick={() => setDia(dia)}>{dia}</Dropdown.Item>
                    )
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="d-flex col-5">

              <TimePicker value={inicio} onChange={setInicio} />
              <TimePicker value={fin} onChange={setFin} />
            </div>
            <div className="col-1">
              <button type="button" onClick={() => agregarHorario()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {
          horario.length > 0 ?


            <table className="table  ">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>*</th>
                </tr>
              </thead>
              <tbody>
                {
                  horario.map((data, i) =>
                    <tr key={i}>
                      <td>{data.dia}</td>
                      <td>{data.horaInicio}</td>
                      <td>{data.horaFin}</td>
                      <td>
                        <button onClick={() => eliminarHorario(i)} type="button" className="btn btn-outline-danger" >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            :
            <></>

        }
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default function Cursos() {

  const url = 'https://testunsaac.herokuapp.com/api/cursos/'

  const [cursos, setcursos] = useState()
  const [selectedCourse, setSelectedCouse] = useState({})
  const [newCourse, setNewCourse] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showModalCSV, setShowModalCSV] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [horario, setHorario] = useState([])

  const handleInputChange = (event) => {
    setSelectedCouse({
      ...selectedCourse,
      [event.target.name]: event.target.value
    })
  }


  const insertarNuevoCurso = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        codigo: selectedCourse.codigo,
        nombre: selectedCourse.nombre,
        categoria: selectedCourse.categoria,
        grupo: selectedCourse.grupo,
        tipo: selectedCourse.tipo,
        creditos: Number(selectedCourse.creditos),
        horario: horario //[{ dia: 'Lunes', horaInicio: '9:00', horaFin: '11:00' }]//newCourse.horario
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        fetchApi()
        setShowModal(!showModal)
        setNewCourse(true)
        setSelectedCouse({})
        console.log(data)
      })
      .catch(error => console.log(error))
  }
  const editarCurso = (id) => {
    delete selectedCourse._id
    // console.log(selectedCourse)
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
        horario: horario
      })
    })
      .then(response => response.json())
      .then(data => {
        fetchApi()
        setShowModal(!showModal)
        setNewCourse(true)
        setSelectedCouse({})
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
    // console.log(responseJSON)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <div className="main-cursos">
        <div className="container">
          <h1>Cursos</h1>
          <div className="d-flex w-100">
            <div className="w-75">
              <input type="text" onChange={(event) => setSearchTerm(event.target.value)} className="form-control" placeholder="Buscar curso..." />
            </div>
            <div className="btn-group w-25">
              <button className="btn btn-outline-secondary w-100 ms-1" onClick={() => {
                setShowModal(!showModal)
                setNewCourse(true)
                setSelectedCouse({})
                setHorario([])
              }}
              >Nuevo curso</button>
              <button className="w-25 btn btn-success" type="button" onClick={() => setShowModalCSV(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="table-responsive">
            {
              !cursos
                ?
                <Spinner marginTop={5} />
                :
                <table className="table">
                  <thead>
                    <tr>
                      <th>CÓDIGO</th>
                      <th>NOMBRE</th>
                      <th>CAT.</th>
                      <th>GRUPO</th>
                      <th>TIPO</th>
                      <th>CR.</th>
                      <th>HORARIO</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      cursos &&
                      cursos.filter((curso) =>
                        searchTerm === ''
                          ?
                          curso
                          :
                          curso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                            ?
                            curso
                            :
                            null
                      )
                        .map((todo) => {
                          return (
                            <tr key={todo._id}>
                              <td>{todo.codigo}</td>
                              <td>{todo.nombre}</td>
                              <td>{todo.categoria}</td>
                              <td>{todo.grupo}</td>
                              <td>{todo.tipo}</td>
                              <td>{todo.creditos}</td>
                              <td>
                                <MiniHorario horario={todo.horario} />
                              </td>
                              <td>
                                <button className="btn btn-primary" onClick={() => {
                                  setSelectedCouse(todo)
                                  setShowModal(!showModal)
                                  setNewCourse(false)
                                  setHorario(todo.horario)
                                }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                  </svg>
                                </button>
                              </td>
                              <td>
                                <button className="btn btn-danger" onClick={() => eliminarCurso(todo._id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>)
                        })
                    }
                  </tbody>
                </table>
            }
          </div>

          <Modalv2
            show={showModal}
            setShow={setShowModal}
            title={newCourse ? "Registra nuevo curso" : "Editar Curso"}
            guardar={() => {
              newCourse ?
                //Nuevo curso
                insertarNuevoCurso()
                //console.log("nuevo curso", newCourse)
                :
                //Editando curso
                editarCurso(selectedCourse._id)
              //console.log("editando", newCourse)
            }}
          >
            <form className="row g-3">
              <div className="col-12">
                <label>Codigo</label>
                <input type="text" name="codigo" className="form-control" value={selectedCourse.codigo} onChange={handleInputChange} />
              </div>
              <div className="col-12">
                <label>Nombre</label>
                <input type="text" name="nombre" className="form-control" value={selectedCourse.nombre} onChange={handleInputChange} />
              </div>
              <div className="col-md-4">
                <label>Categoria</label>
                <input type="text" name="categoria" className="form-control" value={selectedCourse.categoria} onChange={handleInputChange} />
              </div>
              <div className="col-md-4">
                <label>Grupo</label>
                <input type="text" name="grupo" className="form-control" value={selectedCourse.grupo} onChange={handleInputChange} />
              </div>
              <div className="col-md-4">
                <label>Tipo</label>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {selectedCourse.tipo}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedCouse({ ...selectedCourse, tipo: "TEÓRICO" })} >TEÓRICO</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedCouse({ ...selectedCourse, tipo: "PRÁCTICO" })} >PRÁCTICO</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <input type="text" name="tipo" className="form-control" value={selectedCourse.tipo} onChange={handleInputChange} /> */}
              </div>
              <div className="col-12">
                <label>Cant. Creditos</label>
                <input type="number" name="creditos" className="form-control" value={selectedCourse.creditos} onChange={handleInputChange} />
              </div>
              <div>
                <label>Asignar horario</label>

                <Horario horario={horario} setHorario={setHorario} />

              </div>
              {/* <div>
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
                }
                }
              >Guardar</button>
            </div> */}
            </form>
          </Modalv2 >

          <Modalv2
            show={showModalCSV}
            setShow={setShowModalCSV}
            title={"Importar cursos"}
            buttons={false}
          >
            <CSVCursos />
          </Modalv2>
        </div>
      </div >


    </>
  )
}

function addZero(i) {
  if (i < 10) { i = "0" + i }
  return i;
}


