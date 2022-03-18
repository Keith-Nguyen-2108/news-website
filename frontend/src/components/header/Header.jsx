import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SearchPopup from "../search/SearchPopup";
import Sidebar from "../sidebar/Sidebar";
import "./header.css";
import { logout } from "../../redux/slice/UserSlice";
import { useDispatch } from "react-redux";
import { linkAvt } from "../axios";

function Header({ user }) {
  const history = useHistory();

  const dispatch = useDispatch();

  const [show, setShow] = useState({ isShowSearch: false, isShowSide: false });
  // const [side, setSide] = useState(false);
  // const [search, setSearch] = useState(false);
  const clickToOpenSide = () => {
    setShow((prev) => ({
      isShowSide: !prev.isShowSide,
    }));
  };
  const clickToOpenSearch = () => {
    setShow((prev) => ({
      isShowSearch: !prev.isShowSearch,
    }));
  };

  return (
    <React.Fragment>
      {/* Lap, PC header */}
      <div className=" hidden-xs hidden-sm">
        <div className="big-header">
          <div className="row">
            <div className="col-3">
              <ul className="social-media">
                <li>
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fab fa-facebook-square" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fab fa-twitter-square" aria-hidden="true"></i>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <h1>Mean</h1>
            </div>
            <div className="col-3">
              <ul className="right-bar">
                <li>
                  <i
                    className="fa fa-search"
                    aria-hidden="true"
                    onClick={clickToOpenSearch}
                  ></i>
                </li>
                <li>
                  {user ? (
                    <div className="d-flex">
                      <img
                        className="header-avatar"
                        src={linkAvt + user.avatar}
                        alt=""
                        onClick={() => history.push("/profile")}
                      />
                      <Link to="">
                        <i
                          className="fas fa-sign-out-alt"
                          onClick={() => dispatch(logout())}
                        ></i>
                      </Link>
                    </div>
                  ) : (
                    <Link to="/signin">
                      <i className="fa fa-user-circle" aria-hidden="true"></i>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Navbar />
        <SearchPopup
          clickToOpenSearch={clickToOpenSearch}
          isShowSearch={show.isShowSearch}
        />
      </div>
      {/* Tab, Mobile header */}
      <div className="small-header show-xs show-sm">
        <div className="container">
          <div
            className="d-flex justify-content-between"
            style={{ alignItems: "center" }}
          >
            <h1>Mean</h1>
            <div id="btnBar">
              <i
                className="fa fa-bars"
                aria-hidden="true"
                onClick={clickToOpenSide}
              ></i>
            </div>
          </div>
        </div>
        <Sidebar
          clickToOpenSide={clickToOpenSide}
          isShowSide={show.isShowSide}
        />
      </div>
    </React.Fragment>
  );
}

export default React.memo(Header);
