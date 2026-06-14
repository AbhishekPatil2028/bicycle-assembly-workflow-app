import { BrowserRouter, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

const LoginPage = lazy(() => import("../pages/LoginPage"));

const RegisterPage = lazy(() => import("../pages/RegisterPage"));

const BicycleListPage = lazy(() => import("../pages/BicycleListPage"));

const BicycleDetailsPage = lazy(() => import("../pages/BicycleDetailsPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ReadyBicyclesPage =
  lazy(() =>
    import("../pages/ReadyBicyclesPage")
  );
function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/bicycles"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BicycleListPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

  <AppLayout>

    <DashboardPage />

  </AppLayout>

</ProtectedRoute>
            }
          />

          <Route
  path="/ready-bicycles"

  element={

    <ProtectedRoute>

      <AppLayout>

        <ReadyBicyclesPage />

      </AppLayout>

    </ProtectedRoute>
  }
/>

          <Route
            path="/bicycles/:id"
            element={
              <ProtectedRoute>

  <AppLayout>

    <BicycleDetailsPage />

  </AppLayout>

</ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
