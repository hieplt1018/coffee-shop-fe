import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, updatePassword } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { useNavigate } from 'react-router-dom';


const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(state => state.user)

  useEffect(() => {

    if(error) {
      toast.error(error, {
        theme: 'colored'
      });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Cập nhật thành công!', {
        theme: 'colored'
      });

      navigate('/me', {replace: true});

      dispatch({
          type: UPDATE_PASSWORD_RESET
      })
    }

  }, [dispatch, error, navigate, isUpdated])

  const submitHandler = (e) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        toast.error("Mật khẩu chưa trùng khớp", {
          theme: "colored"
        });
      }
      
      dispatch(updatePassword(oldPassword, newPassword));
  }

  return (
    <Fragment>
      <MetaData title={'Cập nhật mật khẩu'} />
      { loading ? <PreLoader /> : (
        <Fragment>
          <form onSubmit={submitHandler} >
            <div className='breadcrumb-option'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-6  offset-md-4'>
                    <div className='breadcrumb__text'>
                      <h2>Cập nhật mật khẩu</h2>
                    </div>
                  </div>
                </div>
                <div id='update-password-main'>
                  <div className='row justify-content-center'>
                    <div className='col-md-5 border-right'>
                      <div className='p-3'>
                        <div className='row mt-3'>
                          <div className='col-md-12'><h4><label className='labels profile'>Mật khẩu cũ</label></h4>
                            <input 
                              type='password' 
                              name='oldpassword'
                              required
                              maxLength='100'
                              minLength='6'
                              onChange={(e) => setOldPassword(e.target.value)} 
                              id='old-password' 
                              className='form-control mt-2 mb-2'
                            />
                          </div>
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
