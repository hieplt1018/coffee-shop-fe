import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBBadge } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../actions/userActions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const ListUserItem = (item) => {
  const { user } = useSelector(state => state.auth);
  const { account } = item;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAccountHandler = (id) => {
    dispatch(deleteAccount(id));
    handleClose();
  }

  return (
    <Fragment>
      <tr>
        <td>
          <p className='fw-normal mb-1'>{account.name}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>{account.email}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>{account.shippingInfo.telNum}</p>
        </td>
        <td>
          {
            {
              'admin': <h5><MDBBadge color='danger' pill>Admin</MDBBadge></h5>,
              'staff': <h5><MDBBadge color='primary' pill>Nhân viên</MDBBadge></h5>,
              'customer': <h5><MDBBadge color='success' pill>Khách hàng</MDBBadge></h5>
            }[account.role]
          }
        </td>
        <td>
          <Link to={`/admin/user/${account._id}`} className="btn-view">
            <i className="fa-solid fa-eye fa-xl"></i>
          </Link>
          {
            user.role === 'admin' ? (
              <Fragment>
                <Link to={`/admin/user/${account._id}`} className="btn-edit">
                  <i className="fa-solid fa-pen-to-square fa-xl"></i>
                </Link>
                <button to={`/admin/user/${account._id}`} className="btn-delete" onClick={handleShow}>
                  <i className="fa-solid fa-trash-can fa-xl"></i>
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Bạn có chắc chắn muốn xóa tài khoản này?</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button id="btn-cancel" onClick={handleClose}>
                      Hủy bỏ
                    </Button>
                    <Button onClick={() => deleteAccountHandler(account._id)}>
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

export default ListUserItem
