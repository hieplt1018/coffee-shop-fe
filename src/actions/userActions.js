import axios from 'axios';
import { 
  LOGIN_USER_FAIL, 
  LOGIN_USER_REQUEST, 
  LOGIN_USER_SUCCESS, 
  CLEAR_ERRORS, 
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  ALL_USERS_REQUETS,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  DELETE_USERS_FAIL
} from '../constants/userConstants';

export const login = (email, password) => async(dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST});

    const config = {
      withCredentials:true,
      headers: {
        'Content-Type': 'application/json'
      }
  }

    const { data } = await axios.post('https://coffee-shop-api-xycm.onrender.com/api/v1/login', { email, password }, config);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const register = (name, email, password, shippingInfo) => async(dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.post('https://coffee-shop-api-xycm.onrender.com/api/v1/register', { name, email, password, shippingInfo } , config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const loadUser = () => async(dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST});
    
    const { data } = await axios.get('https://coffee-shop-api-xycm.onrender.com/api/v1/me');
    
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message
    });
    dispatch({ type: CLEAR_ERRORS });
  }
}

export const logout = () => async(dispatch) => {
  try {
    await axios.get('https://coffee-shop-api-xycm.onrender.com/api/v1/logout');

    dispatch({
      type: LOG_OUT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: LOG_OUT_FAIL,
      payload: error.response.data.message
    })
  }
}

export const updateProfile = (name, email, shippingInfo) => async(dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.put('https://coffee-shop-api-xycm.onrender.com/api/v1/me/update', { name, email, shippingInfo } , config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message
    })
  }
}

export const updatePassword = (oldPassword, password) => async(dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.put('https://coffee-shop-api-xycm.onrender.com/api/v1/password/update', { oldPassword, password } , config);

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

export const forgotPassword = (email) => async(dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.post('https://coffee-shop-api-xycm.onrender.com/api/v1/password/forgot', { email } , config);

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

export const resetPassword = (token, password, confirmPassword) => async(dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const { data } = await axios.put(`https://coffee-shop-api-xycm.onrender.com/api/v1/password/reset/${token}`, { password, confirmPassword } , config);

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getUsers = (keyword=' ', currentPage = 1) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUETS });
    const { data } = await axios.get(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/users?page=${currentPage}&keyword=${keyword}`);

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message
    });
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USERS_REQUEST });

    const { data } = await axios.delete(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USERS_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: DELETE_USERS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getSingleUser = (id) => async(dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST});
    
    const { data } = await axios.get(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/user/${id}`);
    
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message
    });
    dispatch({ type: CLEAR_ERRORS });
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
};