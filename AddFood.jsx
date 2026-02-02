import React, { useState } from "react";
import { assets } from "../../assets/assests";

import { toast } from "react-toastify";
import { addFood } from "../../Service/foodService";



const AddFood = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Biriyani",
    price: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      await addFood(data, image);
      toast.success("Food added successfully");

      setData({
        name: "",
        description: "",
        category: "Biriyani",
        price: "",
      });
      setImage(null);
    } catch (err) {
      toast.error("Error adding food");
      console.error(err);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add Food</h2>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="upload"
                    width={100}
                    style={{ cursor: "pointer" }}
                  />
                </label>

                <input
                  type="file"
                  id="image"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter food name"
                  className="form-control"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="write content here...."
                  rows="4"
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                >
                  <option value="Biriyani">Biriyani</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="ice cream">ice cream</option>
              <option value="cake">cake</option>
               <option value="Veg Roll">Veg Roll</option>
               <option value="Salad">Salad</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  placeholder='&#8377;200'
                  className="form-control"
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;





// import React from 'react'

// import { useState } from 'react'
// import{assets} from '../../assets/assests';
// import axios from 'axios';


// const AddFood = () => {
    
//   const [image,setImage]=useState(false);

//   const[data,setData]=useState({
//     name:"",
//     description:"",
//     category:"Biriyani",
//     price:""
//   });

//   const onChangeHandler=(e)=>{
//     const name=e.target.name;
//     const value=e.target.value; 
//     setData(data=>({...data,[name]:value}));


//   }
  


//   const onSubmitHandler=async (e)=>{
//     e.preventDefault();
//     if(!image){
//       alert("Please upload image");
//       return;
//     }


//    const formData=new FormData();
//     formData.append('food',JSON.stringify(data));
//     formData.append('file',image);

//     try{
//      const response= await axios.post('http://localhost:8083/api/public/foods',formData,{Headers:{'Content-Type':'multipart/form-data'}});

//      if(response.status===200){
//       alert("Food added successfully");
//       setData({
//         name:"",
//         description:"",
//         category:"Biriyani",
//         price:""
//       });
//       setImage(null);
//      }
//     }
//     catch(err){
//       alert("Error adding food");

//       console.log(err);
//     }

//   }

//   return (
   
// <div classNameName="mx-2 mt-2">
//   <div classNameName="row ">
//     <div classNameName="card col-md-4">
//       <div classNameName="card-body">
//         <h2 classNameName="mb-4">Add Food</h2>
        
//         <form onSubmit={onSubmitHandler}>

//           <div classNameName="mb-3">
//             <label htmlFor="name" classNameName="form-label">
//               {/* Image Upload */}

//             <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={98}/>
//             </label>
//             <input type="file" classNameName="form-control" id="image"  hidden onChange={(e)=>setImage(e.target.files[0])}/>
//           </div>






//           <div classNameName="mb-3">
//             <label htmlFor="name" classNameName="form-label">Name</label>
//             <input type="text" classNameName="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
//           </div>
         
//           <div classNameName="mb-3">
//             <label htmlFor="description" classNameName="form-label">Description</label>
//             <textarea classNameName="form-control" id="description" rows="5" required name='description' onChange={onChangeHandler} value={data.description}></textarea>
//           </div>

//            <div classNameName="mb-3">
//             <label htmlFor="category" classNameName="form-label">Category</label>
//             <select name="category" id="category" classNameName='form-control' onChange={onChangeHandler} value={data.category}>
//               <option value="">Select Category</option>
//               <option value="Biryani">Biryani</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Burger">Burger</option>
//               <option value="ice cream">ice cream</option>
//               <option value="Drinks">Drinks</option>
//               <option value="Noodles">Noodles</option>
//               <option value="Salad">Salad</option>
//             </select>
//           </div>


//            <div classNameName="mb-3">
//             <label htmlFor="price" classNameName="form-label">Price</label>
//             <input type="number"name="price" classNameName="form-control" id="price" onChange={onChangeHandler} value={data.price}/>
//           </div>






//           <button type="submit" classNameName="btn btn-primary">Save</button>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
//   )
// }

// export default AddFood