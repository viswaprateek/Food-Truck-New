// // dummy

// import React from 'react';
// import { useOrders } from './OrdersContext';

// const MyOrdersPage = () => {
//     const { orders } = useOrders();
  
//     return (
//       <div>
//         <h1>My Orders</h1>
//         {/* Map through the orders array and render each order */}
//         {orders.map((order) => (
//           <div key={order.id}>
//             <h3>Order ID: {order.id}</h3>
//             <ul>
//               {/* Render each item in the order */}
//               {order.items.map((item) => (
//                 <li key={item.id}>
//                   {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
//                 </li>
//               ))}
//             </ul>
//             <p>Total: ${order.total.toFixed(2)}</p>
//             <hr />
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default MyOrdersPage;