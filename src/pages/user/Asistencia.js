import { Dropdown } from "react-bootstrap"
import { useState } from "react"
import Swal from 'sweetalert2'

import { ListaAlumnos } from '../../components/ListaAlumnos';

const url = 'https://testunsaac.herokuapp.com/api/matriculas/'

export function Asistencia({ contenido, matricula, idDocente, nombreCurso, setShow }) {
  const idMatricula = matricula._id

  const [descripcion, setDescripcion] = useState('');

  const [unidadSelected, setUnidadSelected] = useState({
    index: 0,
    titulo: contenido.lenght > 0 ? contenido[0].titulo : ''
  })
  const [capituloSelected, setCapituloSelected] = useState({
    index: 0,
    titulo: contenido.lenght > 0 ? contenido[unidadSelected.index].capitulos[0].titulo : ''
  }
  )
  const [temaSelected, setTemaSelected] = useState({
    index: 0,
    tema: contenido.lenght > 0 ? contenido[unidadSelected.index].capitulos[capituloSelected.index].temas[0] : ''
  })

  if (contenido.lenght < 0) {
    return (<h2>no tiene temas</h2>)
  }

  const unidadOnClick = (titulo, index) => {
    setUnidadSelected({ index, titulo })
    setCapituloSelected({ index: 0, titulo: contenido[index].capitulos[0].titulo })
  }
  const capituloOnClick = (titulo, index) => {
    setCapituloSelected({ index, titulo })
    setTemaSelected({
      index: 0,
      tema: contenido[unidadSelected.index].capitulos[index].temas[0]
    })
  }

  const temaOnClick = (tema, index) => {
    setTemaSelected({ tema, index })
  }

  const guardarAsistencia = () => {
    fetch(`${url}${idMatricula}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          asistencias: [...matricula.asistencias, { date: Date.now(), flag: true }],
          avanzado: [...matricula.avanzado, {
            unidad: unidadSelected.titulo,
            capitulo: capituloSelected.titulo,
            tema: temaSelected.tema,
            descripcion: descripcion,
            fecha: Date.now()
          }]
        }
      )
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))


  }

  const handleAsistencia = async (e, asistenciasAlumnos) => {
    setShow(false)
    guardarAsistencia();
    await fetch(`${url}asistencia-alumnos/${idMatricula}`, {
      method: 'POST',
      body: JSON.stringify({ asistencias: asistenciasAlumnos }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() =>
        Swal.fire({
          icon: 'success',
          title: 'Asistencia registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      )
      .catch(err => 
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          showConfirmButton: true,
          text: err.message
        })
        )
    e.target.disabled = true;
  }

  console.log(descripcion)
  return (
    <div>
      <h5>Tema a dictar</h5>
      <div className='border rounded p-3'>
        <div className="d-flex bd-highlight">
          <Dropdown className="p-2 flex-fill bd-highlight">
            <Dropdown.Toggle>
              {`Unidad ${unidadSelected.index + 1}: ${unidadSelected.titulo}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                contenido.map(({ titulo }, u) =>
                  <Dropdown.Item onClick={() => unidadOnClick(titulo, u)}>{titulo}</Dropdown.Item>
                )
              }
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="p-2 flex-fill bd-highlight">
            <Dropdown.Toggle>
              {`Capitulo ${capituloSelected.index + 1}: ${capituloSelected.titulo}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                contenido[unidadSelected.index].capitulos.map(({ titulo }, c) =>
                  <Dropdown.Item onClick={() => capituloOnClick(titulo, c)}>{titulo}</Dropdown.Item>
                )
              }
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="p-2 flex-fill bd-highlight">
            <Dropdown.Toggle>
              {`Tema ${temaSelected.index + 1}: ${temaSelected.tema}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                contenido[unidadSelected.index].capitulos[capituloSelected.index].temas.map((tema, t) =>
                  <Dropdown.Item onClick={() => temaOnClick(tema, t)} >{tema}</Dropdown.Item>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="m-2">
          <label>Descripción</label>
          <input
            className='form-control'
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
      </div>
      <div>
        <ListaAlumnos docente={idDocente} curso={nombreCurso} handleAsistencia={handleAsistencia} />
      </div>
    </div>
  )

}
