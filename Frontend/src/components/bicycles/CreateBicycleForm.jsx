function CreateBicycleForm({

  bicycleName,

  setBicycleName,

  handleCreateBicycle,

  createError

}) {

  return (

    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4 text-gray-800">

        Create Bicycle

      </h2>

      <form
        onSubmit={handleCreateBicycle}

        className="flex flex-col md:flex-row gap-4"
      >

        <input

          type="text"

          placeholder="Enter Bicycle Name"

          value={bicycleName}

          onChange={(e) =>
            setBicycleName(e.target.value)
          }

          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button

          type="submit"

          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
        >

          Create

        </button>

      </form>


      {createError && (

        <p className="text-red-500 mt-3">

          {createError}

        </p>
      )}

    </div>
  );
}

export default CreateBicycleForm;