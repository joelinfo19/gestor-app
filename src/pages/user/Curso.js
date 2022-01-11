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
        console.log('lopp')
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
  }, [file])

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

        
        
              
            <ListGroup>
            <ListGroup.Item variant="success" className="bg-success text-white">
              <h3 className="card-title">{curso.nombre} </h3> 
              <h6 className="card-subtitle mb-2 text-dark">{curso.codigo}</h6>
              </ListGroup.Item>
              </ListGroup>

              <div className='col-7'>
          <div className="card mt-3 border-0" >
            <div className="card-body">

              <ul className="list-group list-group-flush">
              <ListGroup>
              <ListGroup.Item variant="primary">
                
                  <strong>Grupo: </strong><span>{curso.grupo}</span>
                
                </ListGroup.Item>

                <ListGroup.Item variant="primary">
                  <strong>Categoria: </strong><span>{curso.categoria}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  <strong>Horario: </strong><span> .... </span>
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  <strong>Creditos: </strong><span>{curso.creditos}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                  <strong>Tipo: </strong><span>{curso.tipo}</span>
                </ListGroup.Item>
                </ListGroup>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-5 h-100">

          <div className='mt-3'>
            
            <button className='btn btn-success w-100 text-warning'  onClick={() => setShowModalAsistencia(true)}>
              Marcar asistencia
            </button>
          </div>

          
          <div className='card mt-3 p-2'>
            <form onSubmit={onSubmit}>
              <div>
                <label className="form-label"><h4>Silabus:</h4></label>
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
                <Nav variant="pills" className="flex-column">
                  {
                    contenido.map((unidad, index) =>
                      <div key={index} className="position-relative">
                        <Nav.Item onClick={() => setIndice(index)}>
                          <Nav.Link eventKey={index}>
                            Unidad {index + 1}
                            <button onClick={() => eliminarUnidad(index)}
                              className={`${(index == indice ? '' : 'd-none')} bg-transparent position-absolute top-50 end-0 translate-middle-y`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff " className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                              </svg>
                            </button>
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                    )
                  }
                  <Button className='btn-success' onClick={() => agregarUnidad()}>+Unidad</Button>

                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {
                    contenido.map((unidad, iUnidad) =>
                      <Tab.Pane key={iUnidad} eventKey={iUnidad}>
                        <Row>
                          <div className='d-flex'>
                            <Form.Label column lg={3}>Unidad {`${iUnidad + 1}:`}</Form.Label>
                            <Col>
                              <input type="text" placeholder="Título de la Unidad"
                                name={"unidad" + iUnidad}
                                value={unidad.titulo || ''}
                                onChange={(event) => handleOnChange(event, iUnidad)} />

                            </Col>
                            <Button className='btn-success' onClick={() => agregarCapitulo(iUnidad)}>+Capitulos</Button>
                          </div>
                        </Row>
                        {
                          unidad.capitulos.map((capitulo, iCap) =>
                            <div key={iCap}>
                              <Row>
                                <div>
                                  <Form.Label column lg={3}><span>{`Capítulo ${iCap + 1}: `}</span></Form.Label>

                                  <form className="row g-3">
                                    <Col>
                                      <div className="col-auto">
                                        <input type="text" placeholder="Título del Capítulo"
                                          name={"cap" + iCap}
                                          value={capitulo.titulo || ''}
                                          onChange={(event) => handleOnChange(event, iUnidad, iCap)} />

                                      </div>
                                    </Col>
                                    <div className="col-auto">
                                      <Button className='btn-danger btn-sm' onClick={() => eliminarCapitulo(iUnidad, iCap)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff " className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                        </svg>
                                      </Button>
                                    </div>
                                  </form>
                                </div>
                              </Row>
                              <br />
                              <div>
                                <div>
                                  <span></span>
                                  <Button onClick={() => agregarTema(iUnidad, iCap)}> +Temas</Button>
                                </div>
                                <ul>
                                  {
                                    capitulo.temas.map((tema, i) =>
                                      <li key={i}>
                                        <Row>
                                          <form className="row g-1">
                                            <div className="col-auto">
                                              <input type="text" placeholder="Nuevo Tema"
                                                name={"tema" + i}
                                                onChange={(event) => handleOnChange(event, iUnidad, iCap)}
                                                value={tema || ''}
                                              />
                                            </div>
                                            <Col>
                                              <div >
                                                <Button className='btn-secondary btn-sm' onClick={() => eliminarTema(iUnidad, iCap, i)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#082B03" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                  </svg>
                                                </Button>
                                              </div>
                                            </Col>
                                          </form>
                                        </Row>
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
        >
          <Asistencia contenido={contenido} idMatricula={matricula._id} />
        </Modalv2>

      </div >
    </div >
  )
}