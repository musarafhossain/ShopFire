//import react libraries
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import '@/App.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

//import pages
import Home from '@/pages/home/Home';
import AllProducts from '@/pages/allProducts/AllProducts';
import Cart from '@/pages/cart/Cart';
import Order from '@/pages/order/Order';
import Product from '@/pages/product/Product';
import Profile from '@/pages/profile/Profile';
import Addresses from '@/pages/profile/addresses/Addresses';
import NoPage from '@/pages/nopage/NoPage';

// Auth Section
import Login from '@/pages/auth/login/Login';
import SignUp from '@/pages/auth/signup/SignUp';
import ForgotPassword from '@/pages/auth/forgot-password/ForgotPassword';

//Admin Section
import Dashboard from '@/pages/admin/dashboard/Dashboard';
import Users from '@/pages/admin/users/Users';
import Orders from '@/pages/admin/orders/Orders';
import Products from '@/pages/admin/products/Products';
import Settings from '@/pages/admin/settings/Settings';

import AuthRoutes from './auth/AuthRoutes';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*Auth Routes*/}
        <Route path='/login' element={<AuthRoutes><Login /></AuthRoutes>} />
        <Route path='/signup' element={<AuthRoutes><SignUp /></AuthRoutes>} />
        <Route path='/forgot-password' element={<AuthRoutes><ForgotPassword /></AuthRoutes>} />

        {/*User Routes*/}
        <Route path='/' element={<Home />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/order' element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/profile/addresses' element={<PrivateRoute><Addresses /></PrivateRoute>} />

        {/*Admin Routes*/}
        <Route path='/admin/dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path='/admin/users' element={<AdminRoute><Users /></AdminRoute>} />
        <Route path='/admin/orders' element={<AdminRoute><Orders /></AdminRoute>} />
        <Route path='/admin/products' element={<AdminRoute><Products /></AdminRoute>} />
        <Route path='/admin/settings' element={<AdminRoute><Settings /></AdminRoute>} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </Router>
  )
}

export default App