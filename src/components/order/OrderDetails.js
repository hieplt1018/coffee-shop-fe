import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { PreLoader } from '../layout/PreLoader'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetails, clearErrors, getOrderDetailsAdmin } from '../../actions/orderActions'
import { toast } from 'react-toastify';
import OrderDetailsItems from './OrderDetailsItems'


const OrderDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { id } = useParams();
  const { loading, order, error } = useSelector(state => state.orderDetails);

  useEffect(() => {
    if(['staff', 'admin'].includes(user.role)) {
      dispatch(getOrderDetailsAdmin(id));
    } else {
      dispatch(getOrderDetails(id))
    }

    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, id])

  return (
    <Fragment>
    <MetaData title={'Chi tiết đơn hàng'} />
    { (loading === false) ? (
        <Fragment>
          <div>
            <div className="breadcrumb-option">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="breadcrumb__text">
                      <h2>Chi tiết đơn hàng</h2>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="breadcrumb__links">
                      <Link to="/index">Trang chủ</Link>
                      <Link to="/orders/me">Đơn hàng của tôi</Link>
                      <span>Chi tiết đơn hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                          {order.orderItems.map(item => (
                            <OrderDetailsItems key={item._id} item={item}/>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="cart__total mb-4">
                      <h6>Đơn hàng của bạn</h6>
                      <ul>
                        <li>Số sản phẩm:
                          <span>{new Intl.NumberFormat().format(order.orderItems
                            .reduce((acc, item) => acc + item.quantity, 0))} sản phẩm
                          </span>
                        </li>
                        <li id="subtotal">Phí giao hàng:<span>{new Intl.NumberFormat().format(0)} &#8363; </span></li>
                        <li id="total">Tổng thanh toán: <span>{new Intl.NumberFormat().format(order.totalOrder, 0)} &#8363;</span></li>
                      </ul>
                    </div>
                    <div className="order__details__info">
                      <h4>Địa chỉ</h4>
                      <p>{order.shippingInfo.address}</p>
                    </div>
                    <div className="order__details__info">
                      <h4>Số điện thoại giao hàng</h4>
                      <p>{order.shippingInfo.telNum}</p>
                    </div>
                    <div className="order__details__info">
                      <h4>Phương thức thanh toán</h4>
                        {
                          {
                            'Cash': <p>Tiền mặt</p>,
                            'Card': <p>Thẻ</p>,
                            'COD': <p>Gửi hàng COD</p>,
                            'Banking': <p>Chuyển khoản</p>
                          }[order.paymentInfo]
                        }
                    </div>
                    <div className="order__details__info">
                      <h4>Tình trạng đơn hàng</h4>
                        {
                          {
                            'Delivering': <h4><span className='badge bg-primary mt-1 mb-3'>Đang giao</span></h4>,
                            'Completed': <h4><span className='badge bg-success mt-1 mb-3'>Hoàn tất</span></h4>,
                            'Canccelled': <h4><span className='badge bg-danger mt-1 mb-3'>Đã hủy</span></h4>
                          }[order.orderStatus]
                        }
                    </div>
                    <div className="order__details__info">
                      <h4>Ngày đặt hàng</h4>
                      <p>{String(order.createdAt).substring(0, 10)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Fragment>
      ) : <PreLoader /> 
    }
    </Fragment>
  )
}

export default OrderDetails
