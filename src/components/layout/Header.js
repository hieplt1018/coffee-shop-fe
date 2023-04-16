import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, logout } from '../../actions/userActions';
import { toast } from 'react-toastify';
import NavBar from './NavBar';

const Header = () => {
  const{ user, loading } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công', {
      theme: "colored"
    });
  }

  const handleClick = () => {
    dispatch(clearErrors);
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header__top__inner">
                <div className="header__top__left">
                  <ul>
                    <li>VND<span className="fa-solid fa-chevron-down"></span>
                      <ul>
                        <li>VND</li>
                        <li>USD</li>
                      </ul>
                    </li>
                    <li>VN<span className="fa-solid fa-chevron-down"></span>
                      <ul>
                        <li>VN</li>
                        <Link to="/index.html">
                          <li>EN</li>
                        </Link>
                      </ul>
                    </li>
                    { user ? (
                    <li>
                      <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                      width="32"
                      height="32"
                      /> {user && user.name}<span className="fa-solid fa-chevron-down"></span>
                      <ul className="dropdown-profile-header">
                        { user && !['admin','staff'].includes(user.role) ? (
                          <Link to="/orders/me">
                            <li>Đơn hàng</li>
                          </Link>
                        ) : (
                          <Link to="/dashboard">
                            <li>Thống kê</li>
                          </Link>
                        )}
                        <Link to="/me">
                          <li>Tài khoản</li>
                        </Link>
                        <Link to="/" onClick={logoutHandler}>
                          <li>
                            Đăng xuất
                          </li>
                        </Link>
                      </ul>
                    </li>
                    ) : !loading && <li><Link to="/login" disabled={loading ? true : false} onClick={handleClick}>Đăng nhập</Link> 
                    <span className="arrow_carrot-down"></span></li> }
                    
                  </ul>
                </div>
                <div className="header__logo">
                  <Link to="/"><img src={require("../../images/logo.png")} alt="logo" /></Link>
                </div>
                {
                  (user && user.role) ===  'admin' ? (
                    <div className="header__top__right">
                      <div className="header__top__right__links">
                      <Link to="/products" id="cart-item" className="search-switch"><img src={require("../../images/icon/search.png")} alt="search" /></Link>
                      </div> 
                    </div>
                  ) : (
                    <div className="header__top__right">
                      <div className="header__top__right__links">
                        <Link to="/products" id="cart-item" className="search-switch"><img src={require("../../images/icon/search.png")} alt="search" /></Link>
                        <Link to="/cart" id="cart_item">
                          <i className="fa-solid fa-cart-shopping fa-xl me-3" id="icon-cart" />
                          <span id="cart_count">{cartItems.length}</span>
                        </Link>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="canvas__open"><i className="fa fa-bars"></i></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="header__menu mobile-menu">
              <NavBar />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header