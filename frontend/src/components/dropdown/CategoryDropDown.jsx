import React from "react";
// import { category } from "../slider/sliderItem";
import "./dropdown.css";

const CategoryDropDown = ({ item, index }) => {
  return (
    <>
      <div className="bg-dropdown">
        <div className="d-flex justify-content-around">
          {item &&
            item[index].map((cate, index) => (
              <div className="item-dropdown" key={index}>
                <img
                  src="https://www.lux-review.com/wp-content/uploads/2019/09/turkish-hotel.jpg"
                  alt=""
                />
                <div className="item-dropdown-name">
                  <p>{cate}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryDropDown;
