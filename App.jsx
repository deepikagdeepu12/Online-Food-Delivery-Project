import { Routes, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import ContactUs  from "./pages/Contact Us/ContactUs";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from "react-toastify";
import MyOrder from "./pages/MyOrders/MyOrder";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
function App() {
  const {token} =useContext(StoreContext);
  
  
  return (
    <div>
      <MenuBar />
     
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/food/:id" element={<FoodDetails/>}/> 
        <Route  path="/cart" element={<Cart/>}/>
        <Route path="/placeorder" element={token ?<PlaceOrder/>:<Login/>}/>
        <Route path="/login" element={token ?<Home/>:<Login/>}/>
        <Route path="/register" element={token ?<Home/>:<Register/>}/>
        <Route path="/myorders" element={token?<MyOrder/>:<Login/>}/>
       
      </Routes>
    </div>
  );
}

export default App;
