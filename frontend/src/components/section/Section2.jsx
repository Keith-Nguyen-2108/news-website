import React from "react";

const Section2 = ({ category }) => {
  const data = category.slice(0, 2);

  return (
    <div className="mt-1">
      <div className="section-2">
        <h1>FEATURED NEWS</h1>
        <div className="section-2-header">
          {data &&
            data.map((item) => (
              <div
                className="section-2-header-item"
                data-aos-delay="500"
                data-aos={`${item.id % 2 === 0 ? "flip-left" : "flip-right"}`}
                key={item.id}
              >
                <img src={item.src} alt="" />
                <div className="section-2-header-item-desc">
                  <p>{item.name}</p>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </div>
              </div>
            ))}
        </div>
        <div className="section-2-below">
          <ul className="list-unstyled">
            {category &&
              category.map((item) => (
                <li className="section-2-below-item" key={item.id}>
                  {/* <a href="#!"> */}
                  <p>{item.name}</p>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                  {/* </a> */}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section2;
