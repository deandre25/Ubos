import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import AddEditProduct from './components/AddEditProduct/AddEditProduct';
import CategoryList from './components/CategoryList/CategoryList';
import OrderList from './components/OrderList/OrderList';
import AddEditCategory from './components/AddEditCategory/AddEditCategory';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Inventory Management System</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link to="/products" className="nav-link">Продукты</Link></li>
              <li className="nav-item"><Link to="/categories" className="nav-link">Категории</Link></li>
              <li className="nav-item"><Link to="/orders" className="nav-link">Заказы</Link></li>
              <li className="nav-item"><Link to="/add-product" className="nav-link">Добавить продукт</Link></li>
              <li className="nav-item"><Link to="/add-category" className="nav-link">Добавить категорию</Link></li>
              <li className="nav-item"><Link to="/place-order" className="nav-link">Разместить заказ</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/add-product/:id?" element={<AddEditProduct />} />
          <Route path="/add-category/:id?" element={<AddEditCategory />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
