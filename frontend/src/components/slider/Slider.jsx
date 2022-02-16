import React from "react";
import "./slider.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { category } from "./sliderItem";

const Slider = () => {
  const options = {
    // margin: 30,
    responsiveClass: true,
    nav: true,
    items: 4,
    loop: true,
    smartSpeed: 1000,
    responsive: {
      300: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  };

  return (
    <div className="slider" style={{ marginTop: "-5px" }}>
      <OwlCarousel
        className="slider-items owl-theme col-8"
        {...options}
        loop
        nav
      >
        {category &&
          category.map((item) => (
            <div className="item" key={item.id} style={{ cursor: "pointer" }}>
              <img className="slider-image" src={item.src} alt={item.src} />
              <div className="text-center">
                <p className="slider-categories">{item.name.charAt(0)}</p>
                <p className="slider-name">{item.name}</p>
              </div>
            </div>
          ))}
      </OwlCarousel>
    </div>
  );
};

export default Slider;
