import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  let history = useNavigate();
  const searchPlaceholder = ["orders", "products", "users"];

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/search/${keyword}`);
    } else {
      history('/');
    }
  };

  return (
    <Fragment>
      <div className="col-7">
        <div className="shop__option__search">
          <form onSubmit={submitHandler} >
            <input 
              type="text"
              placeholder={
                searchPlaceholder.some(el => window.location.href.split('/').includes(el)) ?
                "Tìm kiếm" : window.location.href.split('/').pop() }
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit"><i className="fa fa-search" /></button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Search
