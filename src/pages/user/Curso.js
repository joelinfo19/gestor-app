import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Modalv2 from '../../components/Modalv2'
import { Button, Tabs, Tab, Row, Col, Nav } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { FormControlLabel } from '@material-ui/core'
import { Asistencia } from './Asistencia'
import { HistorialAsistencia } from './HistorialAsistencia'
import MiniHorario from '../../components/MiniHorario'

const url = 'https://testunsaac.herokuapp.com/api'

export default function Curso() {

  const { courseId } = useParams()

  const [file, setFile] = useState()
  const [filename, setFilename] = useState('default')
  const [urlPdf, setUrlPdf] = useState('default')

  const [matricula, setMatricula] = useState({})
  const [curso, setCurso] = useState({})

  const [indice, setIndice] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [showModalAsistencia, setShowModalAsistencia] = useState(false)
  const [showModalHistorial, setShowModalHistorial] = useState(false)
  const [contenido, setContenido] = useState(
    [
      {
        titulo: '',
        capitulos: [
          {
            titulo: '',
            temas: [
            ]
          }
        ]
      },
    ])

  useEffect(() => {
    fetch(`${url}/matriculas/${courseId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const { matriculas } = data
        setMatricula(matriculas)
        setCurso(matriculas.curso)
        // Recuperando los temas
        const newContenido = matriculas.contenido.map(unidad => {
          return {
            ...unidad, capitulos: unidad.capitulos.map(capitulo => {
              const newTemas = capitulo.temas.split('|')
              newTemas.pop()
              return { ...capitulo, temas: newTemas }
            })
          }
        })
        setContenido(newContenido)
      })
  }, [file, showModalAsistencia])

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    } else {
      setFile(undefined)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (file) {
      const formData = new FormData()
      formData.append('myFile', file)
      formData.append('myFile', filename)

      fetch(`${url}/upload/${courseId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // setMatricula({...matricula, silabus: filename})
          setFile(null)
          alert('Archivo subido!')
        })
        .catch(error => console.log("msg: ", error))
    }
    else {
      alert('seleccione un archivo')
    }
  }

  const getPdf = () => {
    fetch(`${url}/upload/${matricula.silabus}`, {
      method: 'GET',
      responseType: 'blob'
    })
      .then(data => {
        window.open(data.url)
      })
      .catch(err => console.log(err))
    // fetch('https://testunsaac.herokuapp.com/api/matriculas/', {
    // 	method: 'GET'
    // })
    // 	.then(res => res.json())
    // 	.then(data => {
    // 		const { matriculas } = data
    // 		const { silabus } = matriculas.find(matricula =>
    // 			matricula._id == courseId
    // 		)
    // 		setUrlPdf(silabus)
    // 		return silabus
    // 	})
    // 	.then(silabus => {
    // 		silabus
    // 			? fetch(url + silabus, {
    // 				method: 'GET',
    // 				responseType: 'blob'
    // 			})
    // 				.then(data => {
    // 					console.log({ data: data })
    // 					window.open(data.url)
    // 				})
    // 				.catch(err => console.log(err))

    // 			: alert("no tienes ningun pdf", urlPdf)
    // 	})

  }

  const handleOnChange = (event, iUnidad, iCapitulo) => {
    const { name, value } = event.target

    const num = name.match(/\d+/g)
    const letr = name.match(/[a-zA-Z]+/g)

    const newSetContenido = contenido.map((unidad, u) => {
      if (letr == 'unidad' && iUnidad == u) {
        unidad.titulo = value
      }
      const newCapitulos = unidad.capitulos.map((capitulo, c) => {
        if (iUnidad == u && iCapitulo == c) {
          //editar titulo del capitulo
          if (letr == "tema") {
            const newTemas = capitulo.temas.map((tema, it) =>
              num == it ?
                value
                :
                tema
            )
            return {
              titulo: capitulo.titulo,
              temas: newTemas
            }
          }
          if (letr == "cap") {
            return {
              ...capitulo,
              titulo: value,
            }
          }
        } else {
          return capitulo
        }
      })
      return { ...unidad, capitulos: newCapitulos }
    })

    setContenido(newSetContenido)
  }
  const agregarUnidad = () => {
    setContenido(oldArray => [...oldArray,
    {
      titulo: '',
      capitulos: [
        {
          titulo: '',
          temas: []
        }
      ]
    }])
  }
  const eliminarUnidad = (index) => {
    setContenido(contenido.filter((unidad, i) => i != index ? unidad : null))
    setIndice(Number(index) - 1)
  }
  const agregarCapitulo = (iUnidad) => {
    contenido[iUnidad].capitulos.push({ titulo: '', temas: [] })
    setContenido(contenido.map(unidad => unidad))
  }
  const eliminarCapitulo = (iUnidad, iCapitulo) => {
    const newContenido = contenido.map((unidad, u) => {
      if (iUnidad == u) {
        const newCapitulos = unidad.capitulos.filter((capitulo, c) => {
          if (iCapitulo != c) {
            return capitulo
          }
        })
        return { ...unidad, capitulos: newCapitulos }

      } else {
        return unidad
      }
    })
    setContenido(newContenido)
  }
  const eliminarTema = (iUnidad, iCapitulo, iTema) => {
    const newContenido = contenido.map((unidad, u) => {
      if (iUnidad == u) {
        const newCapitulos = unidad.capitulos.map((capitulo, c) => {
          if (iCapitulo == c) {
            const newTemas = capitulo.temas.filter((tema, i) => {
              if (iTema != i) {
                return tema
              }
            })
            return { ...capitulo, temas: newTemas }
          } else {
            return capitulo
          }
        })
        return { ...unidad, capitulos: newCapitulos }

      } else {
        return unidad
      }
    })
    setContenido(newContenido)
  }
  const agregarTema = (iUnidad, iCapitulo) => {

    const updatedObject = contenido.map((unidad, i) => {
      if (i == iUnidad) {
        const capitulosActualizados = unidad.capitulos.map((capitulo, index) => {
          if (index == iCapitulo) {
            return {
              titulo: capitulo.titulo,
              temas: [...capitulo.temas, '']
            }
          } else {
            return capitulo
          }
        })
        return { titulo: unidad.titulo, capitulos: capitulosActualizados }
      } else {
        return unidad
      }
    })
    setContenido(updatedObject)
  }
  const handleOnChangev2 = (event, iUnidad, iCapitulo) => {

    const { name, value } = event.target

    const updatedObject = contenido.map((unidad, i) => {
      if (i == iUnidad) {
        const capitulosActualizados = unidad.capitulos.map((capitulo, index) => {
          if (index == iCapitulo) {
            const newTemas = capitulo.temas.map((tema, it) =>
              name == "tema" + it
                ? { [name]: value }
                : tema
            )
            return {
              titulo: capitulo.titulo,
              temas: newTemas
            }

          } else {
            return capitulo
          }
        })
        return { titulo: unidad.titulo, capitulos: capitulosActualizados }
      } else {
        return unidad
      }
    }
    )
    setContenido(updatedObject)
    // setTemas({ ...temas, [name]: value })
  }
  const guardarContendino = () => {
    const newContent = contenido.map(unidad => {
      const newCapitulos = unidad.capitulos.map(capitulo => {
        let newTemas = ''
        capitulo.temas.map(tema => newTemas += `${tema}|`)
        return { ...capitulo, temas: newTemas }
      })
      return { ...unidad, capitulos: newCapitulos }
    })
    fetch(`${url}/matriculas/${matricula._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ contenido: newContent })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  const cerrarModal = () => {
    setIndice(0)
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-7'>
          <h1 >{curso.nombre}</h1>
        </div>
        <div className='col-5'>
          <div className='btn-group w-100 mt-1'>
            <button
              className='btn btn-success w-100'
              onClick={() => {
                if (contenido.length > 0) {
                  setShowModalAsistencia(true)
                }
              }}
            >
              Marcar asistencia
            </button>
            <button
              className='btn btn-secondary w-100'
              onClick={() => setShowModalHistorial(true)}
            >
              Historial
            </button>
          </div>
        </div>

      </div>
      <div className='row'>
        <div className='col-7'>
          <div className="card mt-3" >
            <div className="card-body">
              <h3 className="card-title mb-2 text-muted">{curso.codigo}</h3>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Grupo</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <span>{curso.grupo}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Categoria</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <span>{curso.categoria}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Horario</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <MiniHorario horario={curso.horario} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Creditos</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <span>{curso.creditos}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Tipo</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  <span>{curso.tipo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5 h-100">
          <div className='card mt-3 p-2'>
            <form onSubmit={onSubmit}>
              <div>
                <label className="form-label">Silabus:</label>
              </div>
              <div className=''>
                <div>
                  <input
                    className='form-control'
                    type='file'
                    name='file'
                    accept='.pdf'
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className='btn-group w-100 mt-1'>
                  <button className='btn btn-primary' type="submit">Guardar</button>
                  <button className='btn btn-secondary' onClick={getPdf} type='button'>Ver pdf</button>
                </div>
              </div>
            </form>
            <hr></hr>
            <div className='btn-group w-100'>
              <button
                className='btn btn-outline-primary'
                onClick={() => { setShowModal(true) }}
              >
                Agregar/Editar temas a dictar
              </button>
            </div>
          </div>


        </div>
        <Modalv2
          size="lg"
          show={showModal}
          setShow={setShowModal}
          title='Temas del curso'
          saveClick={guardarContendino}
          closeClick={cerrarModal}
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey='0'>
            <Row>
              <Col sm={4}>
                <Nav variant="pills" className="sticky-top flex-column">
                  {
                    contenido.map((unidad, index) =>
                      <div key={index} className="position-relative">
                        <Nav.Item onClick={() => setIndice(index)}>
                          <Nav.Link eventKey={index}>
                            Unidad {index + 1}
                            <button onClick={() => eliminarUnidad(index)}
                              className={`${(index == indice ? '' : 'd-none')} btn-close btn-close-white bg-transparent position-absolute top-50 end-0 translate-middle-y`}
                            >
                            </button>
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                    )
                  }
                  <button className='btn btn-success mt-3' onClick={() => agregarUnidad()}>Nueva unidad</button>

                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content className='bg-white border rounded'>
                  {
                    contenido.map((unidad, iUnidad) =>
                      <Tab.Pane key={iUnidad} eventKey={iUnidad}>
                        <div className='bg-white sticky-top m-0'>
                          <label className="form-label">Unidad {`${iUnidad + 1}:`} </label>
                          <div class="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Título de la Unidad"
                              name={"unidad" + iUnidad}
                              value={unidad.titulo || ''}
                              onChange={(event) => handleOnChange(event, iUnidad)}
                            />
                            <button
                              className='btn btn-success'
                              type='button'
                              onClick={() => agregarCapitulo(iUnidad)}
                            >
                              Nuevo capitulo
                            </button>
                          </div>
                          <hr></hr>
                        </div>
                        {
                          unidad.capitulos.map((capitulo, iCap) =>
                            <div className='position-relative border rounded mb-3 p-3' key={iCap}>
                              <div className=''>
                                <label column lg={3}>{`Capítulo ${iCap + 1}: `}</label>
                                <div className='position-absolute top-0 end-0'>
                                  <button className='btn-close btn-close' type='button' onClick={() => eliminarCapitulo(iUnidad, iCap)}>
                                  </button>
                                </div>
                              </div>
                              <div>
                                <form className="row g-3">
                                  <div className="input-group">
                                    <input type="text" className='form-control' placeholder="Título del Capítulo"
                                      name={"cap" + iCap}
                                      value={capitulo.titulo || ''}
                                      onChange={(event) => handleOnChange(event, iUnidad, iCap)}
                                    />
                                    <button
                                      type='button'
                                      className='btn btn-success'
                                      onClick={() => agregarTema(iUnidad, iCap)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </form>
                              </div>
                              <br />
                              <div>
                                <ul>
                                  {
                                    capitulo.temas.map((tema, i) =>
                                      <li key={i}>
                                        <div className="input-group mb-2">
                                          <input type="text" className='form-control' placeholder="Nuevo Tema"
                                            name={"tema" + i}
                                            onChange={(event) => handleOnChange(event, iUnidad, iCap)}
                                            value={tema || ''}
                                          />
                                          <button type='button' className='btn-danger btn-sm' onClick={() => eliminarTema(iUnidad, iCap, i)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" class="bi bi-x-lg" viewBox="0 0 16 16">
                                              <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                              <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                            </svg>
                                          </button>
                                        </div>
                                      </li>
                                    )
                                  }
                                </ul>
                              </div>
                            </div>
                          )
                        }
                      </Tab.Pane>
                    )
                  }
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modalv2>

        <Modalv2
          size="lg"
          show={showModalAsistencia}
          setShow={setShowModalAsistencia}
          title='ASISTENCIA'
          closeClick={() => console.log(null)}
          saveClick={() => console.log(null)}
          footer={false}
        >
          <Asistencia
            contenido={contenido}
            matricula={matricula}
            idDocente={Object.keys(matricula).length != 0 ? matricula.usuario._id : { usuario: { _id: "0" } }}
            nombreCurso={curso.nombre}
          />
        </Modalv2>
        <Modalv2
          show={showModalHistorial}
          setShow={setShowModalHistorial}
          title='HISTORIAL DE ASISTENCIA'
          closeClick={() => console.log(null)}
          saveClick={() => console.log(null)}
        >
          <HistorialAsistencia matricula={matricula} />
        </Modalv2>
      </div >
    </div >
  )
}
