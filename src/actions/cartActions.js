import { ADD_TO_CART, REMOVE_ALL_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";
import axios from "axios";

export const addItemToCart = (id, quantity) => async(dispatch, getState) => {
  const { data } = await axios.get(`https://coffee-shop-api-xycm.onrender.com/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      description: data.product.description,
      image: data.product.images[0].url,
      stock: data.product.stock,
      category: data.product.category,
      quantity
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemToCart = (id) => async(dispatch, getState) => {
  await axios.get(`https://coffee-shop-api-xycm.onrender.com/api/v1/product/${id}`);
  
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeAllCart = async(dispatch) => {
  dispatch({
    type: REMOVE_ALL_CART
  })

  localStorage.removeItem('cartItems');
}
