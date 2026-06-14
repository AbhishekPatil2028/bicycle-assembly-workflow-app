import {

  useEffect,

  useState

} from "react";


import {

  useNavigate

} from "react-router-dom";


import {

  getReadyBicycles

} from "../services/readyBicycleServices";


import BicycleCard
from "../components/bicycles/BicycleCard";


function ReadyBicyclesPage() {

  const navigate =
    useNavigate();


  const [bicycles,
    setBicycles] =

    useState([]);


  useEffect(() => {

    fetchReadyBicycles();

  }, []);


  const fetchReadyBicycles =
    async () => {

      try {

        const data =
          await getReadyBicycles();

        setBicycles(data);

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <div className="p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold text-gray-800">

            Ready To Dispatch Bicycles

          </h1>


          <button

            onClick={() =>
              navigate("/dashboard")
            }

            className="bg-black text-white px-5 py-3 rounded-lg"
          >

            Back To Dashboard

          </button>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {bicycles.map((bicycle) => (

            <BicycleCard

              key={bicycle.id}

              bicycle={bicycle}

              navigate={navigate}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default ReadyBicyclesPage;