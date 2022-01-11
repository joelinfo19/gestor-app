
import { useState } from 'react'
export function HistorialAsistencia({ matricula }) {
  const [asistencia, setAsistencia] = useState(matricula.asistencias)

  

  console.log(asistencia)
  const insertarFecha = () => {
    fetch('https://testunsaac.herokuapp.com/api/matriculas/61ca98c54c2a939873f1cb5f',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          asistencias: [
            {
              date: new Date('2021-01-01'),
              flag: true
            },
            {
              date: new Date('2021-01-03'),
              flag: true
            },
            {
              date: new Date('2021-01-05'),
              flag: true
            },
          ]
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  return (

    <div>
      {
        asistencia.map(dato => {
          const fecha = new Date(dato.date)

          return (
            <li>
              <span>{fecha.toLocaleString()}</span>
              <span>{dato.flag ? '✓': 'X'}</span>
            </li>
          )
        })

      }
      {/* <button onClick={() => insertarFecha()}> + </button> */}
    </div>
  )
}