import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assests";
import Cart from "../Cart/Cart";
import { calculateTotals } from "../../util/cartUtil";
import axios from "axios";
import { toast } from "react-toastify";
import {RAZORPAY_KEY} from '../../util/contact';
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
 
  const{foodList,quantities,setquantity,token}=useContext(StoreContext);  

  const navigate=useNavigate();
  
  const [data, setData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  state: '',
  city: '',
  zip: ''
});

 const onChangeHandler=(event) =>{
  const name=event.target.name;
  const value=event.target.value;
  setData(data =>({...data,[name]:value}));

 }



  const onSubmitHandler = async (event) => {
  event.preventDefault();

  const orderData = {
    userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state} - ${data.zip}`,
    phoneNumber: data.phoneNumber,
    email: data.email,
    orderedItems: cartItems.map(item => ({
      foodId: item.id,          // ✅ FIX
      quantity: quantities[item.id],
      price: item.price,
      name: item.name
    })),
    amount: total,              // ✅ FIX
    orderStatus: "Preparing"
  };

  try {
    const response = await axios.post(
      "http://localhost:8084/api/orders/create",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 201 && response.data?.razorpayOrderId) {
      initiateRazorpayPayment(response.data); // ✅ Razorpay opens
    } else {
      toast.error("Unable to place order. Please try again.");
    }

  } catch (error) {
    console.error("ORDER CREATE ERROR 👉", error.response || error);
    toast.error("Unable to place order. Please try again.");
  }
};




  const initiateRazorpayPayment = (order) => {
  if (!window.Razorpay) {
    toast.error("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: order.amount, // paise
    currency: "INR",
    name: "Food Land",
    description: "Food Order Payment",
    order_id: order.razorpayOrderId,

    handler: async function (response) {
      await verifyPayment(response);
    },

    prefill: {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      contact: data.phoneNumber,
    },

    theme: { color: "#3399cc" },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};


 const verifyPayment=async(razorpayresponse)=>
 {

  const paymentData={
    razorpay_payment_id:razorpayresponse.razorpay_payment_id,
    razorpay_order_id:razorpayresponse.razorpay_order_id,
    razorpay_signature : razorpayresponse.razorpay_signature
  };
      try{

        const response=await axios.post('http://localhost:8084/api/orders/verify',paymentData,{headers:{'Authorization' :`Bearer ${token}`}});

  if(response.status===200){
    toast.success('Payment successful.');
    await clearCart();
    navigate('/myorders');
  }
  else{
    toast.error('Payment failed.Please try again.');
    navigate('/');
  }
      } 
      catch(error)
      {

        toast.error('Payment failed.Please try again');
      } 

 }
 
const deleteOrder=async(orderId) =>{
  try{
   axios.delete('http://localhost:8084/api/orders/' + orderId, {
  headers: { Authorization: `Bearer ${token}` }
});

axios.delete('http://localhost:8084/api/cart', {
  headers: { Authorization: `Bearer ${token}` }
});


  }
  catch(error)
  {
toast.error('something went wrong.Contact support.');
  }
}


const clearCart=async()=>
{
  try{
    axios.delete('http:localhost:8084/api/cart',{headers:{'Authorization' :`Bearer ${token}`}});
    setquantity({});

  }
  catch(error)
  {
    toast.error('Error while clearing the cart.');
  }
}

 const cartItems=foodList.filter(
  (food) =>quantities?.[food.id]>0);


  const {Subtotal,shipping,tax,total}=calculateTotals(cartItems,quantities);
 







orderedItems: cartItems.map(item => ({
  foodId: item.id,
  name: item.name,
  quantity: quantities[item.id],
  price: item.price
}))








 
  return (
    <div className="container mt-5">

<main>
  <div className="py-5 text-center">
    <img className="d-block mx-auto"
    src={assets.logo}
    alt=""
    width="98"
    height="98"/>

    
    </div>
      <div className="row g-5">

        {/* Billing Address */}
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Billing address</h4>

          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row g-3">

              <div className="col-sm-6">
                <label className="form-label">First name</label>
                <input type="text"
                placeholder="Jhon"
                id="firstName"
                required
                name="firstName"
                value={data.firstName}
                onChange={onChangeHandler}
                  
              className="form-control" />
              </div>

              <div className="col-sm-6">
                <label className="form-label">Last name</label>
                <input type="text"
                placeholder="Doe"
                required
                value={data.lastName}
                name="lastName"
                onChange={onChangeHandler}
                
                
                className="form-control" />
              </div>

              <div className="col-12">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={data.email}
                    name="email"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="87436756"
                  required
                  value={data.phoneNumber}
                  name="phoneNumber"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 Main St"
                    required
                    value={data.address}
                    name="address"
                    onChange={onChangeHandler}


                />
              </div>

              <div className="col-md-5">
                <label className="form-label">
                  State</label>
                <select className="form-select"
                id="state"
                name="state"
                value={data.state}
                required
                onChange={onChangeHandler}>
                  <option>Choose...</option>
                  <option>Karnataka</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">
                 City </label>
                <select className="form-select"
                id="city"
                name="city"
                value={data.city}
                required
                onChange={onChangeHandler}>

                  <option>Choose...</option>
                  <option>Bangalore</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Zip</label>
                <input type="text" className="form-control" 
                placeholder="583900"
                name="zip"
                value={data.zip}
                onChange={onChangeHandler}
                required/>
              </div>
            </div>

            <hr className="my-4" />

            <button
              className="w-100 btn btn-primary btn-lg"
              type="submit" disabled={cartItems.length===0}
            >
              Continue to checkout
            </button>
          </form>
        </div>

        {/* Cart */}
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>

         <ul className="list-group mb-3">
  {cartItems.map(item => (
    <li
      key={item.id}  // ✅ key added
      className="list-group-item d-flex justify-content-between "
    >
      <div>
        <h6 className="my-0">{item.name}</h6>
        <small className="text-muted">
          {quantities[item.id]}
        </small>
      </div>
      <span className="text-body-secondary">
        &#8377;{item.price * quantities[item.id]}
      </span>
    </li>
  ))}

  <li className="list-group-item d-flex justify-content-between ">
    <div>
      <span>Shipping</span>
    </div>
    <span className="text-body-secondary">
      &#8377;{Subtotal === 0 ? 0.0 : shipping.toFixed(2)}
    </span>
  </li>

  <li className="list-group-item d-flex justify-content-between ">
    <div>
      <span>Tax</span>
    </div>
    <span className="text-body-secondary">
      &#8377;{tax.toFixed(2)}
    </span>
  </li>

  <li className="list-group-item d-flex justify-content-between">
    <span>Total (INR)</span>
    <strong>
      &#8377;{Subtotal === 0 ? 0.0 : total.toFixed(2)}
    </strong>
  </li>
</ul>

        </div>

      </div>
</main>
    </div>
  );
};

export default PlaceOrder;
