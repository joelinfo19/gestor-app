import { Dropdown } from "react-bootstrap"
import { useState } from "react"

import {ListaAlumnos} from '../../components/ListaAlumnos';

const url = 'https://testunsaac.herokuapp.com/api/matriculas/'

export function Asistencia({ contenido, idMatricula, idDocente, nombreCurso }) {
	const [unidadSelected, setUnidadSelected] = useState({
		index: 0,
		titulo: contenido[0].titulo
	})
	const [capituloSelected, setCapituloSelected] = useState({
		index: 0,
		titulo: contenido[unidadSelected.index].capitulos[0].titulo
	}
	)
	const [temaSelected, setTemaSelected] = useState({
		index: 0,
		tema: contenido[unidadSelected.index].capitulos[capituloSelected.index].temas[0]
	})

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
			body: JSON.stringify(
				{
					asistencias: [{ date: Date.now(), flag: true }]
				}
			)
		})
	}


	return (
		<div>
			<h5>Tema a dictar</h5>
			<div className="d-flex">
				<Dropdown>
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

				<Dropdown>
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

				<Dropdown>
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
			<div>
        <ListaAlumnos docente={idDocente} curso={nombreCurso} />
			</div>
			<button onClick={() => guardarAsistencia()}>
				Guardar
			</button>
		</div>
	)

}
