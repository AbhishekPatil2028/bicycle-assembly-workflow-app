import { useEffect, useState } from "react";

import {
  getSingleBicycle,
  movePartStage,
  updatePartQuantity,
} from "../services/bicycleService";

function useBicycleDetails(id) {
  const [bicycle, setBicycle] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchBicycle();
  }, []);

  const fetchBicycle = async () => {
    try {
      const data = await getSingleBicycle(id);

      setBicycle(data);
    } catch (err) {
      setError("Failed to fetch bicycle");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (
    partId,

    newQuantity,
  ) => {
    if (newQuantity < 1) return;

    const updatedParts = bicycle.parts.map((part) => {
      if (part.id === partId) {
        return {
          ...part,

          quantity: newQuantity,
        };
      }

      return part;
    });

    setBicycle({
      ...bicycle,

      parts: updatedParts,
    });

    try {
      await updatePartQuantity(
        partId,

        newQuantity,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveStage = async (partId) => {
    try {
      const updatedPart = await movePartStage(partId);

      setBicycle((prev) => {
        const updatedParts = prev.parts.map((part) =>
          part.id === partId
            ? {
                ...part,

                stage: updatedPart.stage,
              }
            : part,
        );

        const allDone = updatedParts.every((part) => part.stage === "Done");

        return {
          ...prev,

          status: allDone ? "Done" : "In Progress",

          parts: updatedParts,
        };
      });
    } catch (err) {
      console.log(err.response);

      alert(err.response?.data?.detail || "Failed to move stage");
    }
  };

  return {
    bicycle,

    loading,

    error,

    handleQuantityChange,

    handleMoveStage,
  };
}

export default useBicycleDetails;
