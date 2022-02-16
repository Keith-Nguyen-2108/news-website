import React from "react";
import { category } from "../slider/sliderItem";
import "./dropdown.css";

const HotelDropDown = () => {
  return (
    <>
      <div className="bg-dropdown">
        <div className="d-flex justify-content-around">
          {category &&
            category.reverse().map((item) => (
              <div className="item-dropdown" key={item.id}>
                <img src={item.src} alt="" />
                <div className="item-dropdown-name">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HotelDropDown;
