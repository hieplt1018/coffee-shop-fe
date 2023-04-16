import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { PreLoader } from '../layout/PreLoader';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telNum, setTelNum] = useState('');

  const dispatch = useDispatch();
  const history = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if(isAuthenticated) {
      history('/');
    }
    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu chưa trùng khớp", {
        theme: "colored"
      });
    }
    const shippingInfo = {
      address: address,
      telNum: telNum
    }

    dispatch(register(name, email, password, shippingInfo));
  }

  return (
    <Fragment>
      <MetaData title={'Đăng ký'} />
      {
        loading ? <PreLoader /> : (
          <Fragment>
            <section className="vh-100 login-page" style={{backgroundColor: '#eee'}}>
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{borderRadius: '25px'}}>
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <div className="col-md-10 col-lg-9 order-2 order-lg-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                            <form className="mx-1 mx-md-4" onSubmit={submitHandler}>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <input 
                                    type="text" 
                                    placeholder="Họ tên" 
                                    name="name"
                                    required
                                    maxLength="100"
                                    minLength="0"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    id="register-name" 
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <input 
                                    type="email" 
                                    placeholder="Email" 
                                    name="email"
                                    maxLength="100"
                                    minLength="0"
                                    required
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    id="register-email" 
                                    className="form-control" 
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-house fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
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
                                    className="form-control" 
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-phone fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
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
                                    className="form-control" 
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <input 
                                    type="password" 
                                    placeholder="Mật khẩu" 
                                    value={password}
                                    minLength="6" 
                                    name="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)} 
                                    id="register-password" 
                                    className="form-control" 
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-key fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <input 
                                    type="password" 
                                    placeholder="Lặp lại mật khẩu" 
                                    id="confirm-password" 
                                    required
                                    minLength="6"
                                    className="form-control"
                                    name="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button disabled={loading ? true : false} type="submit" className="btn btn-cantata btn-lg">Đăng ký</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        )
      }
    </Fragment>
    
  )
}

export default Register
