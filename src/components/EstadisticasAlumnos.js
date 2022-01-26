import React, {useEffect, useState} from 'react';
import ReactAnime from 'react-animejs'
import {helpHttp} from '../helpers/helpHttp';

const {Anime, stagger} = ReactAnime


const uri = 'https://testunsaac.herokuapp.com/api/matriculas/';
const api = helpHttp();

export const EstadisticasAlumnos = ({idMatricula}) => {

  const [porcentajeAsisenciasAlumnos, setPorcentajeAsistenciasAlumnos] = useState(null);

  const porcentajeAsistencias = (arrAsistencias) => {
    let totalAsistencias = arrAsistencias.reduce((acc, el) => el.flag ? acc + 1 : acc , 0 );
    return (totalAsistencias/arrAsistencias.length) * 100;
  }

  useEffect(() => {
    api.get(`${uri}${idMatricula}`)
      .then(matricula => {
        if(matricula.ok){
          let porcentajeAlumnos = matricula.matriculas.alumno.map(x => {return {...x, asistencias:porcentajeAsistencias(x.asistencias)}});
          setPorcentajeAsistenciasAlumnos(porcentajeAlumnos);
          console.log(porcentajeAlumnos)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{width: '80%'}}>
      { porcentajeAsisenciasAlumnos ? 
        <div>
            {porcentajeAsisenciasAlumnos.map((el, index) => 
          <div style={{marginBottom: '25px'}}>
            <Anime _onUpdate={[
              {
                targets: `#a${index}`,
                width: `${el.asistencias}%`,
                background: '#61c3ff',
                duration: 900,
                easing: 'easeOutQuart',
                delay: index*100,
              }
            ]}>
              <div>{el.nombre}</div>
              <div key={el._id} id={`a${index}`} style={{height: '20px', width: '3px', backgroundColor: '5a87ff', textAlign: 'center'}}><b>{el.asistencias}%</b></div>
            </Anime>
          </div>
            )}
        </div>
        :
        <div>Cargando</div>
      }
    </div>
  )
}
