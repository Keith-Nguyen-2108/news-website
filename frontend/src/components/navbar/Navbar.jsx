import React, { useContext } from "react";
import HotelDropDown from "../dropdown/HotelDropDown";
import { Link } from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../../context/Context";

const Navbar = () => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);

  return (
    <nav
      id="navbar"
      className="navigation hidden-xs hidden-sm"
      style={{
        backgroundColor: currentComponentTheme.backgroundColor,
        color: currentComponentTheme.color,
      }}
    >
      <div className="container">
        <div className="nav-cus">
          <ul className="d-flex justify-content-between list-unstyled">
            <li>
              <Link
                to="/"
                style={{
                  color: currentComponentTheme.color,
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/article"
                style={{
                  color: currentComponentTheme.color,
                }}
              >
                Home
                <div className="dropdown-movie">
                  <HotelDropDown />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/article"
                style={{
                  color: currentComponentTheme.color,
                }}
              >
                Home
                <div className="dropdown-movie">
                  <HotelDropDown />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/article"
                style={{
                  color: currentComponentTheme.color,
                }}
              >
                Home
                <div className="dropdown-movie">
                  <HotelDropDown />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/article"
                style={{
                  color: currentComponentTheme.color,
                }}
              >
                Home
                <div className="dropdown-movie">
                  <HotelDropDown />
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/article"
                style={{
                  color: currentComponentTheme.color,
                }}
              >
                Home
                <div className="dropdown-movie">
                  <HotelDropDown />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
