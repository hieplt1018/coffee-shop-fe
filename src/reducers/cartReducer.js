import { ADD_TO_CART, REMOVE_ALL_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExit = state.cartItems.find(i => i.product === item.product)

      if (isItemExit) {
        item.quantity += isItemExit.quantity;

        return {
          ...state,
          cartItems: state.cartItems.map(i => i.product === isItemExit.product ? item : i),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
    }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== action.payload)
      }
    case REMOVE_ALL_CART:
      return {
        ...state,
        cartItems: []
      }

    default:
      return state;
  }
}
