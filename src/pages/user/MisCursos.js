
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, ProgressBar } from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup'
const CardCourse = ({ idMatricula, codigo, nombre, porcentajeAvance }) => {
  return (

    [
      'Light',
    ].map((variant, idx) => (
      <CardGroup key={idx}>
        <Card
          className="m-2"
          bg={variant.toLowerCase()}
          key={idx}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '35rem' }}
        >
          <Link className="text-decoration-none" to={idMatricula}
            onClick={() => {
              localStorage.setItem('progreso', JSON.stringify(porcentajeAvance))
            }}>
            <Card.Img variant="top" src="https://picsum.photos/300/150" />
            <Card.Header>{codigo}</Card.Header>
            <Card.Body>
              <Card.Title>{nombre}</Card.Title>
              <Card.Text>
                <ProgressBar now={porcentajeAvance} label={`${porcentajeAvance}%`} />
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </CardGroup>
    ))

  )
}

export default function MisCursos() {
  const url = 'https://testunsaac.herokuapp.com/api/matriculas/'
  const [myCourses, setMyCourses] = useState([])
  const [porcentajeAvance, setPorcentajeAvance] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))

  const calcularAvance = () => {
    let array = []
    myCourses.map(mat => {
      const contenido = mat.contenido
      const avance = mat.avanzado
      const ultimoTema = avance[avance.length - 1]
      let totalTemas = 0
      let temas = []
      const newContenido = contenido.map(unidad => {
        return {
          ...unidad,
          capitulos: unidad.capitulos.map(capitulo => {
            const newTemas = capitulo.temas.split('|')
            newTemas.pop()
            totalTemas += newTemas.length
            temas.push(newTemas)
            return { ...capitulo, temas: newTemas }
          })
        }
      })

      let avanzado = 0

      temas.flat().flatMap((tema, i) => {
        console.log(tema)
        if (String(tema) == String(ultimoTema.tema)) {
          console.log(tema, i)
          avanzado = i + 1
        }
      })
      //////POR TERMINAR !!!
      // let encontrado = false
      // newContenido.map(unidad => {
      // 	unidad.capitulos.map(capitulo => {
      // 		capitulo.temas.map(tema => {
      // 			if (tema != ultimoTema.tema && encontrado) {
      // 				avanzado += 1
      // 			} else {
      // 				encontrado = true
      // 			}
      // 		})
      // 	})
      // })
      const porcentaje = (Math.round(avanzado * 100 / totalTemas))
      console.info(porcentaje, "%")
      // array.push(porcentaje)
      setPorcentajeAvance([...porcentajeAvance, porcentaje])
    })
    // setPorcentajeAvance(array)

  }

  const getMyCourses = () => {
    const id = user._id
    fetch(url + 'mis-cursos/' + id)
      .then(res => res.json())
      .then(data => {
        const newArray = data.map(mat => {
          if (mat.avanzado.length > 0 && mat.contenido.length > 0) {
            const contenido = mat.contenido
            const avance = mat.avanzado
            const ultimoTema = avance[avance.length - 1]
            let totalTemas = 0
            let temas = []
            const newContenido = contenido.map(unidad => {
              return {
                ...unidad,
                capitulos: unidad.capitulos.map(capitulo => {
                  const newTemas = capitulo.temas.split('|')
                  newTemas.pop()
                  totalTemas += newTemas.length
                  temas.push(newTemas)
                  return { ...capitulo, temas: newTemas }
                })
              }
            })

            let avanzado = 0

            avanzado = temas.flat().indexOf(ultimoTema.tema) + 1
            const porcentaje = (Math.round(avanzado * 100 / totalTemas))
            console.log(porcentaje, '%')
            // setPorcentajeAvance([...porcentajeAvance, porcentaje])
            console.info(porcentajeAvance)
            return { ...mat, porcentaje }
          } else {
            console.log(0, '%')
            // setPorcentajeAvance([...porcentajeAvance, 0])
            return { ...mat, porcentaje: 0 }
          }
        })
        setMyCourses(newArray)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getMyCourses()
  }, [])

  return (
    <>
      <h1>Mis cursos</h1>
      <div className="d-flex flex-wrap ">
        {
          myCourses.map((matricula, i) =>
            <div
              className="w-25 m-0"
              key={matricula._id}
            >
              <CardCourse
                idMatricula={matricula._id}
                codigo={matricula.curso.codigo}
                nombre={matricula.curso.nombre}
                porcentajeAvance={matricula.porcentaje}
              />
            </div>
          )
        }
      </div>
    </>
  )
}

