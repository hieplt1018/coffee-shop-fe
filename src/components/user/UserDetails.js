import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import { PreLoader } from "../layout/PreLoader"
import { toast } from 'react-toastify';
import { getSingleUser, clearErrors } from "../../actions/userActions"
import { MDBBadge } from 'mdbreact'

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(state => state.auth);
  const { loading, account, error } = useSelector(state => state.userDetails);
  
  useEffect(() => {
    dispatch(getSingleUser(id));
    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    };
  }, [dispatch, error, id]);

  return (
    <Fragment>
      <MetaData title={"Hồ sơ người dùng"} />
      { loading === false ? (
        <Fragment>
          <div className="breadcrumb-option">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <div className="breadcrumb__text">
                    <h2>Hồ sơ người dùng</h2>
                  </div>
                </div>
              </div>

              <div id='main-profile'>
                  <div className='row justify-content-center'>
                    <div className="col-12 border-right">
                      <div className="d-flex flex-column align-items-center text-center">
                        <figure>
                          <img className="rounded-circle mt-5" width="200px" src={account.avatar.url} alt={account.name}
                          />
                        </figure>
                        
                      </div>
                    </div>
                    <div className='col-md-12 border-right offset-md-5'>
                      <div className='p-3'>
                        <div className="col-md-7 border-right">
                          <div className="p-3 pb-4">
                            <div className="row mt-3">
                              <div className='col-md-12'><h4><label className='labels profile'>Tên</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{account.name}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Vai trò</label></h4>
                              {
                                {
                                  'admin': <h5 className="mt-2 mb-2"><MDBBadge color='danger' pill>Admin</MDBBadge></h5>,
                                  'staff': <h5 className="mt-2 mb-2"><MDBBadge color='primary' pill>Nhân viên</MDBBadge></h5>,
                                  'customer': <h5 className="mt-2 mb-2"><MDBBadge color='success' pill>Khách hàng</MDBBadge></h5>
                                }[account.role]
                              }
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Địa chỉ giao hàng</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{account.shippingInfo.address}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Số điện thoại nhận hàng</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{account.shippingInfo.telNum}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Email</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{account.email}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Ngày đăng ký</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{String(account.createdAt).substring(0, 10)}</p>
                              </div>
                              {
                                user.role === 'admin' ? (
                                  <div className="row justify-content-evenly pt-5 pb-3">
                                    <div className="col-md-4">
                                      <Link to="/me/update" id="edit_profile" className="btn btn-cantata btn-block my-2 edit_profile_btn">
                                        Chỉnh sửa hồ sơ
                                      </Link>
                                    </div>
                                    <div className="col-md-4">
                                      <Link to="/password/update" id="update-password" className="btn btn-cantata btn-block my-2 edit_profile_btn">
                                        Thay đổi mật khẩu
                                      </Link>
                                    </div>
                                  </div>   
                                ) : null
                              }
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
      ) : <PreLoader />}
    </Fragment>
  )
}

export default UserDetails
