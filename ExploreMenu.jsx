import React, { useRef } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ExploreMenu.css';
import { categories } from '../../assets/assests'
const ExploreMenu = ({category, setCategory}) => {
 
  const menuRef=useRef(null);
  const scrollLeft=()=>{
    if(menuRef.current)
    {
      menuRef.current.scrollBy({left:-200,behavior:'smooth'});
    }
  };
  const scrollRigth=()=>{
    if(menuRef.current){
      menuRef.current.scrollBy({left: 200 ,behavior:'smooth'});
    }
  };
    
  return (
    <div className="explore-menu position-relative">
     <h1 className="d-flex align-items-center justify-content-between">
        Explore Our menu
       <div className="d-flex gap-3">
  <i className="bi bi-arrow-left-circle scroll-icon" onClick={scrollLeft}></i>
  <i className="bi bi-arrow-right-circle scroll-icon" onClick={scrollRigth}></i>
</div>


     </h1>
     <p>Explore curated lists of dishes from top categories</p>
     <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list" ref={menuRef}>
         {
             categories.map((item,index)=>{
        return (

            <div key={index} className='text-center explore-menu-list-item' onClick={() => setCategory(prev =>prev ===item.category ? 'All' :item.category)} >
                <img src={item.icon} alt="" className={item.category===category ? 'rounded-circle active': 'rounded-circle'}height={120} width={120}/>
                <p className='mt-2 fw-bold'>{item.category}</p>
                </div>
        )





             })

         }



     </div>

<hr/>


    </div>
   
    



  )
}

export default ExploreMenu