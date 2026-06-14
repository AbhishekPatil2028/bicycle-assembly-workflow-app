import Navbar
from "./Navbar";

import Sidebar
from "./Sidebar";

import Footer
from "./Footer";


function AppLayout({

  children

}) {

  return (

    <div className="flex bg-gray-100">

      <Sidebar />


      <div className="flex-1 flex flex-col min-h-screen">

        <Navbar />


        <main className="flex-1 p-8">

          {children}

        </main>


        <Footer />

      </div>

    </div>
  );
}

export default AppLayout;