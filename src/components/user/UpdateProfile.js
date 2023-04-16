import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, loadUser, updateProfile } from '../../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telNum, setTelNum] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.shippingInfo.address);
      setTelNum(user.shippingInfo.telNum)
    }

    if(error) {
      toast.error(error, {
        theme: 'colored'
      });
      dispatch(clearErrors());
    }

    if(isUpdated) {
      toast.success('Cập nhật thành công!', {
        theme: 'colored'
      });
      dispatch(loadUser());
      navigate('/me', {replace: true});
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
  }

  return (
    <Fragment>
      <MetaData title={'Cập nhật hồ sơ'} />
      { loading ? <PreLoader /> : (
        <Fragment>
          <form onSubmit={submitHandler} >
            <div className='breadcrumb-option'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6 offset-md-4'>
                    <div className='breadcrumb__text'>
                      <h2>Cập nhật hồ sơ</h2>
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
                              <div className='col-md-12'><h4><label className='labels profile'>Họ tên</label></h4>
                                <input 
                                  type='text' 
                                  placeholder={user.name}
                                  name='name'
                                  required
                                  maxLength='100'
                                  minLength='0'
                                  value={name}
                                  onChange={(e) => setName(e.target.value)} 
                                  id='register-name' 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Địa chỉ giao hàng</label></h4>
                                <input 
                                  type="text" 
                                  placeholder="Địa chỉ giao hàng" 
                                  name="address"
                                  maxLength="300"
                                  minLength="0"
                                  required
                                  value={address} 
                                  onChange={(e) => setAddress(e.target.value)} 
                                  id="register-adress" 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Số điện thoại nhận hàng</label></h4>
                                <input 
                                  type="text" 
                                  placeholder="Số điện thoại nhận hàng" 
                                  name="telNum"
                                  maxLength="11"
                                  minLength="6"
                                  required
                                  value={telNum} 
                                  onChange={(e) => setTelNum(e.target.value)} 
                                  id="register-telNum" 
                                  className='form-control mt-3 mb-3'
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Email</label></h4>
                                <input 
                                  type='email' 
                                  placeholder={user.email} 
                                  name='email'
                                  maxLength='100'
                                  minLength='0'
                                  required
                                  value={email} 
                                  onChange={(e) => setEmail(e.target.value)} 
                                  id='register-email' 
                                  className='form-control mt-3 mb-3' 
                                />
                              </div>
                              <div className='col-md-12'><h4><label className='labels profile'>Ngày đăng ký</label></h4>
                                <p className='font-weight-bold mt-2 mb-2'>{String(user.createdAt).substring(0, 10)}</p>
                              </div>
                              <div className="col-md-12 offset-md-4">
                                <button disabled={loading ? true : false} type='submit' className='btn btn-cantata'>
                                Cập nhật
                                </button>
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
          </form>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile
