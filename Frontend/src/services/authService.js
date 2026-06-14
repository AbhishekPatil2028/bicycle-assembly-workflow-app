import axiosInstance from "../api/axiosInstance";

export const loginUser = async (username, password) => {
  const params = new URLSearchParams();

  params.append("username", username);

  params.append("password", password);

  const response = await axiosInstance.post(
    "/login",

    params,

    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
};
