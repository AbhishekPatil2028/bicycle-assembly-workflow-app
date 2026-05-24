function BicycleHeader({
  bicycle
}) {

  return (

    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">

      <h1 className="text-4xl font-bold mb-4">

        Bicycle Details

      </h1>

      <h2 className="text-2xl font-semibold">

        {bicycle.name}

      </h2>

      <p className="mt-2 text-lg">

        Status:

        <span className="font-bold text-blue-600 ml-2">

          {bicycle.status}

        </span>

      </p>

    </div>
  );
}

export default BicycleHeader;