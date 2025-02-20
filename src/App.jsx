//import react libraries
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'

//import pages
import Home from './pages/home/Home';
import AllProducts from './pages/allProducts/AllProducts';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Product from './pages/product/Product';
import NoPage from './pages/nopage/NoPage';

//Admin Section
import Dashboard from './pages/admin/dashboard/Dashboard';
import Users from './pages/admin/users/Users';
import Orders from './pages/admin/orders/Orders';
import Products from './pages/admin/products/Products';
import Settings from './pages/admin/settings/Settings';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/product' element={<Product />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/settings' element={<Settings />} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </Router>
  )
}

export default App