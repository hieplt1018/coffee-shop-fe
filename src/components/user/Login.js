import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { PreLoader } from '../layout/PreLoader';
import { login, clearErrors } from '../../actions/userActions'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history('/');
      toast.success("Đăng nhập thành công", {
        theme: "colored"
      });
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
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <MetaData title={'Đăng nhập'} />
      { loading ? <PreLoader /> : (
        <Fragment>
          <section className="vh-100 login-page">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                  <div className="card" id="login-card">
                    <div className="row g-0">
                      <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src={require('../../images/register.jpg')} alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
                      </div>
                      <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
                          <form onSubmit={submitHandler}>
                            <div className="d-flex align-items-center mb-3 pb-1">
                              <i className="fa-solid fa-mug-hot fa-2x me-3" id="login-icon-coffee" />
                              <span className="h1 fw-bold mb-0">Cantata Coffee</span>
                            </div>

                            <div className="form-outline mb-4">
                              <input 
                                type="email" 
                                placeholder='Email' 
                                id="login-email" 
                                value={email} 
                                maxLength="100"
                                minLength="0" 
                                required
                                className="form-control form-control-lg" 
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="form-outline mb-4">
                              <input 
                              type="password" 
                              placeholder='Mật khẩu'
                              minLength="6" 
                              id="login-password" 
                              required
                              className="form-control form-control-lg" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                            <div className="pt-1 mb-4">
                              <button disabled={loading ? true : false} className="btn btn-dark btn-lg btn-block" type="submit">Đăng nhập</button>
                            </div>
                            <Link className="login-link" to="/password/forgot">Quên mật khẩu?</Link>
                            <p className="mb-5 pb-lg-2">Bạn chưa có tài khoản? <Link to="/register" className="login-link">Đăng ký tại đây</Link></p>
                            <Link to="#!" className="small text-muted">Điều khoản sử dụng - </Link>
                            <Link to="#!" className="small text-muted">Chính sách bảo mật</Link>
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
      )}
      
    </Fragment>
  )
}

export default Login
