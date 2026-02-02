
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuBar from './component/MenuBar/MenuBar';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import SideBar from './component/SideBar/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//ctr f to replace name

const App = () => {

 
 const [sidebarVisible, setSidebarVisible] = React.useState(true);


     const toggleSidebar=()=>{
        setSidebarVisible(!sidebarVisible);
     }



  return (
   <div className="d-flex" id="wrapper">
            {/* <!-- Sidebar--> */}
            <SideBar sidebarVisible={sidebarVisible} />

            {/* <!-- Page content wrapper--> */}
            <div id="page-content-wrapper">
                <MenuBar toggleSidebar={toggleSidebar} />
                <ToastContainer />

                {/* <!-- Page content--> */}
                <div className="container-fluid">
                    <Routes>
                        <Route path='/' element={<ListFood />} />
                        <Route path='/add-food' element={<AddFood />} />      
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/list' element={<ListFood />} />
                    </Routes>
                </div>
                </div>
                </div>
  )
}

export default App