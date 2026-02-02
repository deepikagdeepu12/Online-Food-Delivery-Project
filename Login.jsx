// import React, { useContext, useState } from 'react'
// import './Login.css'
// import { Link, useNavigate } from 'react-router-dom'

// import { StoreContext } from '../../context/StoreContext' 
// import { toast } from 'react-toastify'
// import { login } from '../../Service/authService'
//   const Login = () => {
     
//  const{setToken, loadCartData}=useContext(StoreContext);
//  const navigate=useNavigate();




//     const [data,setData]=useState({
//       email: " ",
//       password: " "
//     });


//     const onChangeHandler=(event) =>{
//       const name=event.target.name;
//       const value=event.target.value;
//       setData(data=>({...data,[name]:value}));
//     }


//     const onSubmitHandler=async(event)=>{
//       event.preventDefault();
//       try{
//         const response=await login(data);
//         // if(response.status === 200){

//           setToken(response.token);
//           localStorage.setItem('token',response.token);
//           await loadCartData(response.token);

//           navigate('/');
//         }
//           //  else{
//           //   toast.error("Unable to login,Please try again");
//           //  }
      
      
//       // }
//         catch(error){
//           console.log("Unable to login",error);
//           toast.error(error.response?.data||"Unable to login,Please try again",error);

//         }
//       }



    

//   return (
//     <div className="login-container">
//     <div className="row">
//       <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
//         <div className="card border-0 shadow rounded-3 my-5">
//           <div className="card-body p-4 p-sm-5">
//             <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
//             <form onSubmit={onSubmitHandler}>
//               <div className="form-floating mb-3">
//                 <input type="email" 
//                 className="form-control" 
//                 id="floatingInput" 
//                 name="email"
//                 onChange={onChangeHandler}
//                 value={data.email}
//                 placeholder="name@example.com"/>
//                 <label htmlFor="floatingInput">Email address</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input type="password" 
//                 className="form-control"
//                  id="floatingPassword"
//                  name="password"
//                  onChange={onChangeHandler}
//                  value={data.password}
//                 placeholder="Password"/>
//                 <label htmlFor="floatingPassword">Password</label>
//               </div>

              
//               <div className="d-grid">
//                 <button className="btn btn-outline-primary btn-login text-uppercase mt-2 " type="submit">Sign
//                   in</button>


//                   <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="button"
//                    onClick={() => setData({ email: "", password: "" })}>reset
//                </button>
//               </div>

              



//             <div className="mt-4">
//                   Don't have an account?<Link to="/register" >Sign Up</Link>
//             </div>

//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Login


import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { login } from "../../Service/authService";

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await login(data); // { email, token }

      setToken(response.token);
      localStorage.setItem("token", response.token);

      await loadCartData(response.token);

      navigate("/");
    } catch (error) {
      console.error("Unable to login", error);
      toast.error(error.response?.data || "Unable to login, Please try again");
    }
  };

  return (
    <div className="login-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>

              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    placeholder="name@example.com"
                    required
                  />
                  <label>Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                    placeholder="Password"
                    required
                  />
                  <label>Password</label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-login text-uppercase mt-2"
                    type="submit"
                  >
                    Sign In
                  </button>

                  <button
                    className="btn btn-outline-danger btn-login text-uppercase mt-2"
                    type="button"
                    onClick={() =>
                      setData({ email: "", password: "" })
                    }
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-4">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Sign Up</Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
