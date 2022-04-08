import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { linkAvtPost } from "../axios";

const Section4 = ({ posts }) => {
  const history = useHistory();

  const randomEffect = () => {
    let items = document.querySelectorAll(".section-4-header-item p");
    let time = 3000;
    items.forEach((item) => {
      let start = 0;
      let end = parseInt(item.getAttribute("data-val"));
      let duration = Math.floor(time / end);
      let counter = setInterval(() => {
        start += 1;
        item.textContent = ("0" + start).slice(-2);
        if (start === end) {
          clearInterval(counter);
        }
      }, duration);
    });
  };

  useEffect(() => {
    // const windowHeight = window.innerHeight + window.scrollY
    let time = setInterval(() => {
      const ul = document.querySelector(".section-4-header ul").offsetTop;
      window.onscroll = () => {
        const windowHeight = window.innerHeight + window.scrollY;
        if (windowHeight - ul > 0 && windowHeight - ul < 100) {
          randomEffect();
        } else {
          window.removeEventListener("scroll", randomEffect, true);
        }
      };
    }, 500);
    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <div className="section-4">
      <div className="section-4-header">
        <ul className="list-unstyled">
          <li className="section-4-header-item">
            {/* <a href="#!"> */}
            <p data-val="09">00</p>
            <h6>Hotel</h6>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
            {/* </a> */}
          </li>
          <li className="section-4-header-item">
            {/* <a href="#!"> */}
            <p data-val="10">00</p>
            <h6>Hotel</h6>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
            {/* </a> */}
          </li>
          <li className="section-4-header-item">
            {/* <a href="#!"> */}
            <p data-val="20">00</p>
            <h6>Hotel</h6>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
            {/* </a> */}
          </li>
          <li className="section-4-header-item">
            {/* <a href="#!"> */}
            <p data-val="22">00</p>
            <h6>Hotel</h6>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
            {/* </a> */}
          </li>
        </ul>
      </div>
      <div className="section-4-below pt-5">
        <ul className="list-unstyled">
          {posts &&
            posts.map((item, index) => (
              <li
                className="section-4-below-item"
                key={item._id}
                onClick={() => history.push("/article/" + item._id)}
                style={{ cursor: "pointer" }}
              >
                {/* <a href="#!"> */}
                <img
                  src={linkAvtPost + item.avatar}
                  alt=""
                  className={`${index % 2 === 0 ? "right" : ""}`}
                  data-aos={`${index % 2 === 0 ? "fade-left" : "fade-right"}`}
                  data-aos-delay="300"
                />
                <div
                  className="section-4-below-item-content"
                  data-aos={`${index % 2 !== 0 ? "fade-left" : "fade-right"}`}
                  data-aos-delay="500"
                >
                  <p>{item?.categoriesID.cateName}</p>
                  <h6>{item.title}</h6>
                  <p>{item.shortDescription}</p>
                </div>
                {/* </a> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Section4;
