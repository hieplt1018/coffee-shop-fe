import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBBadge } from 'mdbreact'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../../actions/orderActions';

const ListOrdersItem = (item) => {
  const { order } = item;
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
    handleClose();
  }

  let totalAmount = 0;
  order.orderItems.forEach(item => {
    totalAmount += item.quantity
  });

  return (
    <Fragment>
      <tr>
        <td>
          <p className='fw-normal mb-1'>{order._id}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>{totalAmount}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>{new Intl.NumberFormat().format(order.totalOrder)} &#8363;</p>
        </td>
        <td>
          {
            {
              'Delivering': <h5><MDBBadge color='primary' pill>Đang giao</MDBBadge></h5>,
              'Completed': <h5><MDBBadge color='success' pill>Hoàn tất</MDBBadge></h5>,
              'Cancelled': <h5><MDBBadge color='danger' pill>Đã hủy</MDBBadge></h5>
            }[order.orderStatus]
          }
        </td>
        <td>
          <Link to={user.role !== 'admin' ? `/order/${order._id}` : `/admin/order/${order._id}`}
            className="btn-floating btn-view">
            <i className="fa-solid fa-eye fa-xl"></i>
          </Link>
          {['staff', 'admin'].includes(user.role) ?
            (
              <Fragment>
                <Link to={`/admin/update/order/${order._id}`} className="btn-edit">
                  <i className="fa-solid fa-pen-to-square fa-xl"></i>
                </Link>
                <button to={`/admin/order/${order._id}`} className="btn-delete" onClick={handleShow}>
                  <i className="fa-solid fa-trash-can fa-xl"></i>
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Bạn có chắc chắn muốn xóa đơn hàng này?</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button id="btn-cancel" onClick={handleClose}>
                      Hủy bỏ
                    </Button>
                    <Button onClick={() => deleteOrderHandler(order._id)}>
                      Tiếp tục
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Fragment>
            ) : null
            }
        </td>
          
      </tr>
    </Fragment>
  )
}

export default ListOrdersItem
