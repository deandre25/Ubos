import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Произошла ошибка при получении продуктов!", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Список продуктов</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Действия</th> {/* Добавляем столбец для кнопки редактирования */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                {/* Создаем кнопку для редактирования, которая ссылается на страницу редактирования товара */}
                <Link to={`/add-product/${product._id}`} className="btn btn-primary mr-2">Редактировать</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
