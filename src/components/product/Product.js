import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../actions/cartActions';


const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const isItemExit = cartItems.find(i => i.product === product._id)
  const maxQuantity = isItemExit ? (product.stock - isItemExit.quantity) : product.stock

  const addToCart = (id, quantity) => {
    if (maxQuantity <= 0) {
      toast.error('Đã vượt quá số lượng có thể thêm vào giỏ hàng', {
        theme: "colored"
      });
      return;
    }
    dispatch(addItemToCart(id, quantity));
    toast.success('Đã thêm sản phẩm vào giỏ hàng', {
      theme: "colored"
    });
  }

  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="product__item">
        <div className="hotTrend-badge" style={{display: product.hotTrend ? null : 'none'}}>Bán chạy</div>
        <div className="product__item__pic">
          <Link to={`/product/${product._id}`}>
            <img className='product__item__pic set-bg' src={product.images[0].url} alt="product-4" />
          </Link>
          <div className="product__label">
            {
              {
                'Bread': <span>Bánh mì</span>,
                'Coffee': <span>Cà phê</span>,
                'Coffee Bean': <span>Hạt cà phê</span>,
                'Cake': <span>Bánh ngọt</span>,
                'Pastries': <span>Bánh mặn</span>
              }[product.category]
            }
          </div>
        </div>
        <div className="product__item__text">
          <h6><Link to={`/product/${product._id}`}>{product.name}</Link></h6>
          <div className="product__item__price">{new Intl.NumberFormat().format(product.price)} &#8363;</div>
          <div className="cart_add">
            <Link onClick={() => addToCart(product._id, 1)}>Thêm vào giỏ hàng</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Product;
