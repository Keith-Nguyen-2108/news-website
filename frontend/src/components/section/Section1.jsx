import React from "react";

const Section1 = ({ category }) => {
  return (
    <div className=" mt-3">
      <div className="section-1">
        <ul className="section-1-list list-unstyled">
          {[...category].splice(1).map((item) => (
            <li className="section-1-item" key={item.id}>
              {/* <a href="#!"> */}
              <div className="d-flex">
                <img src={item.src} alt="" />
                <div className="section-1-item-content">
                  <h5>{item.name}</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                </div>
              </div>
              {/* </a> */}
            </li>
          ))}
          {/* 
          <li className="section-1-item">
            <a href="#!">
              <div className="d-flex">
                <img
                  src="https://media-cdn.tripadvisor.com/media/photo-s/16/95/ae/32/our-ground-floor-restaurant.jpg"
                  alt=""
                />
                <div className="section-1-item-content">
                  <h5>Hotel</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                </div>
              </div>
            </a>
          </li>
          <li className="section-1-item">
            <a href="#!">
              <div className="d-flex">
                <img
                  src="https://media-cdn.tripadvisor.com/media/photo-s/16/95/ae/32/our-ground-floor-restaurant.jpg"
                  alt=""
                />
                <div className="section-1-item-content">
                  <h5>Hotel</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                </div>
              </div>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Section1;
