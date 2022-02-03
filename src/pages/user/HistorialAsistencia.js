
import { useState } from 'react'
export function HistorialAsistencia({ matricula }) {
  const [asistencia, setAsistencia] = useState(matricula.asistencias)

  

  console.log(asistencia)
 
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