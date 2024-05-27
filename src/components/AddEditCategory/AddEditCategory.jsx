import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const AddEditCategory = () => {
  const [category, setCategory] = useState({ name: '' });
  const { id } = useParams();
  // const history = useHistory();

  useEffect(() => {
    if (id) {
      axios.get(`/api/categories/${id}`)
        .then(response => {
          setCategory(response.data);
        })
        .catch(error => {
          console.error("Произошла ошибка при получении категории!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/categories/${id}`, category)
        // .then(() => {
        //   history.push('/categories');
        // })
        .catch(error => {
          console.error("Произошла ошибка при обновлении категории!", error);
        });
    } else {
      axios.post('/api/categories', category)
        // .then(() => {
        //   history.push('/categories');
        // })
        .catch(error => {
          console.error("Произошла ошибка при создании категории!", error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Редактировать категорию' : 'Добавить категорию'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={category.name} onChange={handleChange} placeholder="Название" required />
        <button type="submit">{id ? 'Обновить' : 'Добавить'}</button>
      </form>
    </div>
  );
};

export default AddEditCategory;
