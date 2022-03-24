import React, { useContext, useState, useEffect } from "react";
import "./sidebar.css";
import { ThemeContext } from "../../context/Context";
import { axiosGetData } from "../axios";
import { Link } from "react-router-dom";

const Sidebar = ({ clickToOpenSide, isShowSide }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  const [parent, setParent] = useState([]);

  const getHighestLevelCategory = (array) => {
    const highestLevelComment = array.filter((item) => item.child.length > 0);
    return highestLevelComment;
  };
  useEffect(() => {
    const getCategory = async () => {
      await axiosGetData.get("/category/childFromParent").then((res) => {
        let parents = getHighestLevelCategory(res.data);
        setParent(parents);
        // console.log(parents);
        // let childs = getChildCategories(parents.child);
        // setChild(childs);
        // console.log(childs);
      });
    };
    getCategory();
  }, []);

  return (
    <div
      className={`sidenav ${isShowSide === true ? "side" : "hide"}`}
      style={{
        backgroundColor: currentComponentTheme.backgroundColor,
        color: currentComponentTheme.color,
      }}
    >
      <div
        className="header-sidebar"
        style={{
          borderBottom: `1px solid ${currentComponentTheme.color}`,
        }}
      >
        <h1>Mean</h1>
        <span className="closebtn" onClick={clickToOpenSide}>
          &times;
        </span>
      </div>
      <div className="sidebar-item">
        <ul
          className="list-unstyled"
          style={{ color: currentComponentTheme.color }}
        >
          <li>
            <Link className=" d-block" to="/">
              Home
            </Link>
          </li>
          {parent &&
            parent.map((item) => (
              <li key={item._id}>
                <Link
                  to="#child"
                  className="dropdown d-block"
                  data-toggle="collapse"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${item.cateName}`}
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span>{item.cateName}</span>
                  <span>
                    <i className="far fa-arrow-alt-circle-down"></i>
                  </span>
                </Link>
                <ul className="list-unstyled collapse" id={item.cateName}>
                  {item.child &&
                    item.child.map((childItem) => (
                      <li key={childItem._id}>
                        <Link to="/">
                          <span>{childItem.cateName}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
      <div
        style={{
          borderTop: "1px solid gainsboro",
        }}
      >
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
