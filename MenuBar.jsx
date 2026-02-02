// import React from 'react'

// const MenuBar = ({toggleSidebar}) => {
//   return (
//      <nav classNameName="navbar navbar-expand-lg navbar-light bg-light border-bottom">
//                     <div classNameName="container-fluid">
//                         <button classNameName="btn btn-primary" id="sidebarToggle" onClick={toggleSidebar}>
//                             <i classNameName="bi bi-list"></i>
//                         </button>
                        
                            
//                         </div>
                    
//                 </nav>
               
    
//   )
// };

// export default MenuBar

import React from 'react';

const MenuBar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <button
          className="btn btn-primary"
          id="sidebarToggle"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
    </nav>
  );
};

export default MenuBar;
