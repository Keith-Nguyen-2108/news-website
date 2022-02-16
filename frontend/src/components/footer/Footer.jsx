import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className=" font-small mdb-color pt-4">
      <div className="footer text-center text-md-left">
        <div className="row text-center text-md-left mt-3 pb-3">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 footer-title">
            <h6 className="text-uppercase mb-4">MEAN</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              malesuada eget est in fermentum. Pellentesque rhoncus viverra
              lorem eu facilisis. Aliquam at viverra quam. Maecenas placerat.
            </p>
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3 footer-title">
            <h6 className="text-uppercase mb-4 ">Categories</h6>
            <p>
              <a href="#!">Hotel</a>
            </p>
            <p>
              <a href="#!">Restaurant</a>
            </p>
            <p>
              <a href="#!">Food</a>
            </p>
            <p>
              <a href="#!">Check-in</a>
            </p>
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 footer-title">
            <h6 className="text-uppercase mb-4">Contact</h6>
            <p>
              <i className="fa fa-envelope mr-3"></i> meannews@gmail.com
            </p>
            <p>
              <i className="fa fa-phone mr-3"></i> +84 123456789
            </p>
          </div>
        </div>
        <hr />

        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">
              © 2022 Created by:
              <strong>
                &nbsp;Mai Phan Binh An - Nguyen Minh Nha - Ngo Tan Thieu
              </strong>
            </p>
          </div>

          <div className="col-md-5 col-lg-4 ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    href="#!"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#!"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#!"
                    className="btn-floating btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
