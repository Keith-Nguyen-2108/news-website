import React from "react";
import "./search.css";

const SearchPopup = ({ clickToOpenSearch, isShowSearch }) => {
  return (
    <div className={`search ${isShowSearch === true && "on"}`}>
      <div className="search-header">
        <a href="#!" className="closebtn" onClick={clickToOpenSearch}>
          &times;
        </a>
      </div>
      <div className="search-below">
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
    </div>
  );
};

export default SearchPopup;
