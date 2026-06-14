import axiosInstance from '../api/axiosInstance';

export const getBicycles = async ()=>{
    const response = await axiosInstance.get('/bicycles');
    return response.data
}

export const getSingleBicycle =
async (id) => {

  const response =
    await axiosInstance.get(

      `/bicycles/${id}`
    );

  return response.data;
};

export const updatePartQuantity = async (
  partId,
  quantity
) => {
  const response = await axiosInstance.put(
    `/parts/${partId}/quantity`,
    {
      quantity,
    }
  );

  return response.data;
};

export const movePartStage = async(partId)=>{
    const response = await axiosInstance.put(
        `/parts/${partId}/move-stage`
    );
    return response.data;
};


export const createBicycle =
async (name) => {

  const response =
    await axiosInstance.post(

      "/bicycles",

      {
        name
      }
    );

  return response.data;
};