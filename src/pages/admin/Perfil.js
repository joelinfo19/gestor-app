import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
// import './Perfil.css'
import Swal from 'sweetalert2'

export default function Perfil() {

   const profileDefault = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

   const [formChange, setFormChange] = useState({})
   const [huboCambios, setHuboCambios] = useState(false)
   const [huboCambiosImagen, setHuboCambiosImagen] = useState(false)
   const [profileImg, setProfileImg] = useState(profileDefault)
   // const [profilePreview, setProfilePreview] = useState(null)

   const handleInputChange = (event) => {
      setHuboCambios(true)
      setFormChange({
         ...formChange,
         [event.target.name]: event.target.value
      })
   }

   let emailLocal = "none"
   let nombreLocal = "none"
   let apellidoLocal = "none"
   let sexoLocal = "none"
   let telefonoLocal = "none"
   let contraseniaLocal = "none"
   let imgLocal = profileDefault

   const user = JSON.parse(localStorage.getItem("user"))
   if (user) {
      // console.log(nombre)
      emailLocal = user.email
      nombreLocal = user.nombre
      apellidoLocal = user.apellido
      sexoLocal = user.sexo
      telefonoLocal = user.telefono
      contraseniaLocal = user.contrasenia
      imgLocal = user.img ? user.img : null
      // console.log("mostrando user",nombre)
   } else { console.log("no hay user") }

   const url = 'https://testunsaac.herokuapp.com/api/docentes/'
   const fetchApi = async () => {
      const response = await fetch(url)
      // console.log(response.statusText)
      // const responseJSON = await response.json()

      // console.log(responseJSON)
   }
   useEffect(() => {
      fetchApi()
      setFormChange(user)
   }, [])


   const editarImagenDocente = () => {
      uploadImage(profileImg)
      alert("se subio tu foto... PRESIONA SAVE CHANGES")
   }



   const editarPerfilDocente = (id) => {

      // delete consolaSeleccionada._id
      console.log(formChange)
      fetch(url + id, {
         method: 'PUT',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify({
            email: formChange.email,
            // contrasenia: consolaSeleccionada.contrasenia,
            nombre: formChange.nombre,
            apellido: formChange.apellido,
            sexo: formChange.sexo,
            telefono: formChange.telefono,
            img: localStorage.getItem("passportUrl")
         })
      })
         .then(response => response.json())
         .then(data => {
            fetchApi()
            // Swal.fire(
            //    'Registro Actualizado',
            //    'fue actualizado correctamente',
            //    'success'
            // )
            let passURL = localStorage.getItem("passportUrl")
            if (passURL) {
               formChange.img = passURL
               localStorage.setItem('user', JSON.stringify(formChange))
               setHuboCambios(false)
            }
            localStorage.setItem('user', JSON.stringify(formChange))

            localStorage.removeItem("passportUrl")

            console.log("perfil Editado", data)

            Swal.fire({
               title: 'Registro Actualizado',
               text: 'Recargaremos la pagina',
               icon: 'success',
            }).then(({ value }) => {
               window.location.reload()
            });



         })
         .catch(error => console.log(error))
   }



   const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dk2cccyfr/image/upload';
   const CLOUDINARY_UPLOAD_PRESET = 'qwnddndo';

   const uploadImage = (img) => {
      console.log("subiendo imagen")
      const formData = new FormData();
      formData.append('file', img);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      fetch(CLOUDINARY_URL, {
         method: 'POST',
         body: formData,
      })
         .then(response => response.json())
         .then((data) => {
            if (data.secure_url !== '') {
               const uploadedFileUrl = data.secure_url;
               console.log("--- >guardando passportURL")
               localStorage.setItem('passportUrl', uploadedFileUrl);
            }
         })
         .catch(err => console.error(err));
   }




   const imageHandler = (e) => {
      const selected = e.target.files[0]
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"]
      if (selected && ALLOWED_TYPES.includes(selected.type)) {
         let reader = new FileReader()
         reader.onload = () => {
            setProfileImg(reader.result)
            console.log("se ha cambiado profile")
            setHuboCambiosImagen(true)
         }
         reader.readAsDataURL(selected)
      }
      else { alert("error true") }


      console.log("image handler")


   }

   return (
      <>
         {console.log(formChange)}
         <div className="container">
            <div className="main-body">

               {/* <!-- Breadcrumb --> */}
               <h1>Perfil</h1>

               <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                     <div className="card">
                        <div className="card-body">
                           <div className="d-flex flex-column align-items-center text-center">

                              <div className="mt-3">
                                 <h4>{formChange.nombre + " " + formChange.apellido}</h4>
                                 {/* <p className="text-secondary mb-1">Teacher</p>
                                 <p className="text-muted font-size-sm">Unsaac, Cusco, PE</p> */}
                              </div>

                              <div class="image-area mt-4 mb-4">
                                 <img
                                    id="imageResult"
                                    src={imgLocal}
                                    class="img-fluid rounded shadow-sm mx-auto d-block" />



                              </div>
                              <input id="upload" type="file" accept="image/*" class="form-control" onChange={imageHandler} />
                              {/* <input id="upload" type="file" accept=".jpg, .png, .jpeg" class="form-control" /> */}


                              {huboCambiosImagen && <p className="text-danger">Presiona Imagen Cambiada !!!</p>}
                              <button type="button"
                                 className="btn btn-success px-4"
                                 onClick={() => {
                                    editarImagenDocente()
                                 }}>Subir Foto</button>


                              {/* <img src="" alt="" /> */}
                              {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" /> */}






                           </div>
                        </div>
                     </div>


                  </div>


                  <div className="col-md-8">
                     <div className="card">
                        <div className="card-body">
                           <form action="">
                              <div className="row mb-3">
                                 <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                 </div>
                                 <div className="col-sm-9 text-secondary">
                                    <input name='email' type="text" className="form-control" defaultValue={emailLocal} onChange={handleInputChange} />
                                 </div>
                              </div>
                              <div className="row mb-3">
                                 <div className="col-sm-3">
                                    <h6 className="mb-0">Nombre</h6>
                                 </div>
                                 <div className="col-sm-9 text-secondary">
                                    <input name='nombre' type="text" className="form-control" defaultValue={nombreLocal} onChange={handleInputChange} />
                                 </div>
                              </div>
                              <div className="row mb-3">
                                 <div className="col-sm-3">
                                    <h6 className="mb-0">Apellido</h6>
                                 </div>
                                 <div className="col-sm-9 text-secondary">
                                    <input name='apellido' type="text" className="form-control" defaultValue={apellidoLocal} onChange={handleInputChange} />
                                 </div>
                              </div>
                              <div className="row mb-3">
                                 <div className="col-sm-3">
                                    <h6 className="mb-0">Sexo</h6>
                                 </div>
                                 <div className="col-sm-9 text-secondary">
                                    <input name='sexo' type="text" className="form-control" defaultValue={sexoLocal} onChange={handleInputChange} />
                                 </div>
                              </div>
                              <div className="row mb-3">
                                 <div className="col-sm-3">
                                    <h6 className="mb-0">Telefono</h6>
                                 </div>
                                 <div className="col-sm-9 text-secondary">
                                    <input name='telefono' type="text" className="form-control" defaultValue={telefonoLocal} onChange={handleInputChange} />
                                 </div>
                              </div>

                              {huboCambios && <p className="text-danger">Presiona para guardad cambios !!!</p>}
                              <div className="row">
                                 <div className="col-sm-3"></div>
                                 <div className="col-sm-9 text-secondary">
                                    <button type="button"
                                       className="btn btn-primary px-4"
                                       defaultValue="Save Changes"
                                       onClick={() => {
                                          editarPerfilDocente(formChange._id)

                                       }}> Save Changes </button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>



                  </div>
               </div>
            </div>
         </div>

      </>
   )

}

