import axiosInstance
from "../api/axiosInstance";


export const getDashboardData =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard"
      );

    return response.data;
};