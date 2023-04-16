import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart, removeItemToCart } from '../../actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const decreaseQty = (id, quantity) => {
    if (quantity <= 1) return;

    dispatch(addItemToCart(id, -1));
  }

  const increaseQty = (id, quantity, stock) => {
    if (quantity >= stock) return;

    dispatch(addItemToCart(id, 1));
  }

  const removeCartItemHandler = (id) => {
    dispatch(removeItemToCart(id));
  }

  return (
    <tr key={item.product}>
      <td className="product__cart__item">
        <div className="product__cart__item__pic">
          <Link to={`/product/${item.product}`}>
            <img src={item.image} alt="item-card" width="90px" />
          </Link>
        </div>
        <div className="product__cart__item__text">
          <Link to={`/product/${item.product}`}>
            <h6>{item.name}</h6>
          </Link>
          <h5>{new Intl.NumberFormat().format(item.price)} &#8363;</h5>
        </div>
      </td>
      <td className="quantity__item">
        <div className="quantity">
          <div className="pro-qty">
            <span className="btn btn-add-minus" onClick={() => decreaseQty(item.product, item.quantity, item.stock)}>
              <i className="fa-solid fa-minus qtybtn"></i>
            </span>
            <input className="count" type="text" value={item.quantity} readOnly />
            <span className="btn btn-add-minus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>
              <i className="fa-solid fa-plus qtybtn"></i>
            </span>
          </div>
        </div>
      </td>
      <td className="cart__price">{new Intl.NumberFormat().format(item.price * item.quantity)} &#8363;</td>
      <td className="cart__close">
        <Link to="/cart" className='icon-trash' onClick={() => removeCartItemHandler(item.product)}>
          <i className="fa-solid fa-trash me-3" />
        </Link>
        </td>
    </tr>
  )
};

export default CartItem;
