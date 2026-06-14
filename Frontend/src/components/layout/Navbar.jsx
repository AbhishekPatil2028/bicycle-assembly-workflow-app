function Navbar() {

  return (

    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">

          B

        </div>

        <div>

          <h1 className="text-xl font-bold text-gray-800">

            Bicycle Workflow

          </h1>

          <p className="text-sm text-gray-500">

            Manufacturing System

          </p>

        </div>

      </div>


      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">

          A

        </div>

      </div>

    </nav>
  );
}

export default Navbar;