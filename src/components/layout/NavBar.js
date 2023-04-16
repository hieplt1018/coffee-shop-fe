import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function NavBar() {
  const { user } = useSelector(state => state.auth);
  
  return (
    <ul>
      { user && ['admin', 'staff'].includes(user.role) ? 
        <Fragment>
          {
            user.role === 'admin' ? <CustomLink to="/dashboard">Tổng quan</CustomLink> : null
          }
          <CustomLink to="/admin/users">Tài khoản</CustomLink>
          <CustomLink to="/admin/products">Sản phẩm</CustomLink>
          <CustomLink to="/admin/blogs">Tin tức</CustomLink>
          <CustomLink to="/admin/orders">Đơn hàng</CustomLink>
        </Fragment>
      : 
        <Fragment>
          <CustomLink to="/">Trang chủ</CustomLink>
          <CustomLink to="/about">Giới thiệu</CustomLink>
          <CustomLink to="/products">Thực đơn</CustomLink>
          <CustomLink to="/blog">Tin tức</CustomLink>
          <CustomLink to="/contact">Liên hệ</CustomLink>
        </Fragment> 
      }
    </ul>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
