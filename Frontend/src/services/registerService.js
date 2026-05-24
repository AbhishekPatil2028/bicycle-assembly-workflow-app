import axiosInstance from '../api/axiosInstance';

export const registerUser = async(email,password)=>{
    const response = await axiosInstance.post(

        '/register',
        {email,password}
    );
    return response.data
};