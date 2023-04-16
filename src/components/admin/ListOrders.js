import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import Pagination from 'react-js-pagination';
import ListOrdersItem from '../order/ListOrdersItem';
import { useParams } from 'react-router-dom';
import Search from '../common/Search';
import { allOrders, clearErrors } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';



const ProductList = () => {
  const { user } = useSelector(state => state.auth);
  const { loading, orders, error, ordersCount, resPerPage } = useSelector(state => state.allOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const { error: deleteError, isDeleted } = useSelector(state => state.order);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!['staff', 'admin'].includes(user.role)) {
      navigator('/');
      toast.error('Bạn không có quyền truy cập', {
        theme: "colored"
      });
    }

    dispatch(allOrders(keyword, currentPage));

    if(isDeleted) {
      toast.success('Đã xóa đơn hàng thành công', {
        theme: "colored"
      });
      dispatch({ type: DELETE_ORDER_RESET});
    }

    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    };
  }, [dispatch, keyword, currentPage, error, deleteError, isDeleted]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <MetaData title={'Danh sách đơn hàng'} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__text">
                <h2>Danh sách đơn hàng</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__links">
                <Link to="/dashboard">Tổng quan</Link>
                <span>Danh sách đơn hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        loading ? <PreLoader /> : (
          <section className="shop spad">
            <div className="container">
              <div className="shop__option">
                <div className="row">
                  <Search />
                  <div className="col-3 offset-md-2">
                    <Link to={"/admin/order/new"} className="primary-btn" >
                      Tạo đơn hàng mới
                    </Link>
                  </div>
                </div>
              </div>
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
                    <ListOrdersItem key={order._id} order={order} user={user}/>
                  ))}
                </MDBTableBody>
              </MDBTable>
              {resPerPage <= ordersCount && (
                <div className="shop__last__option">
                  <div className="row">
                    <div className="d-flex justify-content-center mt-5">
                      <div className="shop__pagination">
                        <Pagination 
                          activePage={currentPage}
                          itemsCountPerPage={resPerPage}
                          totalItemsCount={ordersCount}
                          onChange={setCurrentPageNo}
                          nextPageText={'>'}
                          prevPageText={'<'}
                          firstPageText={'<<'}
                          lastPageText={'>>'}
                          itemClass='page-item'
                          linkClass='page-link'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )
      }
    </Fragment>
  )
}

export default ProductList
