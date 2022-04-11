import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { category } from "../slider/sliderItem";
import { avatarCategory } from "./avatarCategory";
import "./dropdown.css";

const CategoryDropDown = ({ item }) => {
  let arr = Object.keys(avatarCategory);

  // useEffect(() => {
  //   const getKeys = () => {
  //     let a = [];
  //     a = arr.map((item) => avatarCategory[item]);

  //   };
  //   getKeys();
  // }, [arr]);

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
                <img src={avatarCategory[cate.cateName.toLowerCase()]} alt="" />
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
