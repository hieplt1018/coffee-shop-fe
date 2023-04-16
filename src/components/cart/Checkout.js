import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { createOrder, clearErrors } from '../../actions/orderActions';
import { toast } from 'react-toastify';
import { removeAllCart } from '../../actions/cartActions';
import { CREATE_ORDER_RESET } from '../../constants/orderConstant';


const Checkout = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { user, loading, isAuthenticated } = useSelector(state => state.auth);
  const [address, setAddress] = useState(user.shippingInfo.address);
  const [telNum, setTelNum] = useState(user.shippingInfo.telNum);
  const [methodChecked, setMethodChecked] = useState("Cash");
  const [totalItemsPrice] = 
    useState(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0));
  const [totalOrder] = useState(totalItemsPrice);
  const { isCreated, error } = useSelector(state => state.newOrder);
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentMethods = [
    { label: "COD (Thanh toán khi nhận hàng)", value: "COD"},
    { label: "Chuyển khoản", value: "Banking"},
    { label: "Tiền mặt", value: "Cash"}
  ]

  const submitHandler = (e) => {
    e.preventDefault();

    const orderData = {
      shippingInfo: {
        address: address,
        telNum: telNum
      },
      orderItems: cartItems,
      paymentMethod: methodChecked,
      totalItemPrice: totalItemsPrice,
      totalOrder: totalOrder,
      customer: user._id
    }

    dispatch(createOrder(orderData));
  }

  useEffect(() => {
    if(isCreated) {
      toast.success('Đặt hàng thành công!', {
        theme: 'colored'
      });
      navigate('/orders/me');
      dispatch(removeAllCart);
      dispatch({
        type: CREATE_ORDER_RESET
      });
    }
    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate, isAuthenticated, isCreated]);

  const handleChangeCheckbox = (e) => {
    setMethodChecked(e.target.value);
  }

  return (
    <Fragment>
      <MetaData title='Thanh toán' />
      {
        loading ? (<PreLoader />) : (
          <div>
            <div className="breadcrumb-option">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="breadcrumb__text">
                      <h2>Thanh toán</h2>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="breadcrumb__links">
                      <a href="/index.html">Trang chủ</a>
                      <span>Thanh toán</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="checkout spad">
              <div className="container">
                <div className="checkout__form">
                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-lg-8 col-md-6">
                        <h6 className="checkout__title">Chi tiết hóa đơn</h6>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="checkout__input">
                              <p>Họ tên <span>*</span></p>
                              <input 
                                type="text" 
                                placeholder="" 
                                className="checkout__input__add" 
                                name="address"
                                required
                                maxLength="300"
                                minLength="0"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="checkout__input">
                          <p>Địa chỉ<span>*</span></p>
                          <input 
                            type="text" 
                            placeholder="Tên đường, số nhà, ..." 
                            className="checkout__input__add" 
                            name="address"
                            required
                            maxLength="300"
                            minLength="0"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} 
                            id="address" 
                            />
                        </div>
                        <div className="checkout__input">
                          <p>Số điện thoại giao hàng<span>*</span></p>
                          <input 
                            type="text" 
                            className="checkout__input__add" 
                            name="telNum"
                            required
                            maxLength="10"
                            minLength="10"
                            value={telNum}
                            onChange={(e) => setTelNum(e.target.value)} 
                            id="telNum" 
                          />
                        </div>
                        <div className="checkout__input__checkbox">
                          <label htmlFor="acc">
                          Bạn có muốn tạo một tài khoản để nhận khuyến mãi dành riêng cho thành viên? 
                            <input type="checkbox" id="acc" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="checkout__input">
                          <p>Ghi chú đặt hàng</p>
                          <input type="text" placeholder="Lưu ý về đơn đặt hàng của bạn" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="checkout__order">
                          <h6 className="order__title">Đơn hàng của bạn</h6>
                          <div className="checkout__order__products">Sản phẩm <span>Tổng giá</span></div>
                          <ul className="checkout__total__products">
                            {cartItems.map((item, index) => (
                              <li key={item.product}><samp>{'0' + (index + 1)}. </samp>{item.name} 
                              <span>{new Intl.NumberFormat().format(item.price * item.quantity)} &#8363;</span></li> 
                            ))}
                          </ul>
                          <ul className="checkout__total__all">
                            <li id="subtotal">Phí giao hàng<span>{new Intl.NumberFormat().format(0)} &#8363; </span></li>
                            <li id="total">Tổng thanh toán <span>{new Intl.NumberFormat().format(cartItems
                              .reduce((acc, item) => acc + item.quantity * item.price, 0))} &#8363;</span></li>
                          </ul>
                          {paymentMethods.map((item) => (
                            <div key={item.value} className="checkout__input__checkbox">
                              <label htmlFor={item.value}>
                                {item.label}
                                <input type="checkbox" 
                                  name="paymentMethod"
                                  id={item.value}
                                  value={item.value} 
                                  onChange={(e) => handleChangeCheckbox(e)}
                                  checked={methodChecked === item.value}
                                />
                                <span className="checkmark" />
                              </label>
                            </div>
                          ))}
                          <button type="submit" className="site-btn">ĐẶT HÀNG</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )
      }
    </Fragment>
  )
}

export default Checkout
