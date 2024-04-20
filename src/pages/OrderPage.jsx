import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderPage.css';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/order/getordersuccess');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="order-page">
      <h1>Orders</h1>
      <div className="order-cards">
        {orders.map(order => (
          <div key={order.orderid} className="order-card">
            <h2>Order ID: {order.orderid}</h2>
            <p>Username: {order.username}</p>
            <p>Total Price: ${order.totalprice}</p>
            <p>Order Status: {order.orderstatus}</p>
            <p>Payment Status: {order.paymentstatus}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map(item => (
                <li key={item.itemid}>
                  {item.itemdescription} - ${item.itemprice} x {item.itemquantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
