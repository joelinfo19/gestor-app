import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import DashRutas from "./DashRutas";

export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<DashRutas />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

