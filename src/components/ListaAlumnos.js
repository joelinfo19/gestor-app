import React, {useState, useEffect} from 'react';
import {helpHttp} from '../helpers/helpHttp';
import sty from './styles/ListaAlumnos.module.css';


export const ListaAlumnos = ({docente, curso}) => {

  const [alumnos, setAlumnos] = useState([]);

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

  const handleChecked = (e) => {
    console.log(e.target.checked ? "si" : "no")
  }



  return(
    <div className={sty.container}>
      <p className={sty.container_title}>Lista de estudiantes:</p>
      <ul className={sty.container_ul}>
        <li className={sty.container_ul_li}><div className={sty.container_ul_li_name}>Nombre</div><div className={sty.container_ul_li_check}>Asistencia</div></li>
        {alumnos.map(el => typeof el == "string" ? 
          (
            <li className={sty.container_ul_li} key={el}>
              <div className={sty.container_ul_li_name}>{el}</div>
              <div className={sty.container_ul_li_check}>
                <input type='checkbox' onChange={e => handleChecked(e)}/>
              </div>
            </li>
          ) 
        : 
          <p>Cargando ...</p>)}
      </ul>
    </div>
  )
}

