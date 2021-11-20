import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import DashRutasAdmin from "./DashRutasAdmin";
import DashRutas from "./DashRutasAdmin";

export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/user/*" element={<DashRutas />} />
                    <Route path="/admin/*" element={<DashRutasAdmin />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

