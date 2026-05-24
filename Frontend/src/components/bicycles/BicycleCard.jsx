import React from "react";

const BicycleCard = React.memo(({

  bicycle,

  navigate

}) => {

  return (

    <div

      onClick={() =>
        navigate(
          `/bicycles/${bicycle.id}`
        )
      }

      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-6 border border-gray-200"
    >

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold text-gray-800">

          {bicycle.name}

        </h2>

        <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">

          ID: {bicycle.id}

        </span>

      </div>


      <p className="text-gray-600 mb-3">

        Created At:

        <span className="font-medium ml-2">

          {new Date(
            bicycle.created_at
          ).toLocaleDateString()}

        </span>

      </p>


      <div className="mt-4">

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold

          ${bicycle.status === "Done"

            ? "bg-green-100 text-green-600"

            : "bg-yellow-100 text-yellow-700"
          }`}
        >

          {bicycle.status}

        </span>

      </div>

    </div>
  );
});

export default BicycleCard;