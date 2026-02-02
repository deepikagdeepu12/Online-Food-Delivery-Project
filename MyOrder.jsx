import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assests';
import "./MyOrders.css";
const MyOrder = () => {

    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8084/api/orders',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(response.data || []);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrder();
        }
    }, [token]);

    return (
        <div className='container'>
            <div className='py-5 row justify-content-center'>
                <div className='col-11 card'>
                    <table className='table table-responsive'>
                        <tbody>
                            {data.map((order, index) => (
                                <tr key={order.id}>
  <td>
    <img src={assets.delivary} alt="" height={48} width={48} />
  </td>

  <td className="text-muted">
    {order.orderedItems?.length
      ? order.orderedItems
          .map(item => `${item.name} x ${item.quantity}`)
          .join(", ")
      : "No items"}
  </td>

  <td>&#8377;{Number(order.amount).toFixed(2)}</td>

  <td>Items: {order.orderedItems?.length || 0}</td>

  <td className="fw-bold text-capitalize">
    &#x25cf; {order.orderStatus}
  </td>

  <td>
    <button className="btn btn-sm btn-warning" onClick={fetchOrder}>
      <i className="bi bi-arrow-clockwise"></i>
    </button>
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

export default MyOrder;
