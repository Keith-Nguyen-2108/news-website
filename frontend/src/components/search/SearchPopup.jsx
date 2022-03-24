import React, { useContext, useState } from "react";
import "./search.css";
import { ThemeContext } from "../../context/Context";
import { Link, useHistory } from "react-router-dom";
import RightBar from "../rightSide/RightBar";

const SearchPopup = ({ clickToOpenSearch, isShowSearch = false, setShow }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);

  const [search, setSearch] = useState("");

  const d = new Date("Sun Mar 20 2022 20:19:05 GMT+0700 ");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();
  const datePost = month + " " + date + ", " + year;

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(isShowSearch);
    history.push("/search/?s=" + search);
  };

  return (
    <div
      className={`search-popup ${isShowSearch === true ? "on" : ""}`}
      style={{
        backgroundColor: currentComponentTheme.backgroundColor,
        color: currentComponentTheme.color,
      }}
    >
      {/* <div className="search-popup__header"> */}
      <a href="#!" className="closebtn" onClick={clickToOpenSearch}>
        &times;
      </a>
      {/* </div> */}
      <div className="search-popup__below">
        <div className={`search-popup__form ${search.length > 0 && "active"}`}>
          <form
            id="search-main"
            // method="post"
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
            className="d-flex"
          >
            <input
              type="text"
              placeholder="Search.."
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button className="btnSearch" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="search-below-item">
            <div className="popular-post">
              <p>popular post</p>
              <ul className="list-unstyled">
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
              </ul>
            </div>
            <div className="popular-category">
              <p>popular categories</p>
              <ul className="list-unstyled">
                <li className="popular-category-item">
                  <a href="#!">Hotel</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Restaurant</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Food</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Check-in</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`search-popup__search-results ${
            search.length > 0 && "active"
          }`}
        >
          <div style={{ opacity: 1 }}>
            <div
              className={`search-popup__search-results-content ${
                search.length > 0 && "active"
              }`}
            >
              <div className="search-popup__bg-big-post">
                <div className="search-popup__big-post">
                  <Link to="/">
                    <img
                      src="https://static.boredpanda.com/blog/wp-content/uuuploads/unbelievable-places/unbelievable-places-8.jpg"
                      alt=""
                      width={800}
                      height={400}
                    />
                  </Link>
                </div>
                <div className="search-popup__big-post-container">
                  <Link
                    to="/"
                    className="position-relative"
                    style={{ width: "90%" }}
                  >
                    <span className="category__post">Travel</span>
                    <h3 className="big-post__title__post mt-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h3>
                    <span className="big-post__date">{datePost}</span>
                  </Link>
                </div>
              </div>
              <div className="search-popup__bg-list-post">
                <div className="list-post__left-side">
                  <div className="left-side__post">
                    <img
                      src="https://static.boredpanda.com/blog/wp-content/uuuploads/unbelievable-places/unbelievable-places-8.jpg"
                      alt=""
                      width={800}
                      height={400}
                    />
                    <h3 className="left-side__post-title mt-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h3>
                  </div>
                </div>
                <div className="list-post__right-side">
                  <RightBar
                    line={false}
                    quantity={3}
                    leftOrder={2}
                    rightOrder={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="search-below">
        <div>
          <form
            id="search-main"
            method="post"
            encType="multipart/form-data"
            className="d-flex"
          >
            <input type="text" placeholder="Search.." name="search" />

            <div className="btnSearch">
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
          <div className="search-below-item">
            <div className="popular-category">
              <p>popular categories</p>
              <ul className="list-unstyled">
                <li className="popular-category-item">
                  <a href="#!">Hotel</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Restaurant</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Food</a>
                </li>
                <li className="popular-category-item">
                  <a href="#!">Check-in</a>
                </li>
              </ul>
            </div>
            <div className="popular-post">
              <p>popular post</p>
              <ul className="list-unstyled">
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
                <li className="popular-post-item">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SearchPopup;
