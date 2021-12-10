/*react v6 redirect is navigate*/
import { Route, Routes, Navigate } from "react-router"

export default function PrivateRouteAdmin({children, conRol}) {

    const user = { id: 15, rol:"admin" };
    // const user = null;

    // if (conRol && user?.rol !== conRol) return <Navigate to="/perfil" />
    //
    // if (user == null) return <Navigate to="/" />
    
    return (
          children
     )

}
