import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';

const Dashboard = () => {
  const { user, loading } = useSelector(state => state.auth);
  const navigator = useNavigate();
  
  useEffect(() => {
    if(user.role !== 'admin') {
      navigator('/');
      toast.error('Bạn không có quyền truy cập', {
        theme: "colored"
      });
    }
  }, [navigator]);

  return (
    <Fragment>
      <MetaData title={"Tổng quan"} />
      { loading ? <PreLoader /> : (
        <Fragment>
          <div className="breadcrumb-option">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <div className="breadcrumb__text">
                    <h2>Tổng quan</h2>
                  </div>
                </div>
              </div>
              <div id='main-profile'>
                <div className='row justify-content-center'>
                  <div className='col-md-12 border-right'>
                    <div className='p-3'>
                      <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                          <div id="admin_dashboard_income" className="card text-white o-hidden h-100">
                            <div className="card-body">
                              <div className="text-center card-font-size">Tổng thu nhập<br /> <b>$4567</b>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pr-4">
                        <div className="col-xl-3 col-sm-6 mb-3">
                          <div id='admin_dashboard_products' className="card text-white o-hidden h-100">
                            <div className="card-body">
                              <div className="text-center card-font-size">Sản phẩm<br /> <b>56</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                              <span className="float-left">Xem chi tiết</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right" />
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3">
                          <div id="admin_dashboard_orders" className="card text-white o-hidden h-100">
                            <div className="card-body">
                              <div className="text-center card-font-size">Đơn hàng<br /> <b>125</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                              <span className="float-left">Xem chi tiết</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right" />
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3">
                          <div id="admin_dasboard_users" className="card text-white o-hidden h-100">
                            <div className="card-body">
                              <div className="text-center card-font-size">Người dùng<br /> <b>45</b></div>
                            </div>
                          <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                              <span className="float-left">Xem chi tiết</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right" />
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-3">
                          <div className="card text-white o-hidden h-100" id="admin_dashboard_blogs">
                            <div className="card-body">
                              <div className="text-center card-font-size">Tin tức<br /> <b>45</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/blogs">
                              <span className="float-left">Xem chi tiết</span>
                              <span className="float-right">
                                <i className="fa fa-angle-right" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Dashboard
