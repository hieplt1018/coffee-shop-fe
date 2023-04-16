import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBBadge } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../actions/productActions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const ListProductItems = (item) => {
  const { user } = useSelector(state => state.auth);
  const { product } = item;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    handleClose();
  }

  return (
    <Fragment>
      <tr>
        <td>
          <p className='fw-normal mb-1'>{product._id}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>{product.name}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>{new Intl.NumberFormat().format(product.price)} &#8363;</p>
        </td>
        <td>
          {
            product.stock === 0 ? (
              <h5><MDBBadge color='danger' pill>Hết hàng</MDBBadge></h5> 
            ) : (
              <p className='fw-normal mb-1'>{new Intl.NumberFormat().format(product.stock)} sản phẩm</p>
            )
          }
        </td>
        <td>
          <Link to={`/product/${product._id}`} className="btn-view">
            <i className="fa-solid fa-eye fa-xl"></i>
          </Link>
          <Link to={`/admin/product/${product._id}`} className="btn-edit">
            <i className="fa-solid fa-pen-to-square fa-xl"></i>
          </Link>
          {
            user.role === 'admin' ? (
              <Fragment>
                <button to={`/admin/product/${product._id}`} className="btn-delete" onClick={handleShow}>
                  <i className="fa-solid fa-trash-can fa-xl"></i>
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Bạn có chắc chắn muốn xóa sản phẩm này?</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button id="btn-cancel" onClick={handleClose}>
                      Hủy bỏ
                    </Button>
                    <Button onClick={() => deleteProductHandler(product._id)}>
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

export default ListProductItems
