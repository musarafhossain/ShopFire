//import react libraries
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

//import pages
import Home from './pages/home/Home';
import AllProducts from './pages/allProducts/AllProducts';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
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
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </Router>
  )
}

export default App