function DashboardHeader({

  navigate

}) {

  return (

    <div className="flex justify-between items-center mb-10">

      <h1 className="text-5xl font-bold text-gray-800">

        Production Dashboard

      </h1>


      <button

        onClick={() =>
          navigate("/bicycles")
        }

        className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition duration-300"
      >

        Back To Bicycles

      </button>

    </div>
  );
}

export default DashboardHeader;