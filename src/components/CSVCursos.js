import React, {useState} from 'react';
import importarCursos from '../helpers/importCsvCursos';

export default function CSVCursos(){

  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await importarCursos(data);
      alert("Datos agregados");
    } catch(err) {
      alert("Inserte un CSV correcto por favor");
    }
  }


  const importarCsvCursos = (e) => {
    setData({file: e.target.files[0], result: e.target.result});
    const archivo = e.target.files[0];
    if(!archivo){
      return false;
    }
    const lector = new FileReader();
    lector.onload = function(){
      const contenido = lector.result;
      setData(contenido);
    }
    lector.readAsText(archivo);
  }


  const styles_container = {
    margin: "2em",
    padding: "1em",
    border: "1px solid #1a8754",
    borderRadius: "4px",
    width: "50%",
  }

  const styles_container_submit = {
    backgroundColor: "#1a8754",
    color: "#fff",
    borderRadius: "4px",
    padding: "9px",
    margin: "4px",
  }

  return(
    <div style={styles_container}>
      <form onSubmit={handleSubmit}>
        <label>Importar cursos: </label>
        <input type="file" onMouseOut={importarCsvCursos}/>
        <input type="submit" style={styles_container_submit}value="importar"/>
      </form>
    </div>
  )
}
