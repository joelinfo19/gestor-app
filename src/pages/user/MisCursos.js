
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const CardCourse = ({ idMatricula, codigo, nombre, horario }) => {
	return (
		<Card
			bg="Light"
			className="m-2"
		>
			<Link className="text-decoration-none" to={idMatricula}>
				<Card.Header>{codigo}</Card.Header>
				<Card.Body>
					<Card.Title>{nombre}</Card.Title>
					<Card.Text>
						Horario
					</Card.Text>
				</Card.Body>
			</Link>
		</Card>

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
			<div className="d-flex flex-wrap">
				{
					myCourses.map((matricula) => {
						return <div
							className="w-50"
							key={matricula._id}
						>
							<CardCourse
								idMatricula={matricula._id}
								codigo={matricula.curso.codigo}
								nombre={matricula.curso.nombre}
								horario={matricula.curso.horario}
							/>
						</div>
					})
				}
			</div>
		</>
	)
}

