import { useParams, useNavigate } from "react-router-dom";

import useBicycleDetails from "../hooks/useBicycleDetails";

import BackButton from "../components/common/BackButton";

import BicycleHeader from "../components/bicycles/BicycleHeader";

import PartCard from "../components/bicycles/PartCard";

function BicycleDetailsPage() {
  const { id } = useParams();

  const {
    bicycle,

    loading,

    error,

    handleQuantityChange,

    handleMoveStage,
  } = useBicycleDetails(id);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl">{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={() => navigate("/bicycles")} />

        <BicycleHeader bicycle={bicycle} />

        <h2 className="text-3xl font-bold mb-4">Parts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bicycle.parts?.map((part) => (
            <PartCard
              key={part.id}
              part={part}
              handleQuantityChange={handleQuantityChange}
              handleMoveStage={handleMoveStage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BicycleDetailsPage;
