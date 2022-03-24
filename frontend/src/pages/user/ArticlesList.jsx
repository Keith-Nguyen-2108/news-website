import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/Context";
import "./articlelist.css";
import { axiosGetData } from "../../components/axios";
import { useHistory } from "react-router-dom";

const ArticlesList = ({ user }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  const [news, setNews] = useState([]);

  // const news = 10;

  useEffect(() => {
    const getNewFollowUser = async () => {
      const value = await axiosGetData.get("/post?authorID=" + user.id);
      // console.log(value);
      setNews(value.data);
    };
    getNewFollowUser();
  }, [user]);

  const history = useHistory();

  // const handleDelete = async(id) =>{
  //     // console.log(id)

  //     await axios.delete("/posts/"+id)
  //                 .then(()=>{
  //                     window.location.reload()
  //                 })
  //                 .catch(err=>{})
  // }

  return (
    <div className="container">
      {news && (
        <div
          className="articlesList"
          style={{
            backgroundColor: currentComponentTheme.backgroundColor,
            color: currentComponentTheme.color,
          }}
        >
          <h1>Articles List</h1>
          <table
            className="table mt-5 text-center"
            style={{
              backgroundColor: currentComponentTheme.backgroundColor,
              color: currentComponentTheme.color,
            }}
          >
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Topic</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Detail</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {news &&
                news.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.categoriesID?.cateName}</td>
                    <td style={{ width: "35%", wordWrap: "break-word" }}>
                      {item.title}
                    </td>
                    <td>{new Date(item.createdAt).toDateString()}</td>
                    <td>{item.status}</td>
                    {/* {
                                                    item.status === "Approved" ? (
                                                        <>
                                                            <td>Can't Fix</td>
                                                            <td>Can't delete</td>
                                                        </>
                                                    ):( */}
                    {/* onClick={() => history.push(`/articleDetail/${item._id}`)} -  onClick={() =>handleDelete(item._id)}
                                                        <> */}
                    <td>
                      <i
                        className="fa fa-edit article-edit-icon"
                        aria-hidden="true"
                        style={{
                          color: "rgb(94, 245, 144)",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          history.push(`/article-detail/${item._id}`)
                        }
                      >
                        <span className="tooltiptext">Edit</span>
                      </i>
                    </td>
                    <td>
                      <i
                        className="fa fa-minus-circle article-delete-icon"
                        aria-hidden="true"
                        style={{ color: "rgb(255, 47, 95)", cursor: "pointer" }}
                      >
                        <span className="tooltiptext">Delete</span>
                      </i>
                    </td>
                    {/* </>
                                                    )
                                                }
                                                 */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
