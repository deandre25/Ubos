import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({ customerName: '', products: [] });

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Произошла ошибка при получении продуктов!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...order.products];
    newProducts[index] = { ...newProducts[index], [name]: value };
    setOrder(prevState => ({
      ...prevState,
      products: newProducts
    }));
  };

  const addProduct = () => {
    setOrder(prevState => ({
      ...prevState,
      products: [...prevState.products, { productId: '', quantity: 0 }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/orders', order)
      .then(() => {
        // Перенаправление или уведомление о успешном создании заказа
      })
      .catch(error => {
        console.error("Произошла ошибка при создании заказа!", error);
      });
  };

  return (
    <div>
      <h2>Разместить заказ</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="customerName" value={order.customerName} onChange={handleChange} placeholder="Имя клиента" required />
        {order.products.map((product, index) => (
          <div key={index}>
            <select name="productId" value={product.productId} onChange={(e) => handleProductChange(index, e)} required>
              <option value="">Выберите продукт</option>
              {products.map(prod => (
                <option key={prod._id} value={prod._id}>{prod.name}</option>
              ))}
            </select>
            <input type="number" name="quantity" value={product.quantity} onChange={(e) => handleProductChange(index, e)} placeholder="Количество" required />
          </div>
        ))}
        <button type="button" onClick={addProduct}>Добавить продукт</button>
        <button type="submit">Разместить заказ</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
