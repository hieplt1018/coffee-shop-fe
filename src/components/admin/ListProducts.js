import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { getAdminProducts, clearErrors } from '../../actions/productActions';
import Pagination from 'react-js-pagination';
import ListProductItem from './ListProductItem';
import { useParams } from 'react-router-dom';
import Search from '../common/Search';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';



const ProductList = () => {
  const { user } = useSelector(state => state.auth);
  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const { error: deleteError, isDeleted } = useSelector(state => state.product);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!['staff', 'admin'].includes(user.role)) {
      navigator('/');
      toast.error('Bạn không có quyền truy cập', {
        theme: "colored"
      });
    }

    dispatch(getAdminProducts(keyword, currentPage));

    if(isDeleted) {
      toast.success('Đã xóa sản phẩm thành công', {
        theme: "colored"
      });
      dispatch({ type: DELETE_PRODUCT_RESET});
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
      <MetaData title={'Danh sách sản phẩm'} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__text">
                <h2>Danh sách sản phẩm</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__links">
                <Link to="/dashboard">Tổng quan</Link>
                <span>Danh sách sản phẩm</span>
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
                  {
                    user.role === 'admin' ? (
                      <div className="col-3 offset-md-2">
                        <Link to={"/admin/product/new"} className="primary-btn" >
                          Tạo sản phẩm mới
                        </Link>
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <MDBTable className="align-middle hover">
                <MDBTableHead>
                  <tr>
                    <th scope='col' className='w-25'>Mã sản phẩm</th>
                    <th scope='col'>Tên sản phẩm </th>
                    <th scope='col'>Giá sản phẩm </th>
                    <th scope='col'>Số sản phẩm còn lại </th>
                    <th scope='col'></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {products && products.map(product => (
                    <ListProductItem key={product._id} product={product}/>
                  ))}
                </MDBTableBody>
              </MDBTable>
              {resPerPage <= productsCount && (
                <div className="shop__last__option">
                  <div className="row">
                    <div className="d-flex justify-content-center mt-5">
                      <div className="shop__pagination">
                        <Pagination 
                          activePage={currentPage}
                          itemsCountPerPage={resPerPage}
                          totalItemsCount={productsCount}
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
