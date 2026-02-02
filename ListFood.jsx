


// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "./ListFood.css";
// import { getFoodList, deleteFood } from "../../Service/foodService";

// const ListFood = () => {
//   const [list, setList] = useState([]);

// const fetchList = async () => {
//   try {
//     const response = await getFoodList();
//     setList(response.data);
//   } catch (error) {
//     toast.error("Error fetching food list");
//     console.error(error);
//   }
// };

// useEffect(() => {
//   const fetchList = async () => {
//     try {
//       const response = await getFoodList();

     
//      setList(response.data.data);


//     } catch (error) {
//       toast.error("Error fetching food list");
//       console.error(error);
//     }
//   };

//   fetchList();
// }, []);

//   // Delete food
//   const removeFood = async (id) => {
//     try {
//       const success = await deleteFood(id);
//       if (success) {
//         toast.success("Food item deleted successfully");
//         fetchList();
//       } else {
//         toast.error("Failed to delete food item");
//       }
//     } catch (error) {
//       toast.error("Error deleting food item");
//       console.error(error);
//     }
//   };

  
//   return (
//     <div className="py-5 row justify-content-center">
//       <div className="col-11 card">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Action</th>
//             </tr>
//           </thead>

         
//  <tbody>
//   {Array.isArray(list) &&
//   list.map((item, index) => (
//     <tr key={index}>
//       <td>
//         <img src={item.imageUrl} alt="food" height={48} width={48} />
//       </td>
//       <td>{item.name}</td>
//       <td>{item.category}</td>
//       <td>₹{item.price}</td>
//       <td className="text-danger">
//         <i
//           className="bi bi-x-circle-fill"
//           onClick={() => removeFood(item.id)}
//         />
//       </td>
//     </tr>
//   ))}

// </tbody>


//         </table>          
//       </div>
//     </div>

//   );
// };

// export default ListFood;










import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListFood.css";
import { getFoodList, deleteFood } from "../../Service/foodService";

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await getFoodList();
      setList(response.data); // ✅ backend returns array
    } catch (error) {
      toast.error("Error fetching food list");
      console.error(error);
    }
  };

  useEffect(() => {
  const fetchList = async () => {
    try {
      const response = await getFoodList();
      setList(response.data); // ✅ array
    } catch (error) {
      toast.error("Error fetching food list",error);
    }
  };
  fetchList();
}, []);


  const removeFood = async (id) => {
    try {
      const success = await deleteFood(id);
      if (success) {
        toast.success("Food item deleted successfully");
        fetchList();
      }
    } catch (error) {
      toast.error("Error deleting food item",error);
    }
  };

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(list) &&
              list.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.imageUrl} alt="food" height={48} width={48} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td className="text-danger">
                    <i
                      className="bi bi-x-circle-fill"
                      onClick={() => removeFood(item.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;












