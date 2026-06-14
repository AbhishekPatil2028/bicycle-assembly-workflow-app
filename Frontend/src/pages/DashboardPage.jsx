import {

  useEffect,

  useState

} from "react";


import {

  useNavigate

} from "react-router-dom";


import {

  getDashboardData

} from "../services/dashboardService";


import DashboardCard
from "../components/dashboard/DashboardCard";

import DashboardHeader
from "../components/dashboard/DashboardHeader";


function DashboardPage() {

  const navigate =
    useNavigate();


  const [dashboardData,
    setDashboardData] =

    useState(null);


  useEffect(() => {

    fetchDashboardData();

  }, []);


  const fetchDashboardData =
    async () => {

      try {

        const data =
          await getDashboardData();

        setDashboardData(data);

      } catch (error) {

        console.log(error);
      }
    };


  if (!dashboardData) {

    return (

      <div className="flex justify-center items-center h-screen">

        <h1 className="text-3xl font-bold">

          Loading Dashboard...

        </h1>

      </div>
    );
  }


  return (

    <div className=" p-8">

      <div className="max-w-7xl mx-auto">

        <DashboardHeader
          navigate={navigate}
        />


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <DashboardCard

            title="Procurement"

            count={
              dashboardData.procurement
            }

            borderColor="border-yellow-400"

            textColor="text-yellow-500"
          />


          <DashboardCard

            title="Assembly"

            count={
              dashboardData.assembly
            }

            borderColor="border-blue-500"

            textColor="text-blue-500"
          />


          <DashboardCard

            title="Testing"

            count={
              dashboardData.testing
            }

            borderColor="border-purple-500"

            textColor="text-purple-500"
          />


          <DashboardCard

  title="Ready To Dispatch"

  count={
    dashboardData.ready_to_dispatch
  }

  borderColor="border-green-500"

  textColor="text-green-500"

  onClick={() =>
    navigate("/ready-bicycles")
  }
/>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;