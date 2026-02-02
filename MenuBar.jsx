import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assests";
import "./MenuBar.css";
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const MenuBar = () => {
  
 
  const [active,setActive]=useState('home');

  const {quantities,token,setToken,setQuentities}=useContext(StoreContext);
  const uniqueItemCart=Object.values(quantities).filter((qty) =>qty>0).length;  
  
  
  const navigate=useNavigate();

  const logout=() =>
  {
    localStorage.removeItem('token');
    setToken("");
    setQuentities({});
    navigate("/");


  }
  
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        <Link to={"/"}><img src={assets.logo} alt="logo" height={40} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <strong><Link className={active === 'home' ? 'nav-link active' : 'nav-link'} to="/" onClick={()=>setActive('home')}>
              Home</Link></strong>
            </li>
            <li className="nav-item">
              <strong><Link className={active === 'explore' ? 'nav-link active' : 'nav-link'} to="/explore" onClick={()=>setActive('explore')}>
              Explore</Link></strong>
            </li>
            <li className="nav-item">
              <strong><Link className={active === 'contact' ? 'nav-link active' : 'nav-link'} to="/contact" onClick={() =>setActive('contact')}>
              Contact Us</Link></strong>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4">
            <Link to={`/cart`} >
            <div className="position-relative">
              <img src={assets.cart} alt="" height={28} width={28} className="position-relative"/>
             
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                {uniqueItemCart}
              </span>

            
            </div>
            </Link>

              {
                !token?(
                <>
                <button 
                className="btn btn-outline-primary btn-sm" 
                onClick={()=>navigate('/login')}>
                  Login
                  
                  </button>
                 <button 
                 className="btn btn-outline-success btn-sm" 
                  onClick={() =>navigate('/register')}>
                    Register
                    </button>
                
                </> ):
                
                (<div className="dropdown text-end">
                  <a href="" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={assets.profile} alt="" width={32} height={32} className="rounded-circle"/>
                        </a>
                       <ul className="dropdown-menu text-small">
                        <li className="dropdown-item" onClick={() => navigate('/myorders')}>Orders</li>
                      <li className="dropdown-item" onClick={logout}>Logout</li>
                       </ul>
                        </div>
          
              )}





          </div>

</div>
     </div>
    </nav>
  );
};

export default MenuBar;
