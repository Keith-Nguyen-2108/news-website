import React from "react";
import "./sidebar.css";

const Sidebar = ({ clickToOpenSide, isShowSide }) => {
  return (
    <div className={`sidenav ${isShowSide === true ? "side" : "hide"}`}>
      <div className="header-sidebar">
        <h1>Mean</h1>
        <a href="#!" className="closebtn" onClick={clickToOpenSide}>
          &times;
        </a>
      </div>
      <div className="sidebar-item">
        <ul className="list-unstyled">
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">Home</a>
          </li>
        </ul>
      </div>
      <div style={{ borderTop: "1px solid gainsboro" }}>
        <form id="search-sidebar" method="post" encType="multipart/form-data">
          <div className="d-flex">
            <div className="txtSearch">
              <input type="text" placeholder="Search.." name="search" />

              <div className="btnSearch">
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
