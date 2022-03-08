import React, { useContext, useEffect, useState } from "react";
import CategoryDropDown from "../dropdown/CategoryDropDown";
import { Link } from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../../context/Context";
import { axiosGetData } from "../axios";

const Navbar = () => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  const [parent, setParent] = useState([]);
  const [child, setChild] = useState();

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
      await axiosGetData.get("/category/childFromParent").then((res) => {
        let parents = getHighestLevelCategory(res.data);
        setParent(parents);
        let childs = getChildCategories(parents);
        setChild(childs);
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
            {parent &&
              parent.map((item, index) => (
                <li key={item._id}>
                  <Link
                    to="/article"
                    style={{
                      color: currentComponentTheme.color,
                    }}
                  >
                    {item.cateName}
                    <div className="dropdown-movie">
                      <CategoryDropDown item={child} index={index} />
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
