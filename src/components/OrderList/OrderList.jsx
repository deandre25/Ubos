import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Произошла ошибка при получении заказов!", error);
      });
  }, []);

  return (
    <div>
      <h2>Список заказов</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            Заказ #{order.orderNumber} - {order.customerName} - {new Date(order.orderDate).toLocaleDateString()} - Всего: ${order.totalCost}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
