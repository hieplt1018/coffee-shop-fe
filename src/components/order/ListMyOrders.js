import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { myOrders, clearErrors } from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import ListOrdersItem from './ListOrdersItem';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

const ListOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    };
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={'Đơn hàng của tôi'} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__text">
                <h2>Đơn hàng của tôi</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__links">
                <Link to="/">Trang chủ</Link>
                <span>Đơn hàng của tôi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        loading ? <PreLoader /> : (
          (orders && orders.length === 0) ? (
            <section className="shopping-cart spad">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <h3>Hiện tại chưa có đơn hàng nào</h3>
                    <div className="btn-cantata btn btn-lg mt-5">
                      <Link to="/products">Tiếp tục mua sắm</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
          <section className="shop spad">
            <div className="container">
              <MDBTable className="align-middle hover">
                <MDBTableHead>
                  <tr>
                    <th scope='col' className='w-25'>Mã đơn hàng</th>
                    <th scope='col'>Số lượng sản phẩm </th>
                    <th scope='col'>Tổng thanh toán</th>
                    <th scope='col'>Trạng thái</th>
                    <th scope='col'></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orders && orders.map(order => (
                    <ListOrdersItem key={order._id} order={order} />
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </section>
          )
        )
      }
    </Fragment>
  )
}

export default ListOrders
