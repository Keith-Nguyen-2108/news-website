import React from "react";

const SectionPost = ({ category }) => {
  return (
    <div className="section-post">
      <div className="section-post-header">
        <h1>Latest news</h1>
        <ul className="list-unstyled">
          {category &&
            category.map((item) => (
              <li
                className="section-post-header-item"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {/* <a href="#!"> */}
                <img src={item.src} alt="" />
                <div className="section-post-header-content">
                  <p>{item.name}</p>
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </div>
                {/* </a> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionPost;
