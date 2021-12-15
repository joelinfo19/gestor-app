import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const url = 'https://testunsaac.herokuapp.com/api'

// const url = 'http://localhost:4000/api/upload/'



export default function Curso() {

	const { courseId } = useParams()

	const [file, setFile] = useState('')
	const [filename, setFilename] = useState('default')
	const [urlPdf, setUrlPdf] = useState('default')

	const [matricula, setMatricula] = useState({})


	useEffect(() => {
		fetch(`${url}/matriculas/${courseId}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(data => {
				const { matriculas } = data
				setMatricula(matriculas)
			})
	}, [])

	console.log(matricula)

	const onChange = (e) => {
		setFile(e.target.files[0])
		setFilename(e.target.files[0].name)
	}

	const onSubmit = (e) => {
		e.preventDefault()
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

	const getPdf = () => {
		fetch(`${url}/upload/${matricula.silabus}`, {
			method: 'GET',
			responseType: 'blob'
		})
			.then(data => {
				console.log({ data: data })
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

	return (
		<div>
			<form onSubmit={onSubmit}>
				<h2>Id matricula: {courseId}</h2>
				<input type="file" name="file" onChange={(e) => onChange(e)}></input>
				<button type="submit">Guardar</button>
			</form>

			<button onClick={getPdf} >Ver pdf</button>

		</div>
	)
}