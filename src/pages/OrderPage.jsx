import React from 'react';
import { useOrders } from '../contexts/OrdersContext';
import './OrderPage.css'
const OrdersPage = () => {
  const { orders } = useOrders();
  console.log(orders);
  
  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <div className="order-cards">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order ID: {index + 201}</h2>
            <ul>
              {order.items.map((item, ind) => (
                <li key={ind}>
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  {item.price !== undefined && (
                    <p>Price per item: ${item.price.toFixed(2)}</p>
                  )}
                  {item.total !== undefined && (
                    <p>Total: ${item.total.toFixed(2)}</p>
                  )}
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '200px' }} />
                  )}
                </li>
              ))}
            </ul>

            <p>.
              .
              .
            </p>
            <h2>Grand Total: ${order.total}</h2>
          
          <div className="rib">
          <div className="box1"><button >Pending</button></div>
          <div className="box2"><img src="https://i.imgur.com/r60RMUT.png" alt="" /></div></div>
            
           </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
