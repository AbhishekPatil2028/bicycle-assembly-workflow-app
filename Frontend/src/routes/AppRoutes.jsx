import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import RegisterPage from "../pages/RegisterPage"
import LoginPage from '../pages/LoginPage'
import BicycleListPage from '../pages/BicycleListPage'
import BicycleDetailsPage from '../pages/BicycleDetailsPage'
import ProtectedRoute from "./ProtectedRoute"

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route
            path="/"
            element={<LoginPage/>}
            />

            <Route
            path="/register"
            element={<RegisterPage/>}
            />

            <Route
            path="/bicycles"
            element={
                <ProtectedRoute>

                    <BicycleListPage/>
                </ProtectedRoute>
        }
            />

            <Route
            path="/bicycles/:id"
            element={
                <ProtectedRoute>

                    <BicycleDetailsPage/>
                </ProtectedRoute>
        }
            />
        </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;