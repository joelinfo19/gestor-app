
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const CardCourse = ({ idMatricula, codigo, nombre, horario }) => {
	const [state, setState] = useState()
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

	const user = localStorage.getItem("user")
	console.log(user)
	const getMyCourses = async () => {

		const id = '61a577efeaea4ae1fd5e0591'
		const response = await fetch(url + 'mis-cursos/' + id)
		const responseJSON = await response.json()
		setMyCourses(responseJSON)
	}
	useEffect(() => {
		getMyCourses()
	}, [])

	// if (myCourses.length = 0) {
	// 	return (
	// 		<div>
	// 			<h2>No tiene cursos asignados</h2>
	// 		</div>
	// 	)
	// }

	return (
		<>
			<h1>Mis cursos</h1>
			<div className="d-flex flex-wrap">
				{
					myCourses.map((course) => {
						return <div
							className="w-25"
							key={course._id}
						>
							<CardCourse
								idMatricula={course._id}
								codigo={course.curso.codigo}
								nombre={course.curso.nombre}
								horario={course.curso.horario}
							/>
						</div>
					})
				}
			</div>
		</>
	)
}

