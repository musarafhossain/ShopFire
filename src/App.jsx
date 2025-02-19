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
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';

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
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </Router>
  )
}

export default App