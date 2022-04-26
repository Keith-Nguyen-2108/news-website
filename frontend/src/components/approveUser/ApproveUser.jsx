import React, { useState, useMemo, useEffect } from "react";
import "./approveuser.css";
import Pagination from "../pagination/Pagination";
// import data from "../pagination/data.json";
import Input from "../input/Input";
import { useRef } from "react";
import useFetch from "../useFetch";
import axiosUser, { axiosGetData } from "../axios";

const ApproveUser = ({ style }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [search, setSearch] = useState("");
  // const [database, setData] = useState(data);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [roles] = useFetch("/role");
  const [user, setUser] = useState([]);
  const [roleUpdate, setRoleUpdate] = useState("");

  const search = useRef();

  const getUsers = async () => {
    await axiosGetData
      .get("/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const tableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    // console.log("firstPageIndex" + firstPageIndex);
    const lastPageIndex = parseInt(firstPageIndex) + parseInt(pageSize);
    // console.log("lastPageIndex" + lastPageIndex);
    const rs = user?.slice(firstPageIndex, lastPageIndex);
    // console.log(rs);
    return rs;
  }, [currentPage, user, pageSize]);

  // const columns = data[0] && Object.keys(data[0]);

  const filterData = (rows) => {
    const newData = rows.filter(
      (row) =>
        row.username.toLowerCase().indexOf(search.current?.value()) > -1 ||
        row.email.toLowerCase().indexOf(search.current?.value()) > -1 ||
        row.phone.toLowerCase().indexOf(search.current?.value()) > -1
    );
    // console.log(newData);
    setUser(newData);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (search.current?.value().length > 0) {
        filterData(user);
      } else getUsers();
    }
  };

  const handleSave = async () => {
    // console.log(id, roleUpdate);
    const value = {
      role: roleUpdate,
    };
    await axiosUser
      .patch("/user/" + id, value)
      .then(() => alert("User has been updated!"))
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-100">
      <div className="col-12">
        <div className="card card-table" style={style}>
          <div className="card-header">
            <h4>User</h4>
          </div>
          <div className="card-body table-user">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div>
                  Show
                  <select
                    onChange={(e) => setPageSize(e.target.value)}
                    style={{
                      margin: "0 5px 1.5rem",
                      padding: "0 10px",
                      border: "none",
                      outline: "none",
                      borderRadius: "6px",
                      height: "30px",
                      paddingBottom: "2px",
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>
                  entries
                </div>
                <span
                  className="ms-4 d-flex align-items-center justify-content-center border-0"
                  style={{
                    padding: "0 20px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#6287e3",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                >
                  Save
                </span>
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Enter search..."
                  ref={search}
                  className="form-control border"
                  // onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={(e) => handleKeyUp(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table>
                  <thead>
                    <tr>
                      {/* {columns &&
                        columns.map((item, index) => (
                          <th>{item.replace("_", " ")}</th>
                        ))} */}
                      <th>Id</th>
                      <th>name</th>
                      <th>email</th>
                      <th>phone</th>
                      <th>role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData &&
                      tableData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>
                            {update === true ? (
                              item._id === id ? (
                                <select
                                  onClick={(e) => setRoleUpdate(e.target.value)}
                                  defaultValue=""
                                >
                                  <option value="" disabled="disabled">
                                    Choose role
                                  </option>
                                  {roles &&
                                    roles.map((role) => (
                                      <option value={role._id}>
                                        {role.roleName}
                                      </option>
                                    ))}
                                </select>
                              ) : (
                                <span>{item.role.roleName}</span>
                              )
                            ) : (
                              <span>{item.role.roleName}</span>
                            )}
                          </td>
                          <td>
                            <i
                              className="far fa-edit"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setId(item._id);
                                setUpdate(!update);
                              }}
                            ></i>
                          </td>
                          <td>
                            <i
                              className="far fa-trash-alt"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination
                  totalCount={user?.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePage={(page) => setCurrentPage(page)}
                  style={style}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveUser;
