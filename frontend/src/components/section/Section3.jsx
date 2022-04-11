import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkAvtPost } from "../axios";

const Section3 = ({ posts }) => {
  const addAnotherId = (arr) => {
    let i = 0;
    let array = arr.map((item) => Object.assign({ id: ++i }, item));
    var even = [];
    var odd = [];
    even = array.filter((i) => i.id % 2);
    odd = array.filter((i) => !(i.id % 2));
    setPosts([odd, even]);
  };

  const [listPosts, setPosts] = useState([]);

  useEffect(() => {
    addAnotherId(posts);
  }, [posts]);

  // listPosts && console.log(listPosts);

  return (
    <div className="section-3">
      {listPosts &&
        listPosts.map((arr, index) => (
          <div className="section-3-item" key={index}>
            <div
              className={`${
                index % 2 === 0 ? "section-3-left" : "section-3-right"
              }`}
            >
              {arr.map((item) => (
                <div
                  key={item._id}
                  className={`${
                    item.id % 2 !== 0
                      ? "section-3-left-item"
                      : "section-3-right-item"
                  }`}
                  data-aos="zoom-in"
                  data-aos-delay="300"
                  id={item.id}
                >
                  <Link to={`/article/${item._id}`}>
                    <img
                      src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                      alt=""
                    />
                    <p>{item.categoriesID.cateName}</p>
                    <h6>{item.title}</h6>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Section3;
