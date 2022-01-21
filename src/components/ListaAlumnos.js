import React, {useState, useEffect} from 'react';
import {helpHttp} from '../helpers/helpHttp';
import sty from './styles/ListaAlumnos.module.css';


export const ListaAlumnos = ({docente, curso, handleAsistencia}) => {

  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState({});

  let api = helpHttp();
  let url = `https://testunsaac.herokuapp.com/api/matriculas/mis-cursos/${docente}`;

  useEffect(() => {
    api.get(url)
      .then(data => {
        setAlumnos(data);
        data = data.filter(el => {return el.curso.nombre == curso});
        data = data.at(0).alumno.reduce((acc, el) => acc.concat(el.nombre), []);
        setAlumnos([...data]);
      })
  }, []);

  useEffect(() => {
    let lista_asistencia = [];
    for(let el of alumnos){
      lista_asistencia.push({name: el, asistencias: [{date: new Date(), flag: false}]})
    }
    setAsistencias(lista_asistencia)
  }, [alumnos]);

  const handleChecked = (e) => {
    let nuevaAsistencia = asistencias;
    for(let el of nuevaAsistencia){
      if(el.name == e.target.name){
        el.asistencias[0].flag = e.target.checked ? true : false;
        break;
      }
    }
    setAsistencias(nuevaAsistencia);
  }



  return(
    <div className={sty.container}>
      <p className={sty.container_title}>Lista de estudiantes:</p>
      <ul className={sty.container_ul}>
        <li className={sty.container_ul_li}><div className={sty.container_ul_li_name}>Nombre</div><div className={sty.container_ul_li_check}>Asistencia</div></li>
        {alumnos.map(el => typeof el == "string" ? 
          (
            <li className={sty.container_ul_li} key={el}>
              <label htmlFor={el} className={sty.container_ul_li_name}>{el}</label>
              <div className={sty.container_ul_li_check}>
                <input type='checkbox' id={el} name={el} value='jojo' onChange={e => handleChecked(e)}/>
              </div>
            </li>
          ) 
        : 
          <p>Cargando ...</p>)}
      </ul>
      
      <div className={sty.container_btn_submit}>
        <button onClick={(e) => handleAsistencia(e, asistencias, docente)} className={sty.btn_submit}>
          Registrar Asistencia
        </button>
      </div>
    </div>
  )
}

