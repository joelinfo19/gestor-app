import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Modalv2 from '../../components/Modalv2'
import { Button, Tabs, Tab, Row, Col, Nav } from 'react-bootstrap'

const url = 'https://testunsaac.herokuapp.com/api'

export default function Curso() {

	const { courseId } = useParams()

	const [file, setFile] = useState()
	const [filename, setFilename] = useState('default')
	const [urlPdf, setUrlPdf] = useState('default')

	const [matricula, setMatricula] = useState({})
	const [curso, setCurso] = useState({})

	useEffect(() => {
		fetch(`${url}/matriculas/${courseId}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(data => {
				const { matriculas } = data
				setMatricula(matriculas)
				setCurso(matriculas.curso)
			})
	}, [])

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
				.then(data => console.log(data))
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
	const [showModal, setShowModal] = useState(false)
	const [contenido, setContenido] = useState(
		[
			{
				descripcion: 'Introduccion',
				capitulos: [
					{
						descripcion: 'Historia',
						temas: [
						]
					}
				]
			},
		])
	const buscarContenido = (event, iUnidad, iCapitulo) => {
		const { name, value } = event.target

		const num = name.match(/\d+/g)
		const letr = name.match(/[a-zA-Z]+/g)

		const newSetContenido = contenido.map((unidad, u) => {
			const newCapitulos = unidad.capitulos.map((capitulo, c) => {
				if (iUnidad == u && iCapitulo == c) {
					//editar descripcion del capitulo
					if (letr == "tema") {
						const newTemas = capitulo.temas.map((tema, it) =>
							num == it ?
								value
								:
								tema
						)
						return {
							descripcion: capitulo.descripcion,
							temas: newTemas
						}
					}
					if (letr == "cap") {
						return {
							...capitulo,
							descripcion: value,
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
			descripcion: '',
			capitulos: [
				{
					descripcion: '',
					temas: []
				}
			]
		}])
	}
	const agregarCapitulo = (iUnidad) => {
		contenido[iUnidad].capitulos.push({ descripcion: '', temas: [] })
		setContenido(contenido.map(unidad => unidad))
	}

	const agregarTema = (iUnidad, iCapitulo) => {

		const updatedObject = contenido.map((unidad, i) => {
			if (i == iUnidad) {
				const capitulosActualizados = unidad.capitulos.map((capitulo, index) => {
					if (index == iCapitulo) {
						return {
							descripcion: capitulo.descripcion,
							temas: [...capitulo.temas, 'Nuevo tema']
						}
					} else {
						return capitulo
					}
				})
				return { descripcion: unidad.descripcion, capitulos: capitulosActualizados }
			} else {
				return unidad
			}
		})
		setContenido(updatedObject)
	}


	const handleOnChange = (event, iUnidad, iCapitulo) => {

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
							descripcion: capitulo.descripcion,
							temas: newTemas
						}

					} else {
						return capitulo
					}
				})
				return { descripcion: unidad.descripcion, capitulos: capitulosActualizados }
			} else {
				return unidad
			}
		}
		)
		setContenido(updatedObject)
		// setTemas({ ...temas, [name]: value })
	}
	console.log(contenido)

	const guardarContendino = () => {
		console.log('Guardando ...')
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-5'>
					<h2>{curso.nombre}</h2>
					<div>
						<strong>Codigo: </strong>
						<span>{curso.codigo}</span>
					</div>
					<div>
						<strong>Grupo: </strong>
						<span>{curso.grupo}</span>
					</div>
					<div>
						<strong>Categoria: </strong>
						<span>{curso.categoria}</span>
					</div>
					<div>
						<strong>Horario: </strong>
						<span> .... </span>
					</div>
					<div>
						<strong>Creditos: </strong>
						<span>{curso.creditos}</span>
					</div>
					<div>
						<strong>Tipo: </strong>
						<span>{curso.tipo}</span>
					</div>
				</div>
				<div className="col-7">
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label className="form-label">Subir silabus</label>
							<input
								className="form-control"
								type="file"
								name="file"
								accept=".pdf"
								onChange={(e) => onChange(e)}
							/>
						</div>
						<button className='btn btn-primary' type="submit">Guardar</button>
					</form>
					<div className='btn-group pt-2'>
						<button className='btn btn-secondary' onClick={getPdf} >Ver pdf</button>
						<button
							className='btn btn-secondary'
							onClick={() => { setShowModal(true) }}
						>Agregar temas</button>
						<Modalv2
							size="lg"
							show={showModal}
							setShow={setShowModal}
							title='Temas del curso'
							saveClick={guardarContendino}
						>
							<Tab.Container id="left-tabs-example" defaultActiveKey="first">
								<Row>
									<Col sm={4}>
										<Nav variant="pills" className="flex-column">
											{
												contenido.map((unidad, index) =>
													<Nav.Item key={index} className="mb-2">
														<Nav.Link eventKey={unidad.descripcion}>Unidad {index + 1}</Nav.Link>
													</Nav.Item>
												)
											}
											<Button
												className='btn-secondary'
												onClick={()=> agregarUnidad()}
											> +
											</Button>

										</Nav>
									</Col>
									<Col sm={8}>
										<Tab.Content>
											{
												contenido.map((unidad, iUnidad) =>
													<Tab.Pane key={iUnidad} eventKey={unidad.descripcion}>
														<div className='d-flex'>
															<h5>Unidad {`${iUnidad + 1}:`}</h5>
															<input defaultValue={unidad.descripcion} />
															<Button onClick={() => agregarCapitulo(iUnidad)}> + </Button>
														</div>
														{
															unidad.capitulos.map((capitulo, iCap) =>
																<div key={iCap}>
																	<div>
																		<span>{`Capítulo ${iCap + 1}: `}</span>
																		<input name={"cap" + iCap} onChange={(event) => buscarContenido(event, iUnidad, iCap)} />
																	</div>
																	<div>
																		<div>
																			<span>Temas:</span>
																			<Button onClick={() => agregarTema(iUnidad, iCap)}> + temas</Button>
																		</div>
																		<ul>
																			{
																				capitulo.temas.map((tema, i) =>
																					<li key={i}>
																						<input
																							name={"tema" + i}
																							onChange={(event) => buscarContenido(event, iUnidad, iCap)}
																							defaultValue={tema}
																						/>
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
					</div>
				</div>
			</div >






		</div >
	)
}