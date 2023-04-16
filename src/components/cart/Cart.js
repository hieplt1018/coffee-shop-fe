import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { PreLoader } from '../layout/PreLoader'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'

const Cart = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { loading } = useSelector(state => state.auth);

  return (
    <Fragment>
      <MetaData title={'Giỏ hàng'} />
      {
        loading ? <PreLoader /> : (
          <Fragment>
            <div>
              <div className="breadcrumb-option">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="breadcrumb__text">
                        <h2>Giỏ hàng</h2>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="breadcrumb__links">
                        <Link to="/index">Trang chủ</Link>
                        <span>Giỏ hàng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {cartItems.length === 0 ? (
              <section className="shopping-cart spad">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <h3>Hiện tại chưa có sản phẩm nào</h3>
                      <div className="btn-cantata btn btn-lg mt-5">
                        <Link to="/products">Tiếp tục mua sắm</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              ) : 
              (
                <section className="shopping-cart spad">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="shopping__cart__table">
                          <table>
                            <thead>
                              <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map(item => (
                                <CartItem key={item.product} item={item}/>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="continue__btn">
                              <Link to="/products" className="btn btn-cantata">Tiếp tục mua sắm</Link>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="continue__btn update__btn">
                              <Link to="#"><i className="fa fa-spinner" /> Cập nhật giỏ hàng</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="cart__discount">
                          <h6>Mã giảm giá</h6>
                          <form action="#">
                            <input type="text" placeholder="Coupon code" />
                            <button className="btn btn-cantata" type="submit">Áp dụng</button>
                          </form>
                        </div>
                        <div className="cart__total">
                          <h6>Tất cả giỏ hàng: {new Intl.NumberFormat().format(cartItems
                            .reduce((acc, item) => acc + item.quantity, 0))} sản phẩm </h6>
                          <ul>
                            <li id="subtotal">Phí giao hàng<span>{new Intl.NumberFormat().format(0)} &#8363; </span></li>
                            <li id="total">Tổng thanh toán <span>{new Intl.NumberFormat().format(cartItems
                              .reduce((acc, item) => acc + item.quantity * item.price, 0))} &#8363;</span></li>
                          </ul>
                          <Link to="/checkout" className="primary-btn">Tiến hành thanh toán</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) }
              
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Cart
