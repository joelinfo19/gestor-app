import { useState, useEffect } from "react"
import { ButtonGroup, ToggleButton } from "react-bootstrap"

export default function MatrizAsistenciaAlumnos() {
  const [nroCurso, setNroCurso] = useState(0)
  const url = 'https://testunsaac.herokuapp.com/api/matriculas/'
  const [matriculas, setMatriculas] = useState([])
  const [porcentajePorFecha, setPorcentajePorFecha] = useState([])
  const [fechas, setFechas] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  const calcularPorcentajePorFecha = () => {
    let porcentaje = []
    fechas.map((fecha) => {
      fecha.map((date, i) => {
        if (porcentaje.length < fechas[0].length) {
          if (date.flag) {
            porcentaje.push(1)
          } else {
            porcentaje.push(0)
          }
        } else {
          if (date.flag) {
            porcentaje[i] = porcentaje[i] + 1
            // setPorcentajePorFecha(porcentajePorFecha)
          }
        }
      })
    })
    return porcentaje
  }
  const getMatriculas = () => {
    const id = user._id
    fetch(`${url}mis-cursos/${id}`)
      .then(res => res.json())
      .then(data => {
        const newFechas = data[nroCurso].alumno.map((al) => {
          return al.asistencias
        })
        let porcentaje = []
        newFechas.map((fecha) => {
          fecha.map((date, i) => {
            if (porcentaje.length < newFechas[0].length) {
              if (date.flag) {
                porcentaje.push(1)
              } else {
                porcentaje.push(0)
              }
            } else {
              if (date.flag) {
                porcentaje[i] = porcentaje[i] + 1
                // setPorcentajePorFecha(porcentajePorFecha)
              }
            }
          })
        })

        //calculado porcentaje por fecha
        data[nroCurso].porcentaje = porcentaje
        setFechas(newFechas)
        setMatriculas(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getMatriculas()
  }, [nroCurso])

  const [radioValue, setRadioValue] = useState(0)
  return (
    <div>
      <ButtonGroup className="m-2">
        {matriculas.map((mat, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant='outline-primary'
            name="radio"
            value={idx}
            checked={nroCurso === idx}
            onChange={(e) => setNroCurso(Number(e.currentTarget.value))}
          >
            {mat.curso.nombre}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {
        matriculas.map((mat, i) => {
          if (i == nroCurso) {
            return (
              <table className="table">
                <thead className="">
                  <tr className="sticky-sm-top bg-white ">
                    <th style={{ width: 400 }} >Alumno</th>
                    {
                      fechas && fechas[0].map(fecha => {
                        let newDate = new Date(fecha.date)
                        let dia = newDate.getDate()
                        let mes = newDate.getMonth() + 1
                        let anio = newDate.getFullYear()
                        return (
                          <th style={{ width: 90 }}> {dia + '-' + mes + '-' + anio}</th>
                        )
                      })
                    }
                    <th>%</th>
                  </tr>

                </thead>
                <tbody >
                  {
                    mat.alumno.map((al, index) => {
                      return (

                        <tr className='border-bottom'>
                          <td>{al.nombre}</td>
                          {
                            al.asistencias.map((asistencia, indice) => {

                              return (
                                <td>
                                  <div className={`rounded-2 bg-${asistencia.flag ? 'primary' : 'danger'}`} style={{ width: 20, height: 20 }}>
                                  </div>
                                </td>
                              )
                            }
                            )
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
                <tfoot >
                  <th></th>
                  {
                    mat.porcentaje && mat.porcentaje.map(por =>
                      <th>{Math.round((por / fechas.length) * 100)}%</th>
                    )
                  }

                </tfoot>
              </table>
            )
          }
        })
      }

    </div>
  )
}