import React, { useState, useMemo } from "react";
import "./approveuser.css";
import Pagination from "../pagination/Pagination";
import data from "../pagination/data.json";
import Input from "../input/Input";
import { useRef } from "react";

const ApproveUser = ({ style }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [search, setSearch] = useState("");
  const [database, setData] = useState(data);

  const search = useRef();

  const tableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    // console.log("firstPageIndex" + firstPageIndex);
    const lastPageIndex = parseInt(firstPageIndex) + parseInt(pageSize);
    // console.log("lastPageIndex" + lastPageIndex);
    const rs = database.slice(firstPageIndex, lastPageIndex);
    // console.log(rs);
    return rs;
  }, [currentPage, database, pageSize]);

  const columns = data[0] && Object.keys(data[0]);

  const filterData = (rows) => {
    const newData = rows.filter(
      (row) =>
        row.first_name.toLowerCase().indexOf(search.current?.value()) > -1 ||
        row.last_name.toLowerCase().indexOf(search.current?.value()) > -1 ||
        row.email.toLowerCase().indexOf(search.current?.value()) > -1 ||
        row.phone.toLowerCase().indexOf(search.current?.value()) > -1
    );
    // console.log(newData);
    setData(newData);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      filterData(data);
    }
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
                      {columns &&
                        columns.map((item, index) => (
                          <th>{item.replace("_", " ")}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.first_name + " " + item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>Author</td>
                        <td>
                          <i
                            className="far fa-edit"
                            style={{ cursor: "pointer" }}
                          ></i>
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
                  totalCount={database.length}
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
