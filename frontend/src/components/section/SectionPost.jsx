import React from "react";
import { Link } from "react-router-dom";
import { linkAvtPost } from "../axios";

const SectionPost = ({ posts }) => {
  return (
    <div className="section-post">
      <div className="section-post-header">
        <h1>Latest news</h1>
        <ul className="list-unstyled">
          {posts &&
            posts.map((item) => (
              <li
                className="section-post-header-item"
                key={item._id}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Link to={`/article/${item._id}`}>
                  <img src={linkAvtPost + item.avatar} alt="" />
                  <div className="section-post-header-content">
                    <p>{item?.categoriesID.cateName}</p>
                    <h6>{item.title}</h6>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionPost;
