import React from "react";
import { Link } from "react-router-dom";
import { linkAvtPost } from "../axios";

const Section2 = ({ posts }) => {
  return (
    <div className="mt-1">
      <div className="section-2">
        <h1>FEATURED NEWS</h1>
        <div className="section-2-header">
          {posts &&
            posts.slice(0, 2).map((item, index) => (
              <div
                className="section-2-header-item"
                data-aos-delay="500"
                data-aos={`${index % 2 === 0 ? "flip-left" : "flip-right"}`}
                key={item._id}
              >
                <Link to={`/article/${item._id}`}>
                  <img src={linkAvtPost + item.avatar} alt="" />
                  <div className="section-2-header-item-desc">
                    <p>{item.categoriesID.cateName}</p>
                    <h6>{item.title}</h6>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="section-2-below">
          <ul className="list-unstyled">
            {posts &&
              posts.slice(2, 6).map((item) => (
                <li className="section-2-below-item" key={item._id}>
                  <Link to={`/article/${item._id}`}>
                    <p>{item.categoriesID.cateName}</p>
                    <h6>{item.title}</h6>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section2;
