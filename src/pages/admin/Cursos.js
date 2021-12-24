import React, { useEffect, useState } from "react"

import './Cursos.css'

import { Button, Modal } from 'react-bootstrap'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const Modalv2 = ({ show, setShow, title, children }) => {

    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

const Horario = ({ horario, setHorario }) => {
    const [inicio, setInicio] = useState(new Date('January 1, 2000 00:00:00'))
    const [fin, setFin] = useState(new Date('January 1, 2000 00:00:00'))
    const [dia, setDia] = useState('Lunes')

    const agregarHorario = () => {
        setHorario([...horario, {
            dia: dia,
            horaInicio: `${addZero(inicio.getHours())}:${addZero(inicio.getMinutes())}`,
            horaFin: `${addZero(fin.getHours())}:${addZero(fin.getMinutes())}`
        }])
    }

    const selecionarDia = (event) => {
        setDia(event.target.value)
    }


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {
                horario.length > 0 ?
                    <table className="content-table">
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Inicio</th>
                                <th>Fin</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                horario.map((data) =>
                                    <tr key={horario.length}>
                                        <td>{data.dia}</td>
                                        <td>{data.horaInicio}</td>
                                        <td>{data.horaFin}</td>
                                        <td>
                                            <button type="button" > - </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    :
                    <></>
            }
            <select onChange={selecionarDia} >
                {
                    dias.map((dia) =>
                        <option value={dia}>{dia}</option>
                    )
                }
            </select>

            <TimePicker value={inicio} onChange={setInicio} />
            <TimePicker value={fin} onChange={setFin} />

            <button type="button" onClick={agregarHorario}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
            </button>
        </MuiPickersUtilsProvider>
    )
}
// 
export default function Cursos() {

    const url = 'https://testunsaac.herokuapp.com/api/cursos/'

    const [cursos, setcursos] = useState()
    const [selectedCourse, setSelectedCouse] = useState({})
    const [newCourse, setNewCourse] = useState(true)
    const [showModal, setShowModal] = useState(false)

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
        console.log(responseJSON)
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div className="main-cursos">
            <h1>Cursos</h1>
            <div className="">
                <button className="btn btn-success" onClick={() => {
                    setShowModal(!showModal)
                    setNewCourse(true)
                    setSelectedCouse({})
                    setHorario([])
                }}
                >Nuevo curso</button>

                <div className="table-responsive">
                    <table className="table">
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
                                                        setShowModal(!showModal)
                                                        setNewCourse(false)
                                                        setHorario(todo.horario)
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
                </div>

                <Modalv2 show={showModal} setShow={setShowModal} title={newCourse ? "Registra nuevo curso" : "Editar Curso"}>
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
                            <input type="text" name="tipo" className="form-control" value={selectedCourse.tipo} onChange={handleInputChange} />
                        </div>
                        <div className="col-12">
                            <label>Cant. Creditos</label>
                            <input type="text" name="creditos" className="form-control" value={selectedCourse.creditos} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Horario</label>

                            <Horario horario={horario} setHorario={setHorario} />

                        </div>
                        <div>
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

                        </div>
                    </form>
                </Modalv2 >
                {/* <Modal
          estado={showModal}
          cambiarEstado={setShowModal}
          titulo="Nuevo Curso"
        >
          <form className="row g-3">
            <div className="col-12">
              <label>Codigo</label>
              <input type="text" name="codigo" className="form-control" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.codigo} onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <label>Nombre</label>
              <input type="text" name="nombre" className="form-control" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.nombre} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label>Categoria</label>
              <input type="text" name="categoria" className="form-control" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.categoria} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label>Grupo</label>
              <input type="text" name="grupo" className="form-control" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.grupo} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label>Tipo</label>
              <input type="text" name="tipo" className="form-control" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.tipo} onChange={handleInputChange} />
            </div>
            <div className="col-12">
              <label>Cant. Creditos</label>
              <input type="text" name="creditos" className="form-control" value={isObjEmpty(selectedCourse) ? "" : selectedCourse.creditos} onChange={handleInputChange} />
            </div>
            <div>
              <label>Horario</label>
              <Horario horario={horario} setHorario={setHorario} />

            </div>
            <div>
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

            </div>
          </form>
        </Modal> */}


            </div>
        </div >
    )
}

function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}


