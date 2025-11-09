import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/user` : "/api/user";


export const updateUserProfile = async (data,token) => {
  
  try {
    const res = await axios.post(`${BASE_URL}/update-profile`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

