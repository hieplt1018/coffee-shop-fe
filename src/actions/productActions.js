import axios from 'axios';

import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from '../constants/productConstants'

export const getProducts = (keyword='', currentPage = 1, category, hotTrend) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    let link = `https://coffee-shop-api-xycm.onrender.com/api/v1/products?page=${currentPage}&keyword=${keyword}`;

    if (category) {
      link =`https://coffee-shop-api-xycm.onrender.com/api/v1/products?page=${currentPage}&keyword=${keyword}&category=${category.value}`;
    }

    if (hotTrend) {
      link =`https://coffee-shop-api-xycm.onrender.com/api/v1/products?page=${currentPage}&hotTrend=${hotTrend}`;
    }

    const { data } = await axios.get(link);
    
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`https://coffee-shop-api-xycm.onrender.com/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};

export const getAdminProducts = (keyword=' ', currentPage = 1) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/products?page=${currentPage}&keyword=${keyword}`);

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message
    });
  }
};

export const newProduct = (productData) => async(dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCTS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/product/new`, productData, config);

    dispatch({
      type: NEW_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: NEW_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const updateProduct = (id, productData) => async(dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.put(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/product/${id}`, productData, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const { data } = await axios.delete(`https://coffee-shop-api-xycm.onrender.com/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCTS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
};
