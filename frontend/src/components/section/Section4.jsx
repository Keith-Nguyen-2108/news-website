import React, { useEffect } from "react";

const Section4 = ({ category }) => {
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
    }, 3000);
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
            <p data-val="21">00</p>
            <h6>Hotel</h6>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
            {/* </a> */}
          </li>
          <li className="section-4-header-item">
            {/* <a href="#!"> */}
            <p data-val="08">00</p>
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
          {category &&
            [...category].reverse().map((item) => (
              <li className="section-4-below-item" key={item.id}>
                {/* <a href="#!"> */}
                <img
                  src={item.src}
                  alt=""
                  className={`${item.id % 2 === 0 ? "right" : ""}`}
                  data-aos={`${item.id % 2 === 0 ? "fade-left" : "fade-right"}`}
                  data-aos-delay="300"
                />
                <div
                  className="section-4-below-item-content"
                  data-aos={`${item.id % 2 !== 0 ? "fade-left" : "fade-right"}`}
                  data-aos-delay="500"
                >
                  <p>{item.name}</p>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse maximus, massa sit amet tempus euismod, leo orci
                    vestibulum justo, sed pharetra mi lectus sit amet enim.....
                  </p>
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
