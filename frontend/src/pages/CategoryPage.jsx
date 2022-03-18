import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosGetData } from "../components/axios";
import RightBar from "../components/rightSide/RightBar";
import "./categorypage.css";

const CategoryPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getPostsFollowCategory = async () => {
      await axiosGetData.get("/");
    };
  }, []);

  return (
    <div className="w-100">
      <div className="category__container">
        <h1 className="category__page__title">{path}</h1>
        <div className="category__section1 row w-100">
          {[...Array(2).keys()].map((_, index) => (
            <div
              className="col-sm-12 col-md-12 col-lg-6"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                className="category__big_image"
                style={{
                  order: index % 2 === 0 ? 1 : 2,
                  marginTop: index % 2 !== 0 ? "30px" : null,
                  marginBottom: index % 2 === 0 ? "30px" : null,
                }}
              >
                <img
                  src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                  alt="big-img"
                />
                <div className="category-page__short-desc">
                  <span className="category-page__category__post">{path}</span>
                  <p className="category-page__title__post">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div
                className="d-flex justify-content-between flex-wrap"
                style={{
                  order: index % 2 === 0 ? 2 : 1,
                }}
              >
                <div className="category__small_image">
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="small-img"
                  />
                  <div className="category-page__short-desc">
                    <span className="category-page__category__post">
                      {path}
                    </span>
                    <p className="category-page__title__post">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                <div className="category__small_image">
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="small-img"
                  />
                  <div className="category-page__short-desc">
                    <span className="category-page__category__post">
                      {path}
                    </span>
                    <p className="category-page__title__post">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="category__section2 row w-100 d-flex justify-content-between">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-9">
            <div className="category__section2__listpost">
              {[...Array(20).keys()].map((item) => (
                <div className="category__post__container" key={item}>
                  <img
                    className="rounded float-left category__avatar__post"
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="post-avatar"
                  />
                  <div className="category__content__post">
                    <p className="category__title__post">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="category__post__cate-name">{path}</p>
                    <label className="category__post__created-date">
                      <b>Date: </b>
                      {new Date().toDateString()}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
