import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const AddEditProduct = () => {
  const [product, setProduct] = useState({ name: '', category: '', price: 0, quantity: 0 });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/products/${id}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error("Произошла ошибка при получении продукта!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/products/${id}`, product)
        .catch(error => {
          console.error("Произошла ошибка при обновлении продукта!", error);
        });
    } else {
      axios.post('/products', product)
        .catch(error => {
          console.error("Произошла ошибка при создании продукта!", error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Редактировать продукт' : 'Добавить продукт'}</h2>
      <form method='POST' onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Название" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Категория" required />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Цена" required />
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Количество" required />
        <button type="submit">{id ? 'Обновить' : 'Добавить'}</button>
      </form>
    </div>
  );
};

export default AddEditProduct;
