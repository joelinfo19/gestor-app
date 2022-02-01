import React, {useEffect, useState} from 'react';
import ReactAnime from 'react-animejs'
import {helpHttp} from '../helpers/helpHttp';
import { CSVLink, CSVDownload } from 'react-csv';

const {Anime, stagger} = ReactAnime


const uri = 'https://testunsaac.herokuapp.com/api/matriculas/';
const api = helpHttp();

const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

export const EstadisticasAlumnos = ({idMatricula}) => {

  const [porcentajeAsisenciasAlumnos, setPorcentajeAsistenciasAlumnos] = useState(null);
  const [matrizAsistenciasAlumnos, setMatrizAsistenciasAlumnos] = useState(null);

  const porcentajeAsistencias = (arrAsistencias) => {
    let totalAsistencias = arrAsistencias.reduce((acc, el) => el.flag ? acc + 1 : acc , 0 );
    return (totalAsistencias/arrAsistencias.length) * 100;
  }

  const matrizAsistencias = (arrAlumnos) => {
    let arrClases = ["Alumno"];
    arrClases.push(...arrAlumnos[0].asistencias.map((el, index) => `Clase${index} ${el.date.substring(0, 10)}`));
    let arrAsistenciasAlumnos = arrAlumnos.map( (el) => {
      let filaAsistencias = [el.nombre];
      filaAsistencias.push(...el.asistencias.map(elem => elem.flag ? "Asistió": "Faltó"));
      return filaAsistencias;
    })
    setMatrizAsistenciasAlumnos([arrClases, ...arrAsistenciasAlumnos])
  }

  useEffect(() => {
    api.get(`${uri}${idMatricula}`)
      .then(matricula => {
        if(matricula.ok){
          let porcentajeAlumnos = matricula.matriculas.alumno.map(x => {return {...x, asistencias:porcentajeAsistencias(x.asistencias)}});
          setPorcentajeAsistenciasAlumnos(porcentajeAlumnos);
          matrizAsistencias(matricula.matriculas.alumno)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{width: '90%', margin: '1rem', display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}>
      { porcentajeAsisenciasAlumnos ? 
        <div style={{width: '90%'}}>
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
              <div key={el._id} id={`a${index}`} style={{height: '23px', width: '3px', backgroundColor: '#5a87ff', textAlign: 'center', borderRadius: '3px'}}><b>{el.asistencias ? Math.round(el.asistencias*100, 2)/100 : 0}%</b></div>
            </Anime>
          </div>
            )}
        </div>
        :
        <div>Cargando</div>
      }
      <div style={{width:'100%'}}><b>Otros reportes: </b></div>
      {matrizAsistenciasAlumnos && <CSVLink data={matrizAsistenciasAlumnos} filename={"Asistencias.csv"} style={{color: '#9a57ff', width: '200px', backgroundColor: '#61c3ff', borderRadius:'5px', textAlign:'center', textDecoration:'none'}}>Descargar matriz de asistencias</CSVLink>}
    </div>
  )
}
