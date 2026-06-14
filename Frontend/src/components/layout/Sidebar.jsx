import {

  NavLink

} from "react-router-dom";


function Sidebar() {

  return (

    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-10">

        Dashboard

      </h2>


      <div className="flex flex-col gap-4">

        <NavLink

          to="/dashboard"

          className={({ isActive }) =>

            `px-4 py-3 rounded-xl transition duration-300

            ${isActive

              ? "bg-blue-600"

              : "hover:bg-gray-800"
            }`
          }
        >

          Production Dashboard

        </NavLink>


        <NavLink

          to="/bicycles"

          className={({ isActive }) =>

            `px-4 py-3 rounded-xl transition duration-300

            ${isActive

              ? "bg-blue-600"

              : "hover:bg-gray-800"
            }`
          }
        >

          Bicycle Management

        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;