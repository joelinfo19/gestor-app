
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, ProgressBar } from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup'
const CardCourse = ({ idMatricula, codigo, nombre, porcentajeAvance }) => {
	return (

		[
			'Light',
		].map((variant, idx) => (
			<CardGroup key={idx}>
				<Card
					className="m-2"
					bg={variant.toLowerCase()}
					key={idx}
					text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
					style={{ width: '35rem' }}
				>
					<Link className="text-decoration-none" to={idMatricula}>
						<Card.Img variant="top" src="https://picsum.photos/300/150" />
						<Card.Header>{codigo}</Card.Header>
						<Card.Body>
							<Card.Title>{nombre}</Card.Title>
							<Card.Text>
								<ProgressBar now={porcentajeAvance} label={`${porcentajeAvance}%`} />
							</Card.Text>
						</Card.Body>
					</Link>
				</Card>
			</CardGroup>
		))

	)
}

export default function MisCursos() {
	const url = 'https://testunsaac.herokuapp.com/api/matriculas/'
	const [myCourses, setMyCourses] = useState([])
	const [porcentajeAvance, setPorcentajeAvance] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"))

	const calcularAvance = () => {

		myCourses.map(mat => {
			const contenido = mat.contenido
			const avance = mat.avanzado
			const ultimoTema = avance[avance.length - 1]
			let avanzado = 0
			let totalTemas = 0
			const newContenido = contenido.map(unidad => {
				return {
					...unidad, capitulos: unidad.capitulos.map(capitulo => {
						const newTemas = capitulo.temas.split('|')
						newTemas.pop()
						totalTemas += newTemas.length
						return { ...capitulo, temas: newTemas }
					})
				}
			})
			//////POR TERMINAR !!!
			let encontrado = false
			newContenido.map(unidad => {
				unidad.capitulos.map(capitulo => {
					capitulo.temas.map(tema => {
						if (tema != ultimoTema.tema && encontrado) {
							avanzado += 1
						} else {
							encontrado = true
						}
					})
				})
			})
			const porcentaje = (Math.round(avanzado * 100 / totalTemas))
			setPorcentajeAvance([...porcentajeAvance, porcentaje])
		})

	}

	const getMyCourses = () => {
		const id = user._id
		fetch(url + 'mis-cursos/' + id)
			.then(res => res.json())
			.then(data => setMyCourses(data))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getMyCourses()
		// calcularAvance()

	}, [])
	console.log({ porcentajeAvance })
	if (myCourses.length == 0) {
		return (
			<div>
				<h2>No tiene cursos asignados</h2>
			</div>
		)
	}
	return (
		<>
			<h1>Mis cursos</h1>
			<div className="d-flex flex-wrap ">
				{
					myCourses.map((matricula, i) =>
						<div
							className="w-25 m-0"
							key={matricula._id}
						>
							<CardCourse
								idMatricula={matricula._id}
								codigo={matricula.curso.codigo}
								nombre={matricula.curso.nombre}
								porcentajeAvance={porcentajeAvance.length > 0 ? porcentajeAvance[i] : 0}
							/>
						</div>
					)
				}
			</div>
		</>
	)
}

