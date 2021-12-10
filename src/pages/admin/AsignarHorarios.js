

//function flecha please
import {fetchSinToken} from "../../helpers/fetch";
import {useEffect, useState} from "react";
import './AsignarHorarios.css'
import {Button, Modal} from "react-bootstrap";
import {useForm} from "../../hooks/useForm";
import Swal from 'sweetalert2'
export default function AsignarHorarios() {

    // const[info,setInfo]=useState({
    //     _id:'',
    //     usuario:{
    //         _id:'',
    //         nombre:'',
    //         apellido:''
    //     },
    //     curso:{
    //         _id:'',
    //         nombre:'',
    //
    //     }
    // })
    const[flagadd,setFlagadd]=useState(false)
    const[flagup,setFlagup]=useState(false)
    const[info,setInfo]=useState({
            _id:'',
            usuario:{
                _id:'',
                nombre:'',
                apellido:''
            },
            curso:{
                _id:'',
                nombre:'',

            }
        })
    const[matricula,setMatricula]=useState(null)
    const[docente,setDocente]=useState(null)
    const[cursos,setCursos]=useState(null)

    const[valueup,setValueup]=useState({
        idDocente:'',
        nombreDocente:'',
        idCurso:'',
        nombreCurso:'',
        iduser:''

    })
    const[flag,setFlag]=useState(false)


    // const[test,setTest]=useState({id_docente: '', id_curso: '', hola: ''})
    const [show, setShow] = useState(false);
    const [values,handleInputChange]=useForm({
        id_docente:'',
        id_curso:'',

    })
    const {id_docente,id_curso}=values
    const requestBody={
        usuario:id_docente,
        curso:id_curso
    }

    useEffect(()=>{
        (async ()=>{
            const resp= await fetchSinToken('matriculas')
            const resp2= await fetchSinToken('docentes')
            const resp3= await fetchSinToken('cursos')

            const body= await resp.json();
            const body2= await resp2.json();
            const body3= await resp3.json();

            if(body.ok){
                setMatricula(body.matriculas);
                console.log( body.matriculas)
            }
            if(body2.ok){
                setDocente(body2.docentes)
                console.log( body2.docentes)
            }
            if(body3){
                setCursos(body3)
                console.log( body3)

            }

        })()

    },[])
    // useEffect(()=>{
    //     setMatricula(matricula.concat(info))
    // },[info])
    const handleClose = (e) => {

        e.preventDefault()
        // const objeto={nombre:e.target.value}
        // console.log(test)
        const post=fetchSinToken('matriculas',requestBody,'POST')
            post.then(data=>{
                return data.json()

                // console.log(JSON.stringify(data.body))
                //TODO: update the page when I add a new register
            }).then(data=>{

                let tempNombre='';
                let tempApellido='';
                let tempCurso='';
                let id_curso='';
                let id_user='';
                for(let i=0;i<docente.length;i++){
                    if (data.matricula.usuario===docente[i]._id) {
                        tempNombre = docente[i].nombre
                        tempApellido = docente[i].apellido
                        id_user = docente[i]._id
                        console.log(docente[i].nombre)
                    }
                        // setMatricula(matricula.concat(data.matricula))
                }
                for(let i=0;i<cursos.length;i++){
                    if (data.matricula.curso===cursos[i]._id){
                        tempCurso=cursos[i].nombre
                    id_curso=cursos[i]._id
                    console.log(cursos[i].nombre)}
                    // setMatricula(matricula.concat(data.matricula))
                }

                setInfo({
                    _id:data.matricula._id,
                    usuario:{
                        _id:id_user,
                        nombre:tempNombre,
                        apellido:tempApellido
                    },
                    curso:{
                        _id:id_curso,
                        nombre:tempCurso,

                    }

                })
                setFlagadd(true)
                setShow(false);
                Swal.fire(
                    'Registro Agregado',
                    'fue agregado correctamente',
                    'success'
                )

                // console.log(info._id,info.usuario.nombre,info.curso.nombre)
                // console.log(matricula)
            })


        console.log(id_docente+id_curso+'este es el real')
        // console.log(info)
        // setMatricula(matricula.concat(info))

    }

    //TODO: post many data and make post
    if(flagadd===true){
        setMatricula(matricula.concat(info))
        setFlagadd(false)
    }if (flagup===true){
        let dataNueva=matricula
        dataNueva.map(mat=>{
            if(mat._id ===info._id){

                mat.usuario.nombre=info.usuario.nombre
                mat.usuario.apellido=info.usuario.apellido
                mat.curso.nombre=info.curso.nombre
                // console.log(valueup)
            }
        })
        console.log(info)

        setMatricula(dataNueva)
        setFlagup(false)

    }


    const handleCloses = () => (setShow(false))
    const handleShow = () => setShow(true);
    const selectMat= (id)=>{
        const item=matricula[id];

        const {_id,usuario:{_id:idDocente},usuario:{nombre:nombreDocente},curso:{nombre:nombreCurso},curso:{_id:idCurso}}=item;
        setValueup({iduser:_id,idDocente:idDocente,nombreCurso:nombreCurso,nombreDocente:nombreDocente,idCurso:idCurso})
        values.id_curso=idCurso
        values.id_docente=idDocente
        // handleInputChange({usuario: idDocente,curso:idCurso})
        setFlag(true)


        console.log(valueup.iduser,valueup.nombreDocente,valueup.idDocente,valueup.idCurso,valueup.nombreCurso);
        setShow(true)
        console.log(docente.length)

    }
    const deleteMat=(id)=>{

        Swal.fire({
            title: 'Borrar Registro?',
            text: `Esta a punto de borrar el registro`,
            icon: 'question',
            showCancelButton: true,

            confirmButtonText: 'Si,borrarlo'
        }).then((result) => {
            if (result.value) {
                const delet=fetchSinToken(`matriculas/${id}`,requestBody,'DELETE')
                delet.then(data=>{
                    console.log(data)
                    let dat =matricula
                    setMatricula(dat.filter(arr=>arr._id!==id))
                    console.log(dat)
                    Swal.fire(
                        'Registro borrado',
                        ` fue eliminado correctamente`,
                        'success'
                    )

                })
            }
        })

    }
    const updateMat=(e)=>{

        e.preventDefault()
        console.log(valueup.iduser)
        const put=fetchSinToken(`matriculas/${valueup.iduser}`,requestBody,'PUT')

        put.then(data=>{
            return data.json()
                .then(data=>{
                    console.log(data)
                    let tempNombre='';
                    let tempApellido='';
                    let tempCurso='';
                    let id_curso='';
                    let id_user='';
                    for(let i=0;i<docente.length;i++){
                        if (data.matricula.usuario===docente[i]._id){
                            tempNombre=docente[i].nombre
                        tempApellido=docente[i].apellido
                        id_user=docente[i]._id
                            console.log(docente[i].nombre)}
                        // console.log(docente[i].nombre)
                        // setMatricula(matricula.concat(data.matricula))
                    }
                    for(let i=0;i<cursos.length;i++){
                        if (data.matricula.curso===cursos[i]._id){
                            tempCurso=cursos[i].nombre
                            id_curso=cursos[i]._id
                            console.log(cursos[i].nombre)
                        }

                        // setMatricula(matricula.concat(data.matricula))
                    }
                    console.log(tempCurso)

                    setInfo({
                            _id:data.matricula._id,
                            usuario:{
                                _id:id_user,
                                nombre:tempNombre,
                                apellido:tempApellido
                            },
                            curso:{
                                _id:id_curso,
                                nombre:tempCurso,

                            }
                        })
                    setFlagup(true)
                    Swal.fire(
                        'Registro Actualizado',
                        'fue actualizado correctamente',
                        'success'
                    )
                    // console.log(dataNueva)
                })

            //TODO: update the page when I add a new register
        })
        setShow(false)

        // console.log(id_docente+id_curso+'este es el real')

    }

    const handleAdd=()=>{
        handleShow()
        setFlag(false)
    }


    // console.log(info)


    // console.log(data.usuario)
    return (
        // <div className="flex ">
        <div className="container ">
                <h1>Asignar Horario</h1>
                <button className="btn btn-success m-2" onClick={handleAdd}>
                    AGREGAR
                </button>
                <div className="table-responsive" >
                    {/*className="table table-bordered table-striped "*/}
                    <table className="table  tbody " >
                        <thead>
                        <tr className="bg-success" >
                            <th>#</th>
                            <th style={{width:'200px'}} >Nombre</th>
                            <th  style={{width:'200px'}} >Apellidos</th>
                            <th style={{width:'200px'}} >Course</th>
                            <th  style={{width:'200px'}} >Acciones</th>


                        </tr>
                        </thead>
                        <tbody>
                        {

                            matricula&&(
                                matricula.map((mat,i)=>{
                                        return (
                                        <tr key={mat._id}>
                                            {
                                                ( (mat.usuario===null)?
                                                    <td ></td>
                                                :
                                                <td  >{i}</td>)}
                                                <td>{mat.usuario?.nombre}</td>
                                                <td>{mat.usuario?.apellido}</td>
                                            {/*/!*((mat.curso.nombre)?(*!/*/}
                                            {/*/!*<td>{mat.curso.nombre}</td>*!/*/}
                                            {/*/!*):*!/*/}
                                            {/*/!*{((mat.curso)===null)?(<td>{mat.curso.nombre}</td>):(<td>no</td>)}*!/*/}
                                                <td>{mat.curso?.nombre}</td>
                                            {/*/!*<td></td>*!/*/}
                                                <td>
                                                <i className="fas fa-trash w-50" onClick={()=>deleteMat(mat._id)}></i>

                                                <i className="fas fa-edit" onClick={()=>selectMat(i)}></i>
                                                </td>
                                        </tr>
                                        )
                                    }
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
            <Modal show={show} onHide={handleCloses}>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar curso a docente</Modal.Title>
                </Modal.Header>
                <form>
                <Modal.Body>

                        <div className="form-group">
                            <label >Docente</label>
                            <div className="input-group">
                                <select  className="form-control" name='id_docente' onChange={handleInputChange} >
                                    {
                                        (flag===true)?
                                            <option  value={valueup.idDocente} >{valueup.nombreDocente}</option>
                                            :
                                            <option value=''>...cargando</option>

                                    }
                                    {/*<option value={(flag===true)?valueup.idDocente:''}>{(flag===true)?JSON.stringify(valueup.nombreDocente):''}</option>*/}
                                    {
                                        docente&&(
                                            docente.map(doc=>(
                                                <option key={doc._id} value={doc._id}>{doc.nombre}</option>

                                            )))
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="form-group">
                            <label>Curso</label>
                            <div className="input-group">

                            <select className="form-control" name='id_curso' onChange={handleInputChange}>
                                {
                                    (flag===true)?
                                        <option value={valueup.idCurso} >{valueup.nombreCurso}</option>
                                        :
                                        <option value=''>...cargando</option>

                                }
                                {/*<option defaultValue={valueup.idCurso}>{valueup.nombreCurso}</option>*/}
                                {
                                    cursos&&(
                                        cursos.map(cur=>(
                                            <option key={cur._id} value={cur._id}>{cur.nombre}</option>
                                        )))
                                }
                            </select>
                            </div>
                        </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloses}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={(flag===true)?updateMat : handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
                 </form>
            </Modal>



        </div>
        // </div>
    )
}
