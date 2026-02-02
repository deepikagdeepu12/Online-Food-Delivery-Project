import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assests';

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8084/api/orders/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:8084/api/orders/status/${orderId}?status=${event.target.value}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrder();
    };
    loadOrders();
  }, []);


  

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.map(order => (
                <tr key={order.id}>
                  <td>
                    <img src={assets.parcel} alt="" height={48} width={48} />
                  </td>

                  <td className="text-muted">
                    {order.orderedItems?.length
                      ? order.orderedItems
                          .map(item => `${item.name} x ${item.quantity}`)
                          .join(", ")
                      : "No items"}

                    <div>{order.userAddress}</div>
                  </td>

                  <td>₹{(order.amount / 100).toFixed(2)}</td>

                  <td>Items: {order.orderedItems?.length || 0}</td>

                  <td className="fw-bold text-capitalize">
                    ● {order.orderStatus}
                  </td>

                  <td>
                    <select
                      className="form-control"
                      value={order.orderStatus}
                      onChange={(event) =>
                        updateStatus(event, order.id)
                      }
                    >
                      <option value="CREATED">Food Preparing</option>
                      <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                      <option value="DELIVERED">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
