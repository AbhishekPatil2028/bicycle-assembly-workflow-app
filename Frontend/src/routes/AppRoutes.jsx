import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";


import {

  lazy,

  Suspense

} from "react";


import ProtectedRoute
from "./ProtectedRoute";


const LoginPage =
  lazy(() =>
    import("../pages/LoginPage")
  );

const RegisterPage =
  lazy(() =>
    import("../pages/RegisterPage")
  );

const BicycleListPage =
  lazy(() =>
    import("../pages/BicycleListPage")
  );

const BicycleDetailsPage =
  lazy(() =>
    import("../pages/BicycleDetailsPage")
  );


function AppRoutes() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={

          <div className="flex justify-center items-center h-screen">

            <h1 className="text-3xl font-bold">

              Loading...

            </h1>

          </div>
        }
      >

        <Routes>

          <Route
            path="/"

            element={<LoginPage />}
          />


          <Route
            path="/register"

            element={<RegisterPage />}
          />


          <Route
            path="/bicycles"

            element={

              <ProtectedRoute>

                <BicycleListPage />

              </ProtectedRoute>
            }
          />


          <Route
            path="/bicycles/:id"

            element={

              <ProtectedRoute>

                <BicycleDetailsPage />

              </ProtectedRoute>
            }
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default AppRoutes;