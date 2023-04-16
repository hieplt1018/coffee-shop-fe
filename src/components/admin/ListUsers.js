import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import { PreLoader } from '../layout/PreLoader';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import Search from '../common/Search';
import { getUsers, clearErrors } from '../../actions/userActions';
import { DELETE_USERS_RESET } from '../../constants/userConstants';
import ListUserItem from './ListUserItem'



const ListUsers = () => {
  const { user } = useSelector(state => state.auth);
  const { loading, users, error, usersCount, resPerPage } = useSelector(state => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const { error: deleteError, isDeleted } = useSelector(state => state.user);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!['staff', 'admin'].includes(user.role)) {
      navigator('/');
      toast.error('Bạn không có quyền truy cập', {
        theme: "colored"
      });
    }

    dispatch(getUsers(keyword, currentPage));

    if(isDeleted) {
      toast.success('Đã xóa tài khoản thành công', {
        theme: "colored"
      });
      dispatch({ type: DELETE_USERS_RESET });
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
      <MetaData title={'Danh sách tài khoản'} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__text">
                <h2>Danh sách tài khoản</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__links">
                <Link to="/dashboard">Tổng quan</Link>
                <span>Danh sách tài khoản</span>
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
                        <Link to={"/admin/user/new"} className="primary-btn" >
                        Tạo tài khoản mới
                        </Link>
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <MDBTable className="align-middle hover">
                <MDBTableHead>
                  <tr>
                    <th scope='col' className='w-25'>Tên</th>
                    <th scope='col'>Email </th>
                    <th scope='col'>Số điện thoại </th>
                    <th scope='col'>Vai trò</th>
                    <th scope='col'></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {users && users.map(account => (
                    <ListUserItem key={account._id} account={account}/>
                  ))}
                </MDBTableBody>
              </MDBTable>
              {resPerPage <= usersCount && (
                <div className="shop__last__option">
                  <div className="row">
                    <div className="d-flex justify-content-center mt-5">
                      <div className="shop__pagination">
                        <Pagination 
                          activePage={currentPage}
                          itemsCountPerPage={resPerPage}
                          totalItemsCount={usersCount}
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

export default ListUsers
