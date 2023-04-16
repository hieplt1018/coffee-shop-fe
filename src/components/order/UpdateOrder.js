import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { PreLoader } from '../layout/PreLoader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetailsAdmin, updateOrderStatus } from '../../actions/orderActions'
import { toast } from 'react-toastify';
import OrderDetailsItems from './OrderDetailsItems'
import Select from 'react-select'
import { MDBBadge } from 'mdbreact'
import { UPDATE_ORDER_STATUS_RESET } from '../../constants/orderConstant'

const orderStatuses = [
  { value: 'Delivering', label: 'Đang giao' },
  { value: 'Completed', label: 'Hoàn tất' },
  { value: 'Cancelled', label: 'Đã hủy'}
];

const selectStyles = {
  control: base => ({
    ...base,
    height: 47,
    minHeight: 47
  })
};

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { id } = useParams();
  const { loading, order, error } = useSelector(state => state.orderDetails);
  const [orderStatus, setOrderStatus] = useState('');
  const { error: updateError, isUpdated } = useSelector(state => state.order);

  const handleChange = (selectedOption) => {
    setOrderStatus(selectedOption);
    dispatch(updateOrderStatus(order._id, selectedOption.value));
  };

  useEffect(() => {
    if(['staff', 'admin'].includes(user.role)) {
      dispatch(getOrderDetailsAdmin(id));
    }
  },[]);

  useEffect(() => {
    if(updateError) {
      toast.error(updateError, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }

    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    }

    if(isUpdated) {
      dispatch(getOrderDetailsAdmin(id));
      setOrderStatus(order.orderStatus);

      toast.success('Cập nhật trạng thái đơn hàng thành công!', {
        theme: "colored"
      });
      dispatch({ type: UPDATE_ORDER_STATUS_RESET });
    }
  }, [dispatch, error, id, loading, updateError, isUpdated, navigator, orderStatus])

  return (
    <Fragment>
    <MetaData title={'Cập nhật trạng thái đơn hàng'} />
    { (loading === false) ? (
        <Fragment>
          <div>
            <div className="breadcrumb-option">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="breadcrumb__text">
                      <h2>Cập nhật trạng thái đơn hàng</h2>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="breadcrumb__links">
                      <Link to="/index">Trang chủ</Link>
                      <Link to="/orders/me">Đơn hàng</Link>
                      <span>Cập nhật trạng thái đơn hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="shopping-cart spad">
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <div className="order__details__info">
                      <h4 className='mb-3'>Trạng thái đơn hàng hiện tại</h4>
                        <div className='col-4'>   
                          {
                            {
                              'Delivering': <h4><MDBBadge color='primary' pill>Đang giao</MDBBadge></h4>,
                              'Completed': <h4><MDBBadge color='success' pill>Hoàn tất</MDBBadge></h4>,
                              'Cancelled': <h4><MDBBadge color='danger' pill>Đã hủy</MDBBadge></h4>
                            }[order.orderStatus]
                          }
                        </div>
                        <h4 className='mb-3 mt-3'>Cập nhật trạng thái đơn hàng</h4>
                        <div className='row'>
                          <div className='col-4'>
                            <Select
                              styles={selectStyles}
                              options={orderStatuses}
                              placeholder={<div>Trạng thái</div>}
                              value={orderStatus}
                              onChange={handleChange}
                              className='mb-3 mt-3'
                              />
                          </div>
                        </div>
                      </div>
                    <div className="shopping__cart__table">
                      <h4 id='list_products' className='mb-3 mt-3'>Danh mục sản phẩm</h4>
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
                      <h6>Đơn hàng</h6>
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

export default UpdateOrder
