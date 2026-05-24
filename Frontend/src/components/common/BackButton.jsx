function BackButton({
  onClick
}) {

  return (

    <button

      onClick={onClick}

      className="mb-6 bg-gray-800 hover:bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold transition duration-300"
    >

      ← Back To Bicycle List

    </button>
  );
}

export default BackButton;