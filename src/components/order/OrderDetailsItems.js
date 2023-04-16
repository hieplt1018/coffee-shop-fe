import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetailsItems = ({ item }) => {
  return (
    <tr key={item.product}>
      <td className="product__cart__item">
        <div className="product__cart__item__pic">
          <Link to={`/product/${item.product}`}>
            <img src={item.product.images[0].url} alt="item-card" width="90px" />
          </Link>
        </div>
        <div className="product__cart__item__text">
          <Link to={`/product/${item.product}`}>
            <h6>{item.product.name}</h6>
          </Link>
          <h5>{new Intl.NumberFormat().format(item.product.price)} &#8363;</h5>
        </div>
      </td>
      <td className="quantity__item">
        <div className="quantity">
          <div className="pro-qty">
            <input className="count" type="text" value={item.quantity} readOnly />
          </div>
        </div>
      </td>
      <td className="cart__price">{new Intl.NumberFormat().format(item.product.price * item.quantity)} &#8363;</td>
    </tr>
  )
};

export default OrderDetailsItems;
