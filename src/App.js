import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"  ;
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import CanvasMenu from "./components/layout/CanvasMenu";
import Menu from "./components/Menu";
import Login from "./components/user/Login";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import About from "./components/About";
import Contact from "./components/Contact";
import ListMyOrders from "./components/order/ListMyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ListProduct from "./components/admin/ListProducts";
import NewProduct from "./components/product/NewProduct";
import UpdateProduct from "./components/product/UpdateProduct";
import ListOrders from "./components/admin/ListOrders";
import ListUsers from "./components/admin/ListUsers";
import UserDetails from "./components/user/UserDetails";
import UpdateOrder from "./components/order/UpdateOrder";


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  
  return (
    <BrowserRouter >
      <div className="App">
        <Fragment>
          <CanvasMenu /> 
          <Header />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/search/:keyword" element={<Menu />} /> 
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders/me" element={<ListMyOrders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ListProduct />} />
              <Route path="/admin/product/new" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/orders" element={<ListOrders />} />
              <Route path="/admin/order/:id" element={<OrderDetails />} />
              <Route path="/admin/users" element={<ListUsers />} />
              <Route path="/admin/user/:id" element={<UserDetails />} />
              <Route path="/admin/update/order/:id" element={<UpdateOrder />} />
            </Route>
          </Routes>
          <Footer />
        </Fragment>
      </div>  
    </BrowserRouter>
  );
}

export default App;
