import React, { useContext, useEffect } from "react";
import HotelDropDown from "../dropdown/HotelDropDown";
import { Link } from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../../context/Context";
import { axiosGetData } from "../axios";

const Navbar = () => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  // const [data, setData] = useState([]);

  const getHighestLevelCategory = (array) => {
    const highestLevelComment = array.filter((item) => item.childName !== "");
    return highestLevelComment;
  };

  const getChildCategories = (array) => {
    const child = array.map((item) =>
      item.childName.split(",").filter((item) => item !== "")
    );
    return child;
  };

  useEffect(() => {
    const getCategory = async () => {
      await axiosGetData.get("/category/sort").then((res) => {
        let parent = getHighestLevelCategory(res.data);
        console.log(parent);
        let child = getChildCategories(parent);
        console.log(child);
      });
    };
    getCategory();
  }, []);

  // console.log(data);

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
