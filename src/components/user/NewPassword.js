import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, resetPassword } from '../../actions/userActions';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { useNavigate, useParams } from 'react-router-dom';


const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { error, success, loading } = useSelector(state => state.forgotPassword)

  useEffect(() => {
    if(error) {
      toast.error(error, {
        theme: 'colored'
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Cập nhật thành công!', {
        theme: 'colored'
      });
      navigate('/login', {replace: true});
    }

  }, [dispatch, error, navigate, success])

  const submitHandler = (e) => {
      e.preventDefault();
      
      dispatch(resetPassword(params.token, newPassword, confirmPassword));
  }

  return (
    <Fragment>
      <MetaData title={'Tạo mật khẩu mới'} />
      { loading ? <PreLoader /> : (
        <Fragment>
          <form onSubmit={submitHandler} >
            <div className='breadcrumb-option'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6  offset-md-4'>
                    <div className='breadcrumb__text'>
                      <h2>Tạo mật khẩu mới</h2>
                    </div>
                  </div>
                </div>
                <div id='update-password-main'>
                  <div className='row justify-content-center'>
                    <div className='col-md-5 border-right'>
                      <div className='p-3'>
                        <div className='row mt-3'>
                          <div className='col-md-12'><h4><label className='labels profile'>Mật khẩu mới</label></h4>
                            <input 
                              type='password' 
                              name='newpassword'
                              maxLength='100'
                              minLength='6'
                              required
                              onChange={(e) => setNewPassword(e.target.value)} 
                              id='new-password' 
                              className='form-control mt-2 mb-2' 
                            />
                          </div>
                          <div className='col-md-12'><h4><label className='labels profile'>Nhập lại mật khẩu mới</label></h4>
                            <input 
                              type='password' 
                              name='confirmpassword'
                              maxLength='100'
                              minLength='6'
                              required
                              onChange={(e) => setConfirmPassword(e.target.value)} 
                              id='confirm-password' 
                              className='form-control mt-2 mb-2' 
                            />
                          </div>
                          <div className='col-md-12 offset-md-4'>
                            <button disabled={loading ? true : false} type='submit' className='btn btn-cantata btn-block my-2'>
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
          </form>
        </Fragment>
        
        
      )}
    </Fragment>
  )
}

export default UpdatePassword
