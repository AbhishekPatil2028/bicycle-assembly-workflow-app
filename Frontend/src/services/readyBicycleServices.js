import axiosInstance
from "../api/axiosInstance";


export const getReadyBicycles =
  async () => {

    const response =
      await axiosInstance.get(
        "/ready-bicycles"
      );

    return response.data;
};