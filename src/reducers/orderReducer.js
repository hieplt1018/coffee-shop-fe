import { 
  CLEAR_ERRORS, 
  CREATE_ORDER_FAIL, 
  CREATE_ORDER_REQUEST, 
  CREATE_ORDER_RESET, 
  CREATE_ORDER_SUCCESS, 
  MY_ORDERS_FAIL, 
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  UPDATE_ORDER_STATUS,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_RESET
} from "../constants/orderConstant"

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isCreated: false,
        loading: true
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        order: action.payload
      }
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload
      }
    case CREATE_ORDER_RESET:
      return {
        ...state,
        isCreated: false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
      
    default:
      return state;
  }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true
      }
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      }
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
      
    default:
      return state;
  }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
      
    default:
      return state;
  }
}

export const orderReducer = (state = {}, action) => {
  switch(action.type) {
    case DELETE_ORDER_REQUEST: 
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        loading: true
      }
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      }
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case DELETE_ORDER_FAIL:
    case UPDATE_ORDER_STATUS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false
      }
    case UPDATE_ORDER_STATUS_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export const allOrdersReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true
      }
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        ordersCount: action.payload.ordersCount,
        resPerPage: action.payload.resPerPage
      }
    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
      
    default:
      return state;
  }
}
