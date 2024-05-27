import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Произошла ошибка при получении категорий!", error);
      });
  }, []);

  return (
    <div>
      <h2>Список категорий</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
