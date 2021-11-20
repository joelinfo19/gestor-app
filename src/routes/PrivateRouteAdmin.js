/*react v6 redirect is navigate*/
import { Route, Routes, Navigate } from "react-router"

export default function PrivateRouteAdmin({children}) {

    const user = { id: 15 };
    // const user = null;

    return user ? children : <Navigate to="/" /> /*la ruta / es el login*/

}
