import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  let location = useLocation();
  if(loading === false) {
    if (isAuthenticated === false) {
      toast.error('Bạn cần đăng nhập để truy cập', {
        theme: "colored"
      });
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default ProtectedRoute;
