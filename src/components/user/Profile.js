import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import MetaData from "../layout/MetaData"
import { PreLoader } from "../layout/PreLoader"

const Profile = () => {
  const { user, loading } = useSelector(state => state.auth);

  return (
    <Fragment>
      <MetaData title={"Hồ sơ người dùng"} />
      { loading ? <PreLoader /> : (
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
                          <img className="rounded-circle mt-5" width="200px" src={user.avatar.url} alt={user.name}
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
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{user.name}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Địa chỉ giao hàng</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{user.shippingInfo.address}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Số điện thoại nhận hàng</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{user.shippingInfo.telNum}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Email</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{user.email}</p>
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Ngày đăng ký</label></h4>
                                <p className='profile-text font-weight-bold mt-2 mb-2'>{String(user.createdAt).substring(0, 10)}</p>
                              </div>
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

export default Profile
