import React from "react";
import { Link } from "react-router-dom";
// import { category } from "../slider/sliderItem";
import "./dropdown.css";

const CategoryDropDown = ({ item }) => {
  return (
    <>
      <div className="bg-dropdown">
        <div className="d-flex justify-content-around">
          {item &&
            item.map((cate, _) => (
              <Link
                to={`/category/${cate.cateName.toLowerCase()}`}
                className="item-dropdown"
                key={cate._id}
              >
                <img
                  src="https://www.lux-review.com/wp-content/uploads/2019/09/turkish-hotel.jpg"
                  alt=""
                />
                <div className="item-dropdown-name">
                  <p>{cate.cateName}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryDropDown;
