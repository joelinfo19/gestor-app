

//function flecha please
import {fetchSinToken} from "../../helpers/fetch";
import {useEffect, useState} from "react";

export default function AsignarHorarios() {

    const[data,setData]=useState(null)

    useEffect(()=>{
        (async ()=>{
            const resp= await fetchSinToken('matriculas')
            const body= await resp.json();
            if(body.ok){
                setData(body.matriculas);
                console.log( body.matriculas)
            }
        })()
    },[])
    // console.log(data.usuario)
    return (
        <div className="container">
            <h1>Asignar Horario</h1>
            {/*<i className="fas fa-trash"></i>*/}
            {/*<i className="fas fa-edit"></i>*/}
            <table className="table table-success">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Course</th>
                    <th scope="col">Item</th>

                    {/*<th scope="col">Handle</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                </tr>
                </thead>
                <tbody>
                {
                    data&&(
                        data.map(mat=>(
                            <tr key={mat._id}>

                                <th scope="row">{mat._id}</th>
                                <td>{mat.usuario.nombre}</td>
                                <td>{mat.usuario.apellido}</td>
                                <td >
                                        <select className="form-select" id="inputGroupSelect01">
                                            <option selected>Choose...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                </td>
                                <td>
                                    <i className="fas fa-trash"></i>
                                    <i className="fas fa-edit"></i>
                                </td>

                            </tr>
                        )
                    )
                    )

                }


                </tbody>
            </table>
        </div>
    )
}
