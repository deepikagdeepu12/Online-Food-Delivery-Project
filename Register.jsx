import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Service/authService';

const Register = () => {

  const navigate=useNavigate();
    
  const [data,setData]=useState({
    name:'',
    email:'',
    password:''
  });

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;

    setData(data=>({...data,[name]:value}));
  }
  
 const OnSubmitHandler=async(event)=>{
  event.preventDefault();
 try{
 const response=await registerUser(data);
  if(response.status===201){
     toast.success("Registration Completed Successfully. Please Login Now");
     navigate('/login');

  }
  else{
    toast.error("Something went wrong");
  }
}catch(error){
  toast.error(error.response?.data||"Unable to connect to the server",error);


}};
  return (
    <div className="register-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
            
            <form onSubmit={OnSubmitHandler}>
             
               <div className="form-floating mb-3">
                <input type="text" 
                className="form-control" 
                id="floatingName" 
                placeholder="Jhon Doe"
                name="name" 
                value={data.name} 
                onChange={onChangeHandler}
                required/>
                <label htmlFor="floatingName">Full Name</label>
              </div>
              
              <div className="form-floating mb-3">
                <input type="email" 
                className="form-control" 
                id="floatingEmail"
                 placeholder="name@example.com"
                name="email" 
                
                value={data.email} onChange={onChangeHandler}
                required/>
                <label htmlFor="floatingEmail">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" 
               className="form-control" 
               id="floatingPassword" 
               placeholder="Password"
                name="password" 
                value={data.password} 
                onChange={onChangeHandler}
                required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase mt-2 " type="submit">Sign
                  up</button>


                  <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="submit">reset
               </button>
              </div>

              



            <div className="mt-4">
                  Already have an account?<Link to="/login" >Sign In</Link>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register