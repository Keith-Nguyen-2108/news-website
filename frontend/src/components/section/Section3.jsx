import React from "react";

const Section3 = ({ category }) => {
  const cutArray = (arr, size) => {
    var even = [];
    var odd = [];
    even = arr.filter((i) => i.id % 2);
    odd = arr.filter((i) => !(i.id % 2));
    return [even, odd];
  };

  const data = cutArray(category, 2);

  //   data && console.log(data);

  return (
    <div className="section-3">
      {data &&
        data.map((arr, index) => (
          <div className="section-3-item" key={index}>
            <div
              className={`${
                index % 2 === 0 ? "section-3-left" : "section-3-right"
              }`}
            >
              {arr.reverse().map((item, index) => (
                <div
                  key={item.id}
                  className={`${
                    item.id % 2 !== 0
                      ? "section-3-left-item"
                      : "section-3-right-item"
                  }`}
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <img src={item.src} alt="" />
                  <p>{item.name}</p>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Section3;
