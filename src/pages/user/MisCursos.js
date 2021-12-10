
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CardCourse = ({ codigo, nombre, horario }) => {
	const [state, setState] = useState()
	return (
		<Link to={codigo}>
			<div>
				<h2>{codigo}</h2>
				<strong>{nombre}</strong>
				<div>
					horario
				</div>
			</div>

		</Link>
	)
}

export default function MisCursos({ id_docente }) {
	const url = 'https://testunsaac.herokuapp.com/api/matriculas/'
	// const url = 'http://localhost:4000/api/matriculas/'

	const [myCourses, setMyCourses] = useState([])

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
	myCourses.map(course => {
		console.log(course.curso.nombre)
	})
	return (
		<div>
			{
				myCourses.map((course) => {
					return <div key={course._id}>
						<CardCourse
							codigo={course.curso.codigo}
							nombre={course.curso.nombre}
							horario={course.curso.horario}
						/>
					</div>
				})
			}
		</div>
	)
}

