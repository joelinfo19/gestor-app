/*react v6 redirect is navigate*/
import { Route, Routes, Navigate } from "react-router"

export default function PrivateRouteUser({ children, conRol }) {

     const user_log = JSON.parse(localStorage.getItem("user"))

     if (!user_log) return <Navigate to="/" />

     if (user_log) {
          const id_log = user_log._id
          const rol_log = user_log.esAdmin ? "admin" : "regular"
          // console.log(rol_log)

          const user = { id: id_log, rol: rol_log };
          console.log("user private", user)
          // const user = null; 

          console.log(user_log.rol, "==", conRol)

          if (conRol && user?.rol !== conRol) {
               return <Navigate to="/admin/perfil" />
          }
     }
     
     return (
          children
     )

}
