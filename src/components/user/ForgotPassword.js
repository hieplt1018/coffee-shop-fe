import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import { PreLoader } from '../layout/PreLoader';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(state => state.forgotPassword);
  
  useEffect(() => {
    if(error) {
      toast.error(error, {
        theme: 'colored'
      });
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message, {
        theme: 'colored'
      });
    }
  }, [dispatch, message, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  }

  return (
    <Fragment>
      <MetaData title={'Quên mật khẩu'} />
      { loading ? <PreLoader /> : (
        <Fragment>
          <form onSubmit={submitHandler} >
            <div className='breadcrumb-option'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6  offset-md-4'>
                    <div className='breadcrumb__text'>
                      <h2>Quên mật khẩu</h2>
                    </div>
                  </div>
                </div>
                <div id='forgot-pasword-main'>
                  <div className='row justify-content-center'>
                    <div className='col-md-5 border-right'>
                      <div className='p-3'>
                        <div className='row mt-3'>
                          <div className='col-md-12'><h4><label className='labels profile'>Nhập email</label></h4>
                            <input 
                              type='email' 
                              name='email'
                              required
                              maxLength='100'
                              minLength='6'
                              onChange={(e) => setEmail(e.target.value)} 
                              id='forgot-password-email' 
                              className='form-control mt-2 mb-2'
                            />
                          </div>
                          <div className='col-md-12 offset-md-4'>
                            <button disabled={loading ? true : false} type='submit' className='btn btn-cantata btn-block my-2'>
                              Gửi email
                            </button>
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

export default ForgotPassword
