import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import MetaData from './layout/MetaData';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../actions/productActions';
import Product from './product/Product';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PreLoader } from './layout/PreLoader';

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(getProducts('', 1, '', true));

    if(error) {
      toast.error(error, {
        theme: "colored"
      });
      dispatch(clearErrors());
    };
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={'Trang chủ'} />
      {
        loading ? <PreLoader /> : 
        (
          <Fragment>
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={require("../images/hero/hero-2.jpg")} alt="hero-2" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={require("../images/hero/hero-1.jpg")} alt="hero-1" />
              </Carousel.Item>
            </Carousel>

            <section className="about spad">
              <div className="container">
                <div className="about__text">
                  <div className="section-title">
                    <span>Về Cantata Coffee</span>
                    <h2>Chúng tôi tin vào</h2>
                  </div>
                  <p> &ldquo;<b><i>Cantata Coffee</i></b>&rdquo; được lấy cảm hứng từ Coffee Cantata - BWV211 của nhà soạn nhạc vĩ đại Johann Sebastian Bach. Chúng tôi tin vào tình yêu, tuổi trẻ, sự nhiệt huyết và các chuẩn mực. Bởi qua thời gian, mọi thứ sẽ biến mất, chỉ có những giá trị thực mới trường tồn cùng thời gian. Giống âm nhạc của J.Bach vậy.</p>
                </div>
              </div>
            </section>

            <div className="categories">
              <div className="container">
                <div className="row">
                  <OwlCarousel items={5} autoplay={true}>
                    <div className="categories__item">
                      <div className="categories__item__icon">
                        <span><img className="image_categories" src={require('../images/categories/coffee_bean.svg')} alt="coffee-bean" /></span>
                        <h5>Cà phê hạt</h5>
                      </div>
                    </div>
                    <div className="categories__item">
                      <div className="categories__item__icon">
                        <span><img className="image_categories" src={require('../images/categories/cup.svg')} alt="cup" /></span>
                        <h5>Cà phê</h5>
                      </div>
                    </div>
                    <div className="categories__item">
                      <div className="categories__item__icon">
                        <span><img className="image_categories" src={require('../images/categories/bread.svg')} alt="pastries" /></span>
                        <h5>Bánh mì</h5>
                      </div>
                    </div>
                    <div className="categories__item">
                      <div className="categories__item__icon">
                        <span><img className="image_categories" src={require('../images/categories/pastries.svg')} alt="bread" /></span>
                        <h5>Bánh</h5>
                      </div>
                    </div>
                    <div className="categories__item">
                      <div className="categories__item__icon">
                        <span><img className="image_categories" src={require('../images/categories/croissant.svg')} alt="pastries"/></span>
                        <h5>Bánh ngọt</h5>
                      </div>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>

            <section className="product spad">
                <div className="container">
                  <div className="about__text">
                    <div className="section-title">
                      <h2>Sản phẩm nổi bật</h2>
                    </div>
                  </div>
                </div>
            <div className="container">
              <div className="row">
                {products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>
            </section>

            <section className="class spad">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="class__form">
                      <div className="section-title">
                        <span></span>
                        <h2>Về sản phẩm</h2>
                        <h5 id='slogan'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</h5>
                      </div>
                      <div id="table1">
                        <table>
                          <tbody>
                            <tr>
                              <th>
                                <img src={require("../images/product/Coffee_bean.png")} alt="Coffee-bean"  />
                              </th>
                              <th>
                                <span>100% Coffee(nghĩ cái title gì hay ho)</span>
                                <h5>Fine Robusta, Honey Robusta,.... viết hay vào....</h5>
                              </th>
                            </tr>
                            <tr>
                              <th>
                                <img src={require("../images/product/pastries.png")} alt="pastries"  />
                              </th>
                              <th>
                                <span>100% Coffee(nghĩ cái title gì hay ho)</span>
                                <h5>Fine Robusta, Honey Robusta,.... viết hay vào....</h5>
                              </th>
                            </tr>
                            <tr>
                              <th>
                                <img src={require("../images/product/delivery.png")} alt="delivery"  /> 
                              </th>
                              <th>
                                <span>100% Coffee(nghĩ cái title gì hay ho)</span>
                                <h5>Fine Robusta, Honey Robusta,.... viết hay vào....</h5>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <Link to="https://shopee.vn/shop/55494347/" target="_blank" rel="noopener noreferrer">
                          <button type="submit" className="site-btn">Mua ngay</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="team spad">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-7 col-sm-7">
                    <div className="section-title">
                      <h2>Các thành viên</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="team__item set-bg" id="baker">
                      <div className="team__item__text">
                        <h6>Lã Ngọc Anh</h6>
                        <span>Thợ làm bánh</span>
                        <div className="team__item__social">
                          <Link to="https://www.facebook.com/cantatacakecoffee" target="_blank" rel="noopener noreferrer"><i className="fa fa-brands fa-facebook-f"></i></Link>
                          <Link to="https://www.instagram.com/cantatacoffee_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link>
                          <Link to="https://www.youtube.com/channel/UCtPIrX2a2A09hfmJ4hoEZzA" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="team__item set-bg" id="bartender">
                      <div className="team__item__text">
                        <h6>Trịnh Quang Hưng</h6>
                        <span>Người pha chế</span>
                        <div className="team__item__social">
                          <Link to="https://www.facebook.com/cantatacakecoffee" target="_blank" rel="noopener noreferrer"><i className="fa fa-brands fa-facebook-f"></i></Link>
                          <Link to="https://www.instagram.com/cantatacoffee_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link>
                          <Link to="https://www.youtube.com/channel/UCtPIrX2a2A09hfmJ4hoEZzA" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="team__item set-bg" id="make_color">
                      <div className="team__item__text">
                        <h6>Nguyễn Khánh Toàn</h6>
                        <span>Người làm màu</span>
                        <div className="team__item__social">
                          <Link to="https://www.facebook.com/cantatacakecoffee" target="_blank" rel="noopener noreferrer"><i className="fa fa-brands fa-facebook-f"></i></Link>
                          <Link to="https://www.instagram.com/cantatacoffee_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link>
                          <Link to="https://www.youtube.com/channel/UCtPIrX2a2A09hfmJ4hoEZzA" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="team__item set-bg" id="coo">
                      <div className="team__item__text">
                        <h6>Lê Tuấn Hiệp</h6>
                        <span>Cố vấn tài chính</span>
                        <div className="team__item__social">
                          <Link to="https://www.facebook.com/cantatacakecoffee" target="_blank" rel="noopener noreferrer"><i className="fa fa-brands fa-facebook-f"></i></Link>
                          <Link to="https://www.instagram.com/cantatacoffee_/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link>
                          <Link to="https://www.youtube.com/channel/UCtPIrX2a2A09hfmJ4hoEZzA" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-play"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="instagram spad" id="instagram_home">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 p-0">
                    <div className="instagram__text">
                      <div className="section-title">
                        <h2>Theo dõi chúng tôi</h2>
                      </div>
                      <div id="followus">
                        <ul>
                          <li>
                            <Link to="https://www.facebook.com/cantatacakecoffee" target="_blank" rel="noopener noreferrer">
                              <img src={require("../images/icon/icon_fb.svg")} alt="icon-fb" />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://www.instagram.com/cantatacoffee_/" target="_blank" rel="noopener noreferrer">
                            <img src={require("../images/icon/icon_ins.svg")} alt="icon-ins" />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://www.facebook.com/cantatacakecoffee" target="_blank" rel="noopener noreferrer">
                              <img src={require("../images/icon/icon_tiktok.svg")} alt="icon-tiktok" />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://www.youtube.com/channel/UCtPIrX2a2A09hfmJ4hoEZzA" target="_blank" rel="noopener noreferrer">
                              <img src={require("../images/icon/icon_youtube.svg")} alt="icon-youtube" />
                            </Link>
                          </li>
                        </ul>
                        <div id="Sweet">
                          Sweet moments are saved as memories.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div className="instagram__pic">
                          <img src={require("../images/instagram/instagram-1.jpg")} alt="instagram-6" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div className="instagram__pic middle__pic">
                          <img src={require("../images/instagram/instagram-2.jpg")} alt="instagram-5" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div className="instagram__pic">
                          <img src={require("../images/instagram/instagram-3.jpg")} alt="instagram-4" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div className="instagram__pic">
                          <img src={require("../images/instagram/instagram-4.jpg")} alt="instagram-3" /> 
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div className="instagram__pic middle__pic">
                          <img src={require("../images/instagram/instagram-5.jpg")} alt="instagram-2" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div className="instagram__pic">
                          <img src={require("../images/instagram/instagram-6.jpg")} alt="instagram-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="map">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-7">
                    <div className="map__inner">
                      <h6>Hà Nội</h6>
                      <ul>
                        <li>Số 145 ngõ 337, Định Công, Hoàng Mai, Hà Nội</li>
                        <li>Cantatacoffee247@gmail.com</li>
                        <li>+84 98686 7613</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="map__iframe">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.391784183889!2d105.83145429098968!3d20.976926695053407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac59a7a126d9%3A0x22275675f4667bb8!2zMTQ1IE5nw7UgMzM3IMSQ4buLbmggQ8O0bmcsIMSQ4buLbmggQ8O0bmcsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637853042539!5m2!1svi!2s" title="iframe-map" height={300} style={{border: '0}}'}} allowFullScreen aria-hidden="false" tabIndex={0} />
              </div>
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Home