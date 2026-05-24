function PageHeader({

  title,

  buttonText,

  onButtonClick

}) {

  return (

    <div className="flex justify-between items-center mb-8">

      <h1 className="text-4xl font-bold text-gray-800">

        {title}

      </h1>

      <button

        onClick={onButtonClick}

        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold transition duration-300"
      >

        {buttonText}

      </button>

    </div>
  );
}

export default PageHeader;