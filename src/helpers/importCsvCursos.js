import {helpHttp} from './helpHttp';

let api = helpHttp();
const url = 'https://testunsaac.herokuapp.com/api/cursos/'

export default async function importarCursos(data){
  if(!data){ alert("Inserte CSV por favor"); return; }
  const cursos = data.split("\n");
  for(let i = 1; i < cursos.length-1; i++){
    let datosCurso = cursos[i].split(",");
    if(datosCurso.length != 12) return;
    let horarioCurso = [];

    if(datosCurso[6] !== ""){
      const fechas = datosCurso[6].trim().split("-");
      const fechaInicio = fechas[0];
      const fechaFin = fechas[1];
      horarioCurso.push({dia: "lunes", horaInicio: fechaInicio, horaFin: fechaFin});
    }

    if(datosCurso[7] !== ""){
      const fechas = datosCurso[7].trim().split("-");
      const fechaInicio = fechas[0];
      const fechaFin = fechas[1];
      horarioCurso.push({dia: "martes", horaInicio: fechaInicio, horaFin: fechaFin});
    }

    if(datosCurso[8] !== ""){
      const fechas = datosCurso[8].trim().split("-");
      const fechaInicio = fechas[0];
      const fechaFin = fechas[1];
      horarioCurso.push({dia: "miércoles", horaInicio: fechaInicio, horaFin: fechaFin});
    }

    if(datosCurso[9] !== ""){
      const fechas = datosCurso[9].trim().split("-");
      const fechaInicio = fechas[0];
      const fechaFin = fechas[1];
      horarioCurso.push({dia: "jueves", horaInicio: fechaInicio, horaFin: fechaFin});
    }

    if(datosCurso[10] !== ""){
      const fechas = datosCurso[10].trim().split("-");
      const fechaInicio = fechas[0];
      const fechaFin = fechas[1];
      horarioCurso.push({dia: "viernes", horaInicio: fechaInicio, horaFin: fechaFin});
    }

    if(datosCurso[11] !== ""){
      const fechas = datosCurso[11].trim().split("-");
      const fechaInicio = fechas[0];
      const fechaFin = fechas[1];
      horarioCurso.push({dia: "sábado", horaInicio: fechaInicio, horaFin: fechaFin});
    }

    datosCurso = {
      codigo: datosCurso[0],
      nombre: datosCurso[1],
      categoria: datosCurso[2],
      grupo: datosCurso[3],
      creditos: datosCurso[4],
      tipo: datosCurso[5],
      horario: horarioCurso,
    }
    let options = {body: datosCurso, headers: {"Content-type": "application/json"}};
    try{
      await api.post(url, options);
    } catch(err) {
      console.log(err);
    }
  }
}
