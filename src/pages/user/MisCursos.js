
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup'
const CardCourse = ({ idMatricula, codigo, nombre, horario }) => {
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
								Horario
							</Card.Text>
						</Card.Body>
					</Link>
				</Card>
			</CardGroup>
		))

	)
}

export default function MisCursos({ id_docente }) {
	const url = 'https://testunsaac.herokuapp.com/api/matriculas/'
	const [myCourses, setMyCourses] = useState([])

	const user = JSON.parse(localStorage.getItem("user"))
	const getMyCourses = async () => {

		const id = user._id
		const response = await fetch(url + 'mis-cursos/' + id)
		const responseJSON = await response.json()
		setMyCourses(responseJSON)
	}
	useEffect(() => {
		getMyCourses()
	}, [])

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
					myCourses.map((matricula) =>
						<div
							className="w-25 m-0"
							key={matricula._id}
						>
							<CardCourse
								idMatricula={matricula._id}
								codigo={matricula.curso.codigo}
								nombre={matricula.curso.nombre}
								horario={matricula.curso.horario}
							/>
						</div>
					)
				}
			</div>
		</>
	)
}

