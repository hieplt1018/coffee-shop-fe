import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import YouTube, { YouTubeProps } from 'react-youtube';

const About = () => {
  const opts: YouTubeProps['opts'] = {
    height: '500px',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Fragment>
      <div>
        <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="breadcrumb__text">
                  <h2>Giới thiệu</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="breadcrumb__links">
                  <Link to="/">Trang chủ</Link>
                  <span>Giới thiệu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="about spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-5">
                <YouTube videoId="s4PpNlO_ZCs" opts={opts} style={{marginBottom: '90px'}}/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="about__text">
                  <div className="section-title">
                    <span>Về Cantata Coffee</span>
                    <h2>Coffee và bánh từ ngôi nhà của những người yêu nhạc!</h2>
                  </div>
                  <p> &ldquo;<b><i>Cantata Coffee</i></b>&rdquo; được lấy cảm hứng từ Coffee Cantata - BWV211 của nhà soạn nhạc vĩ đại Johann Sebastian Bach. Chúng tôi tin vào tình yêu, tuổi trẻ, sự nhiệt huyết và các chuẩn mực. Bởi qua thời gian, mọi thứ sẽ biến mất, chỉ có những giá trị thực mới trường tồn cùng thời gian. Giống âm nhạc của J.Bach vậy.</p>
                </div>
                <div className='about__video'></div>
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
      </div>
    </Fragment>
  )
}

export default About
