import { useParams } from 'react-router-dom'
import { useState } from 'react'

const url = 'https://testunsaac.herokuapp.com/api/upload/'

// const url = 'http://localhost:4000/api/upload/'

const idMatricula = '61a5b9a66512bfb076be91ec'

export default function Curso() {

    const { courseId } = useParams()

    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('default')
    const [urlPdf, setUrlPdf] = useState('default')

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('myFile', file)
        formData.append('myFile', filename)

        fetch(url + idMatricula, {
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
        fetch('https://testunsaac.herokuapp.com/api/matriculas', {
            method: 'GET'

        })
            .then(res => res.json())
            .then(data => {
                const { matriculas } = data
                matriculas.map(matricula => {
                    if (matricula._id == idMatricula) {
                        setUrlPdf(matricula.silabus)
                        // console.log(matricula._id)
                        
                    }
                })
                console.log(urlPdf)
            })

        fetch(url + urlPdf, {
            method: 'GET',
            responseType: 'blob'
        })
            .then(res => {
                console.log(res)
                window.open(res.url)
            })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Curso id: {courseId}</h2>
                <input type="file" name="file" onChange={(e) => onChange(e)}></input>
                <button type="submit">Guardar</button>
            </form>

            <button onClick={getPdf} >Ver pdf</button>

        </div>
    )
}