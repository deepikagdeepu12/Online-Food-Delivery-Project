import axios from "axios";

const API_URL = "http://localhost:8084/api";


export const registerUser = async (data) => {
  return axios.post(API_URL + "/register", data);
};



export const login=async(data) =>{
  
  const response= await axios.post(API_URL+"/login",data);
  return response.data;
}
