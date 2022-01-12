// codDocente: consolaSeleccionada.codDocente,
// email: consolaSeleccionada.email,
// contrasenia: consolaSeleccionada.contrasenia,
// nombre: consolaSeleccionada.nombre,
// apellido: consolaSeleccionada.apellido,
// sexo: consolaSeleccionada.sexo,
// categoria: consolaSeleccionada.categoria,
// esAdmin: consolaSeleccionada.esAdmin,
// telefono: consolaSeleccionada.telefono,


import React, { useEffect, useState } from "react"
// import './Docentes.css'
//import Modal from '../../components/Modal'
import Swal from 'sweetalert2'
import { Button, Modal } from "react-bootstrap"
import Spinner from "../../components/Spinner"

const Modalv2 = ({ show, setShow, title, children, guardar = null, buttons = true }) => {
	const handleClose = () => {
		setShow(false)
	}
	const handleSave = () => {
		guardar()
		setShow(false)
	}
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{children}
				</Modal.Body>
				{
					buttons ?
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleSave}>
								Save Changes
							</Button>
						</Modal.Footer>
						:
						null
				}
			</Modal>
		</>
	)
}


export default function Docentes() {

	const url = 'https://testunsaac.herokuapp.com/api/docentes/'

	const [docentes, setdocentes] = useState()
	const [consolaSeleccionada, setConsolaSeleccionada] = useState({})
	const [stateModalNuevo, setStateModalNuevo] = useState(false)
	const [stateModalEditar, setStateModalEditar] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [csvDocentes, setCsvDocentes] = useState()
	const [showModalCSV, setShowModalCSV] = useState(false)
	const fetchApi = async () => {
		const response = await fetch(url)
		// console.log(response.statusText)
		const responseJSON = await response.json()
		setdocentes(responseJSON["docentes"])
		// console.log(responseJSON)
	}
	useEffect(() => {
		fetchApi()
	}, [])






	const handleInputChange = (event) => {
		setConsolaSeleccionada({
			...consolaSeleccionada,
			[event.target.name]: event.target.value
		})
		console.log(consolaSeleccionada)
	}


	/* metodos crud */
	const insertarNuevoDocente = () => {
		console.log("----insertar vista inputs")
		console.log(consolaSeleccionada)
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				codDocente: consolaSeleccionada.codDocente,
				email: consolaSeleccionada.email,
				contrasenia: consolaSeleccionada.contrasenia,
				nombre: consolaSeleccionada.nombre,
				apellido: consolaSeleccionada.apellido,
				sexo: consolaSeleccionada.sexo,
				categoria: consolaSeleccionada.categoria,
				esAdmin: (consolaSeleccionada.esAdmin == "true"),
				telefono: consolaSeleccionada.telefono,
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				fetchApi()
				setStateModalNuevo(!stateModalNuevo)
				// console.log("----vista datos..")
				// console.log(data)
			})
			.catch(error => console.log(error))
	}

	const editarDocente = (id) => {
		delete consolaSeleccionada._id
		console.log(consolaSeleccionada)
		fetch(url + id, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				codDocente: consolaSeleccionada.codDocente,
				email: consolaSeleccionada.email,
				contrasenia: consolaSeleccionada.contrasenia,
				nombre: consolaSeleccionada.nombre,
				apellido: consolaSeleccionada.apellido,
				sexo: consolaSeleccionada.sexo,
				categoria: consolaSeleccionada.categoria,
				esAdmin: consolaSeleccionada.esAdmin,
				telefono: consolaSeleccionada.telefono,
			})
		})
			.then(response => response.json())
			.then(data => {
				fetchApi()
				setStateModalEditar(!stateModalEditar)
				console.log("Curso Editado", data)
			})
			.catch(error => console.log(error))
	}

	const eliminarDocente = (id) => {
		fetch(url + id, {
			method: 'DELETE'
		})
			.then(res => fetchApi())
			.then(res => console.log(res))
	}


	// ****
	// consumir csv
	// ****

	const leercsv = (evt) => {
		console.log("on change jaja")
		let file = evt.target.files[0]
		let reader = new FileReader();
		reader.onload = (e) => {
			// cuando el archivo se termina de cargar
			let txt = e.target.result
			var buscar = "\r"
			txt = txt.replace(new RegExp(buscar, "g"), "")
			setCsvDocentes(txt)

		}
		// leeemos el contenido del archivo seleccionado
		if (file) { reader.readAsText(file) }
		// console.log(csvDocentes)
	}
	const csvToArray = () => {
		const delimiter = ","
		const str = csvDocentes
		// console.log(str)
		if (csvDocentes) {
			const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
			const rows = str.slice(str.indexOf("\n") + 1).split("\n");
			const arr = rows.map(function (row) {
				const values = row.split(delimiter);
				const el = headers.reduce(function (object, header, index) {
					object[header] = values[index];
					return object;
				}, {});
				return el;
			});

			return arr
		}

		// console.log(arr)
		return null

	}


	const post = (data) => {
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				fetchApi()
				// console.log("----vista datos..")
				// console.log(data)
			})
			.catch(error => console.log("error no se envio"))
	}

	const enviarCsvDocentes = () => {
		console.log("click enviar csv ")
		const array = csvToArray()
		// console.log(array[1])
		// console.log("----insertar vista inputs")
		// console.log(consolaSeleccionada)
		if (array) {
			for (var i = 0; i < array.length; i++) {
				var datos = array[i]
				console.log("send data >>>", datos)
				post(datos)
			}

			Swal.fire(
				'Registro Agregado',
				'fue agregado correctamente',
				'success'
			)
		}
		else { alert("no se pudo subir...") }
		setCsvDocentes(null)
		// var datos = array[0]
		// console.log(datos)
		// post(datos)
	}
	//     nombre,profesion,ocupacion
	// roberto,ingeniero,cabinero
	// carla,administradora,cajera



	return (
		<>
			{/* <div className="row">
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">Primary Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <a className="small text-white stretched-link" href="#">View Details</a>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                        <div className="card-body">Warning Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <a className="small text-white stretched-link" href="#">View Details</a>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                        <div className="card-body">Success Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <a className="small text-white stretched-link" href="#">View Details</a>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                        <div className="card-body">Danger Card</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <a className="small text-white stretched-link" href="#">View Details</a>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div> */}


			{/* <div className="row">
                    <div className="col">col</div>
                    <div className="col">col</div>
                    <div className="col">col</div>
									</div> */}
			<div className="container-fluid">
				<h1>Docentes</h1>
				<div className="d-flex w-100">
					<div className="w-75">
						<input className="form-control" type="text" placeholder="Search for name..." aria-label="Search for..." aria-describedby="btnNavbarSearch" onChange={(event) => { setSearchTerm(event.target.value) }} />
					</div>
					<div className="btn-group w-25 ms-1">
						<button className="btn btn-outline-secondary" type="button" onClick={() => {
							setStateModalNuevo(!stateModalNuevo)
							setConsolaSeleccionada({})
						}}>
							Nuevo docente
						</button>
						<button className="w-25 btn btn-success" type="button" onClick={() => setShowModalCSV(true)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
								<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
							</svg>
						</button>
					</div>
				</div>

				<div className="">
					<div className="table-responsive">
						{
							!docentes
								?
								<Spinner marginTop={5} />
								:
								<table className="table">
									<thead>
										<tr>
											<th>Codigo</th>
											<th>Email</th>
											<th>Nombre</th>
											<th>Apellido</th>
											<th>Categoria</th>
											<th>Telefono</th>
										</tr>
									</thead>
									<tbody>
										{
											// search(
											docentes &&
											docentes.filter((val) => {
												if (searchTerm == "") {
													return val
												} else if (val.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
													return val
												}
											}).map((docent, index) => (
												<tr className={docent.esAdmin ? 'bg-success bg-opacity-25' : null} key={docent._id}>
													<td>{docent.codDocente}</td>
													<td>{docent.email}</td>
													<td>{docent.nombre}</td>
													<td>{docent.apellido}</td>
													<td>{docent.categoria}</td>
													<td>{docent.telefono}</td>

													<td>
														<button className="btn btn-primary" onClick={
															() => {
																setStateModalEditar(!stateModalEditar)
																setConsolaSeleccionada(docent)

															}} >
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
																<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
																<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
															</svg>
														</button>
													</td>

													<td>
														<button className="btn btn-danger" onClick={() => eliminarDocente(docent._id)} >
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
																<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
																<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
															</svg>
														</button>
													</td>
												</tr>
											))
										}
									</tbody>
								</table>
						}
					</div>
				</div>







				{/* <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-primary text-white mb-4">
                            <div className="card-body">Primary Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-warning text-white mb-4">
                            <div className="card-body">Warning Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-success text-white mb-4">
                            <div className="card-body">Success Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-danger text-white mb-4">
                            <div className="card-body">Danger Card</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">View Details</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div> */}

			</div>







			{
				// console.log(docentes)
			}





			<Modalv2
				show={stateModalNuevo}
				setShow={setStateModalNuevo}
				title="Nuevo docente"
				buttons={false}
			>
				<div className="Contenido">
					<form >
						<div className="form__grupo">
							<div className="item1">
								<label>Cod docente</label>
								<input
									className="field"
									type="search"
									name="codDocente"
									autoComplete="off"
									onChange={handleInputChange} required />
							</div>
							<div className="item2">
								<label>Email</label>
								<input
									className="field"
									type="search"
									name="email"
									autoComplete="off"
									onChange={handleInputChange} required />
							</div>
						</div>
						<label>Contraseña</label>
						<input
							className="field"
							type="search"
							name="contrasenia"
							autoComplete="off"
							onChange={handleInputChange} required />
						<label>Nombre</label>
						<input
							className="field"
							type="search"
							name="nombre"
							autoComplete="off"
							onChange={handleInputChange} required />
						<label>Apellido</label>
						<input
							className="field"
							type="search"
							name="apellido"
							autoComplete="off"
							onChange={handleInputChange} required />
						<div className="form__grupo">
							<div className="item1">
								<label>Sexo</label>
								{/* <input
                                    className="field"
                                    type="search"
                                    name="sexo"
                                    autoComplete="off"
                                    onChange={handleInputChange} required /> */}
								<select className="field" name="sexo" onChange={handleInputChange}>
									<option value='otro'>Otro</option>
									<option value="masculino">Masculino</option>
									<option value="femenino">Femenino</option>
								</select>
							</div>
							<div className="item1">
								<label>Categoria</label>
								{/* <input 
                                    className="field" 
                                    type="search" 
                                    name="categoria" 
                                    autoComplete="off" 
                                    onChange={handleInputChange} required /> */}
								<select className="field" name="categoria" onChange={handleInputChange}>
									<option value=''>...elige</option>
									<option value="Nombrado">Nombrado</option>
									<option value="Contratado">Contratado</option>
								</select>
							</div>
							{/* <select id="inputState" className="form-control field" type="search" name="esAdmin" autoComplete="off" onChange={handleInputChange}>
                                <option selected>False</option>
                                <option>True</option>
                            </select> */}
							<div className="item">
								<label>esadmin</label>
								{/* <input
                                    className="field"
                                    type="search"
                                    name="esAdmin"
                                    autoComplete="off"
                                    onChange={handleInputChange} required /> */}
								<select className="field" name="esAdmin" onChange={handleInputChange}>
									<option value="false">No</option>
									<option value="true">Si</option>
								</select>
							</div>
						</div>
						<label>Telefono</label>
						<input
							className="field"
							type="search"
							name="telefono"
							autoComplete="off"
							onChange={handleInputChange} required />
						<button
							className="btn btn-success"
							type="button"
							// value="Submit"
							// onClick={() => {
							//     insertarNuevoDocente()
							//     setConsolaSeleccionada({})
							// }}
							onClick={() => {
								insertarNuevoDocente()
								setConsolaSeleccionada({})
							}}
						>Guardar Docente</button>
					</form>
				</div>
			</Modalv2>


			<Modalv2
				show={stateModalEditar}
				setShow={setStateModalEditar}
				title="Editar docente"
				buttons={false}
			>
				<div className="Contenido">

					<form >
						<div className="form__grupo">
							<div className="item1">
								<label>Cod docente</label>
								<input
									className="field"
									type="search"
									name="codDocente"
									autoComplete="off"
									value={consolaSeleccionada.codDocente} required onChange={handleInputChange} />
							</div>
							<div className="item2">
								<label>Email</label>
								<input
									className="field"
									type="search"
									name="email"
									autoComplete="off"
									value={consolaSeleccionada.email} required onChange={handleInputChange} />
							</div>
						</div>
						<label>Contraseña</label>
						<input
							className="field"
							type="search"
							name="contrasenia"
							autoComplete="off"
							value={consolaSeleccionada.contrasenia} required onChange={handleInputChange} />
						<label>Nombre</label>
						<input
							className="field"
							type="search"
							name="nombre"
							autoComplete="off"
							value={consolaSeleccionada.nombre} required onChange={handleInputChange} />
						<label>Apellido</label>
						<input
							className="field"
							type="search"
							name="apellido"
							autoComplete="off"
							value={consolaSeleccionada.apellido} required onChange={handleInputChange} />
						<div className="form__grupo">
							<div className="item1">
								<label>Sexo</label>
								{/* <input
                                    className="field"
                                    type="search"
                                    name="sexo"
                                    autoComplete="off"
                                    value={consolaSeleccionada} required onChange={handleInputChange}/> */}
								<select className="field" name="sexo" value={consolaSeleccionada.sexo} onChange={handleInputChange}>
									<option value='otro'>Otro</option>
									<option value="masculino">Masculino</option>
									<option value="femenino">Femenino</option>
								</select>
							</div>
							<div className="item1">
								<label>Categoria</label>
								{/* <input 
                                    className="field" 
                                    type="search" 
                                    name="categoria" 
                                    autoComplete="off" 
                                    value={consolaSeleccionada} required onChange={handleInputChange}/> */}
								<select className="field" name="categoria" value={consolaSeleccionada.categoria} onChange={handleInputChange}>
									<option value=''>...elige</option>
									<option value="Nombrado">Nombrado</option>
									<option value="Contratado">Contratado</option>
								</select>
							</div>
							{/* <select id="inputState" className="form-control field" type="search" name="esAdmin" autoComplete="off" value={consolaSeleccionada}>
                                <option selected>False</option>
                                <option>True</option>
                            </select> */}
							<div className="item">
								<label>esadmin</label>
								{/* <input
                                    className="field"
                                    type="search"
                                    name="esAdmin"
                                    autoComplete="off"
                                    value={consolaSeleccionada} required onChange={handleInputChange}/> */}
								<select className="field" name="esAdmin" value={consolaSeleccionada.esAdmin} onChange={handleInputChange}>
									<option value="false">False</option>
									<option value="true">True</option>
								</select>
							</div>
						</div>
						<label>Telefono</label>
						<input
							className="field"
							type="search"
							name="telefono"
							autoComplete="off"
							value={consolaSeleccionada.telefono} required
							onChange={handleInputChange} />

						<button
							className="btn btn-success"
							type="button"
							onClick={() => {
								editarDocente(consolaSeleccionada._id)
							}}
						>Editar Docente</button>
					</form>
				</div>
			</Modalv2>

			<Modalv2
				show={showModalCSV}
				setShow={setShowModalCSV}
				title="Importar docentes"
				buttons={false}
			>
				<input type="file" className="form-control" id="customFile" accept=".csv" onChange={leercsv} />
				<button type="button" className="btn btn-success" onClick={() => enviarCsvDocentes()}>Importar</button>
			</Modalv2>
		</>
	)
}










