import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const CanvasMenu = () => {
  return (
    <Fragment>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__cart">
          <div className="offcanvas__cart__links">
            <Link to="#" className="search-switch"><img src="https://i.ibb.co/2SK2sbX/search.png" alt="search" /></Link>
            <Link to="#"><img src="https://i.ibb.co/DfVcbFT/heart.png" alt="heart" /></Link>
          </div>
        </div>
        <div className="offcanvas__logo">
          <Link to="/index-VI.html"><img src="https://i.ibb.co/T4zW2Qm/logo.png" alt="logo" /></Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__option">
          <ul>
            <li>VND <span className="arrow_carrot-down"></span>
              <ul>
                <li>EUR</li>
                <li>USD</li>
              </ul>
            </li>
            <li>VN <span className="arrow_carrot-down"></span>
              <ul>
                <li>VN</li>
                <Link to="/index.html">
                  <li>EN</li>
                </Link>
              </ul>
            </li>
            <li><Link to="#">Đăng nhập</Link> <span className="arrow_carrot-down"></span></li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default CanvasMenu