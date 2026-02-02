import React, { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
const Explore = () => {
const [category,setcategory]=useState('All');
const [seacrhText,setSeachText]=useState('');
  


  return (
<>
            <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                  <form  onSubmit={(e) => e.preventDefault()}>
                         <div className='input-group mb-3'>

                            <select className='form-select mt-2' style={{"maxWidth":"150px"}} onChange={(e) => setcategory(e.target.value)}>
                              <option value="All">All</option>
                              <option value="Biriyani">Biryani</option>
                              <option value="Burger">Burger</option>
                              <option value="Pizza">Pizza</option>
                              <option value="Salad">salad</option>
                              <option value="cake">cake</option>
                              <option value="ice cream">ice</option>
                              <option  value ="Veg Roll">VegRoll</option>


                            </select>
                            <input type="text" className='form-control mt-2' placeholder='Search a your favorite dish...' 
                            onChange={(e) => setSeachText(e.target.value)} value={seacrhText}/>  
                            <button className='btn btn-primary mt-2' type='submit'>
                              <i className='bi bi-search'></i>
                              
                              </button>                      
                          </div>
                  </form>

              </div>
            </div>




            </div>


  <FoodDisplay  category={category} seacrhText={seacrhText}/>

</>
)
}

export default Explore