import React, { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import sty from './styles/ListaAlumnos.module.css';
import { Swal } from 'sweetalert2';

export const ListaAlumnos = ({ docente, curso, handleAsistencia }) => {

  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState({});

  let api = helpHttp();
  let url = `https://testunsaac.herokuapp.com/api/matriculas/mis-cursos/${docente}`;

  useEffect(() => {
    api.get(url)
      .then(data => {
        setAlumnos(data);
        data = data.filter(el => { return el.curso.nombre == curso });
        data = data.at(0).alumno.reduce((acc, el) => acc.concat(el.nombre), []);
        setAlumnos([...data]);
      })
  }, []);

  useEffect(() => {
    let lista_asistencia = [];
    for (let el of alumnos) {
      lista_asistencia.push({ name: el, asistencias: [{ date: new Date(), flag: false }] })
    }
    setAsistencias(lista_asistencia)
  }, [alumnos]);

  const handleChecked = (e) => {
    let nuevaAsistencia = asistencias;
    for (let el of nuevaAsistencia) {
      if (el.name == e.target.name) {
        el.asistencias[0].flag = e.target.checked ? true : false;
        break;
      }
    }
    setAsistencias(nuevaAsistencia);
  }



  return (
    <div className={sty.container}>
      <p className={sty.container_title}>Lista de estudiantes:</p>
      <ol className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className=''>Nombre</div>
          <div>Asistencia</div>
        </li>
      </ol>
      <ol className="list-group list-group-numbered">
        {alumnos.map(el => typeof el == "string" ?
          (
            <li className="list-group-item d-flex justify-content-between align-items-start" key={el}>
              <div className='ms-2 me-auto'>
                <label htmlFor={el} className=''>{el}</label>
              </div>
              <div className=''>
                <input className='form-check-input' type='checkbox' id={el} name={el} value='jojo' onChange={e => handleChecked(e)} />
              </div>
            </li>
          )
          :
          <p>Cargando ...</p>)}
      </ol>

      <div className={sty.container_btn_submit}>
        <button onClick={(e) => handleAsistencia(e, asistencias, docente)} className={sty.btn_submit}>
          Registrar Asistencia
        </button>
      </div>
    </div>
  )
}

