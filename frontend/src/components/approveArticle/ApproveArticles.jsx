import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/Context";
import useFetch from "../useFetch";

const ApproveArticles = () => {
  const history = useHistory();
  const [{ currentTheme }] = useContext(ThemeContext);

  const [posts] = useFetch("/post");

  return (
    <div className="container-fluid">
      <div className="bg-approveArticle">
        <h1 className="mt-2">Articles List</h1>
        <table className="table mt-5 text-center" style={currentTheme}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Topic</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map(
                (item, index) =>
                  item.status !== "Approved" && (
                    <tr key={index} className="align-middle">
                      <td>{index + 1}</td>
                      <td>{item.categoriesID.cateName}</td>
                      <td style={{ width: "35%", wordWrap: "break-word" }}>
                        {item.title}
                      </td>
                      <td>{new Date(item.createdAt).toDateString()}</td>
                      <td>{item.status}</td>
                      <td
                        onClick={() =>
                          history.push(`/article-detail/${item._id}`)
                        }
                      >
                        <i
                          className="fa fa-edit"
                          aria-hidden="true"
                          style={{ color: "#5bef5b", cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveArticles;
