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
				descripcion: 'Unidad I',
				capitulos: [
					{
						descripcion: 'Capitulo 1',
						temas: []
					}
				]
			},

		])

	const agregarTema = (iUnidad, iCapitulo) => {

		const updatedObject = contenido.map((unidad, i) => {
			if (i == iUnidad) {
				const capitulosActualizados = unidad.capitulos.map((capitulo, index) => {
					if (index == iCapitulo) {
						return {
							descripcion: capitulo.descripcion,
							temas: [...capitulo.temas, { [capitulo.temas.length]: 'Nuevo temas' }]
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
							name == it ?
								{ [name]: value }
								:
								tema
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

		// console.log(name, value)
	}
	console.log(contenido)
	const [unidades, setUnidades] = useState([
		{
			descripcion: 'Unidad I',
			tap: true,
			key: 0
		},
		{
			descripcion: 'Unidad II',
			tap: false,
			key: 1
		},
	])
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
											<button> + </button>

										</Nav>
									</Col>
									<Col sm={8}>
										<Tab.Content>
											{
												contenido.map((unidad, iUnidad) =>
													<Tab.Pane key={iUnidad} eventKey={unidad.descripcion}>
														{
															unidad.capitulos.map((capitulo, iCap) =>
																<div key={iCap}>
																	<span>{capitulo.descripcion}</span>
																	<Button> + </Button>
																	<input ></input>

																	<span>Temas:</span>
																	<Button onClick={() => agregarTema(iUnidad, iCap)}> + temas</Button>
																	<ul>
																		{
																			capitulo.temas.map((tema, i) =>
																				<li key={i}>
																					<input name={i} onChange={(event) => handleOnChange(event, iUnidad, iCap)} ></input>
																				</li>
																			)
																		}
																	</ul>
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