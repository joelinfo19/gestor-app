import { useState, useEffect } from "react"

export default function MatrizAsistenciaAlumnos() {
  const [matriculas, setMatriculas] = useState([])
  const [fechas, setFechas] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const url = 'https://testunsaac.herokuapp.com/api/matriculas/'

  useEffect(() => {
    const id = user._id
    fetch(`${url}mis-cursos/${id}`)
      .then(res => res.json())
      .then(data => setMatriculas(data))
      .catch(err => console.log(err))

    // const newFechas = matriculas[0].alumno[0].asistencias
    // setFechas(newFechas)
    console.log(matriculas)
  }, [])
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Alumno</th>
            {
             
            }
          </tr>

        </thead>
        <tbody>
          {
            // matriculas && matriculas[0].alumno.map(alumno => {
            //   return (
            //     <tr>
            //       <td>{alumno.nombre}</td>
            //     </tr>
            //   )
            // })
          }
        </tbody>
      </table>
    </>
  )
}