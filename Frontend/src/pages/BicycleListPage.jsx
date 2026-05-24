//
import { useContext } from "react";

import { useNavigate } from "react-router-dom";

// import {
//   getBicycles,
//   createBicycle
// } from "../services/bicycleService";
import useBicycles
from "../hooks/useBicycles";

import { AuthContext } from "../context/AuthContext";

import LoadingSpinner from "../components/common/LoadingSpinner";

import PageHeader from "../components/common/PageHeader";

import CreateBicycleForm from "../components/bicycles/CreateBicycleForm";

import BicycleCard from "../components/bicycles/BicycleCard";

function BicycleListPage() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const {
    bicycles,

    loading,

    error,

    bicycleName,

    setBicycleName,

    createError,

    handleCreateBicycle,
  } = useBicycles();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Bicycle List"
          buttonText="Logout"
          onButtonClick={handleLogout}
        />

        <CreateBicycleForm
          bicycleName={bicycleName}
          setBicycleName={setBicycleName}
          handleCreateBicycle={handleCreateBicycle}
          createError={createError}
        />

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default BicycleListPage;
