import { useEffect, useState } from "react";

import { getBicycles, createBicycle } from "../services/bicycleService";

function useBicycles() {
  const [bicycles, setBicycles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [bicycleName, setBicycleName] = useState("");

  const [createError, setCreateError] = useState("");

  useEffect(() => {
    fetchBicycles();
  }, []);

  const fetchBicycles = async () => {
    try {
      const data = await getBicycles();

      setBicycles(data);
    } catch (err) {
      setError("Failed to fetch bicycles");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBicycle = async (e) => {
    e.preventDefault();

    try {
      const newBicycle = await createBicycle(bicycleName);

      setBicycles((prev) => [newBicycle, ...prev]);

      setBicycleName("");

      setCreateError("");
    } catch (err) {
      setCreateError(err.response?.data?.detail || "Failed to create bicycle");
    }
  };

  return {
    bicycles,

    loading,

    error,

    bicycleName,

    setBicycleName,

    createError,

    handleCreateBicycle,
  };
}

export default useBicycles;
