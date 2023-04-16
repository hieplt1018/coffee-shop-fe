import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../actions/productActions';
import Product from './product/Product';
import Pagination from 'react-js-pagination';
import { PreLoader } from './layout/PreLoader';
import Search from './common/Search';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Select from 'react-select'

const categories = [
  { value: '', label: 'Toàn bộ'},
  { value: 'Bread', label: 'Bánh mì' },
  { value: 'Coffee', label: 'Cà phê' },
  { value: 'Coffee Bean', label: 'Hạt cà phê'},
  { value: 'Cake', label: 'Bánh ngọt'},
  { value: 'Pastries', label: 'Bánh mặn'}
];

const selectStyles = {
  control: base => ({
    ...base,
    height: 47,
    minHeight: 47
  })
};

const Menu = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { 
    loading, 
    products, 
    error, 
    productsCount, 
    resPerPage,
    filteredProductsCount
  } = useSelector(state => state.products);
  const { keyword } = useParams();
  const [category, setCategory] = useState('');

  const handleChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, category));
    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    };
  }, [dispatch, error, keyword, currentPage, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  };
  
  return (
    <Fragment>
      <MetaData title={'Thực đơn'} />
      {
        loading ? (<PreLoader />) : (
        <Fragment>
          <div className="breadcrumb-option">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="breadcrumb__text">
                    <h2>Thực đơn</h2>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="breadcrumb__links">
                    <Link to="/">Trang chủ</Link>
                    <span>Thực đơn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="shop spad">
            <div className="container">
              <div className="shop__option">
                <div className="row">
                  <Search />
                  <div className="col-3 offset-md-2">
                    <Select
                      styles={selectStyles}
                      options={categories}
                      placeholder={<div>Danh mục</div>}
                      value={category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className='row'>
                {products && products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              {resPerPage <= productsCount && (
                <div className="shop__last__option">
                  <div className="row">
                    <div className="d-flex justify-content-center mt-5">
                      <div className="shop__pagination">
                        <Pagination 
                          activePage={currentPage}
                          itemsCountPerPage={resPerPage}
                          totalItemsCount={filteredProductsCount}
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
        </Fragment>
        )
      }
    </Fragment>
  )
}

export default Menu
