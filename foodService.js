// import axios from "axios";

// const API_URL = 'http://localhost:8083/api/public/foods';
// export const addFood = async (formData,image) => {

//   const formDataToSend = new FormData();
//   formDataToSend.append("food", JSON.stringify(formData));
//   formDataToSend.append("file", image);

//   try {
//     await axios.post(API_URL, formDataToSend);
//     return true;

//   }
//     catch (error) {
//       console.error(error);
//      throw error;
//     }

// };

// export const getFoodList=async () => {
//  try{
//   const response=await axios.get(API_URL);
//     return response.data;}

//     catch(error){
//       console.error("Error fetching food list:",error);
//       throw error;
//     }
//   }
// export const deleteFood=async(id)=>{
  
//       try{
//         const response=await axios.delete('API_URL'+id);
//   return response.status===204;

//     }
//     catch(error){
//       console.error("Error deleting food item:",error);
//       throw error;
//     }
//   }



























import axios from "axios";

const API_URL = "http://localhost:8084/api/public/foods";

export const addFood = async (formData, image) => {
  const formDataToSend = new FormData();
  formDataToSend.append("food", JSON.stringify(formData));
  formDataToSend.append("file", image);

  try {
    await axios.post(API_URL, formDataToSend);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFoodList = async () => {
  try {
    const response = await axios.get(API_URL); // ✅ FIXED
    return response;
  } catch (error) {
    console.error("Error fetching food list:", error);
    throw error;
  }
};

export const deleteFood = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // ✅ FIXED
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting food item:", error);
    throw error;
  }
};
