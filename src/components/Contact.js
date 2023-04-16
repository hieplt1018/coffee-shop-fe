import React, { Fragment } from 'react'

const Contact = () => {
  return (
    <Fragment>
      <section className="contact spad">
        <div className="container">
          <div className="map">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-4 col-md-7">
                  <div className="map__inner">
                    <h6>Hanoi</h6>
                    <ul>
                      <li>145/337,Dinh Cong Street, Hanoi, Vietnam</li>
                      <li>Cantatacoffee247@gmail.com</li>
                      <li>+84 98686 7613</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="map__iframe">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.391784183889!2d105.83145429098968!3d20.976926695053407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac59a7a126d9%3A0x22275675f4667bb8!2zMTQ1IE5nw7UgMzM3IMSQ4buLbmggQ8O0bmcsIMSQ4buLbmggQ8O0bmcsIEhvw6BuZyBNYWksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637853042539!5m2!1svi!2s"
                title="address-contact" height={300} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
            </div>
            
          </div>
          <div className="contact__address">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="contact__address__item">
                    <h6>Hà Nội</h6>
                    <ul>
                      <li>
                        <span><i className="fa-solid fa-location-dot"></i></span>
                        <p>7145/337, phố Định Công, Hà Nội, Việt Nam</p>
                      </li>
                      <li>
                        <span><i className="fa-solid fa-mobile-screen-button"></i></span>
                        <p>0986867613</p>
                      </li>
                      <li>
                        <span><i className="fa-solid fa-envelope"></i></span>
                        <p>hungtrinh267@gmail.com</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="contact__address__item">
                    <h6>Vũng Tàu</h6>
                    <ul>
                      <li>
                        <span><i className="fa-solid fa-location-dot"></i></span>
                        <p>Sắp khai trương</p>
                      </li>
                      <li>
                        <span><i className="fa-solid fa-mobile-screen-button"></i></span>
                        <p>0986867613</p>
                      </li>
                      <li>
                        <span><i className="fa-solid fa-envelope"></i></span>
                        <p>hungtrinh267@gmail.com</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="contact__address__item">
                    <h6>Đà Lạt</h6>
                    <ul>
                      <li>
                        <span><i className="fa-solid fa-location-dot"></i></span>
                        <p>Sắp khai trương</p>
                      </li>
                      <li>
                        <span><i className="fa-solid fa-mobile-screen-button"></i></span>
                        <p>0986867613</p>
                      </li>
                      <li>
                        <span><i className="fa-solid fa-envelope"></i></span>
                        <p>hungtrinh267@gmail.com</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Contact
