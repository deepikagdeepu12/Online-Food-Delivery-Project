 import React,{useContext}from 'react'
 import { StoreContext } from'../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

 const FoodDisplay = ({category="All",searchText =""}) => {
  
  const {foodList} =useContext(StoreContext);
  const filteredFoods = (Array.isArray(foodList) ? foodList : []).filter(food => {
    const name = food?.name || food?.foodName || "";
    const categoryMatch = category === "All" || food.category === category;
    const searchMatch = name.toLowerCase().includes(searchText.toLowerCase());
    return categoryMatch && searchMatch;
  });
   return (
   <div className='container'>
    <div className='row'>
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food,index)=> (
                  
            <FoodItem key={index}name={food.name} 
            
            description={food.description}
                 id={food.id} 
                 imageUrl={food.imageUrl} 
                 price={food.price}/>
        ))
      

        ):( 
        
        <div className='text-center mt-4'>
            <h4>No food found.</h4>
            </div> )}
      
    </div>
   </div>     


   )
 };
 
 export default FoodDisplay