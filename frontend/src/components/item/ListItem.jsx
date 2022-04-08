import "./item.css";
import { linkAvt } from "../axios";
import useFetch from "../useFetch";

const ListItem = ({ style }) => {
  const [topThreeTopic] = useFetch("/post/groupByCategory");
  const [topThreeUserPosts] = useFetch("/post/groupByUser");
  const [topThreeUserViews] = useFetch("/post/getViewByGroupUser");

  // useCallback(() => {
  //   const getTopThreeTopic = async () => {
  //     await axiosGetData.get("/post/groupByCategory").then((res) => {
  //       let value = res.data;
  //       setTopThreeTopic(value.slice(0, 4));
  //     });
  //   };

  //   const getTopThreeAuthorWithPosts = async () => {
  //     await axiosGetData.get("/post/groupByUser").then((res) => {
  //       let value = res.data;
  //       setTopThreeUserPosts(value.slice(0, 3));
  //     });
  //   };

  //   const getTopThreeAuthorWithViews = async () => {
  //     await axiosGetData.get("/post/getViewByGroupUser").then((res) => {
  //       let value = res.data;
  //       setTopThreeUserViews(value.slice(0, 3));
  //     });
  //   };

  //   getTopThreeTopic();
  //   getTopThreeAuthorWithPosts();
  //   getTopThreeAuthorWithViews();
  // }, []);

  return (
    <div className="list-card">
      <div className="cards d-flex flex-wrap justify-content-between">
        <div className="card card-list" style={style}>
          <div className="card-header">
            <h4>Topics with multiple articles</h4>
          </div>
          <div className="card-body">
            <ul className="list-item">
              {topThreeTopic &&
                topThreeTopic.slice(0, 4).map((item) => (
                  <li className="d-flex">
                    <div className="w-100">
                      <i className="list-item-icon"></i>
                      <div className="d-flex justify-content-between">
                        <h6>{item.cateName[0]}</h6>
                        <h6>{item.total_posts_category}</h6>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="card card-list" style={style}>
          <div className="card-header">
            <h4>Authors with many articles</h4>
          </div>
          <div className="card-body">
            <div className="list-item-user">
              {topThreeUserPosts &&
                topThreeUserPosts.slice(0, 3).map((item) => (
                  <div className="row align-items-center mb-4">
                    <div className="col-3">
                      <img src={linkAvt + item.avatar} alt="" />
                    </div>
                    <div className="col-9 d-flex justify-content-between">
                      <h6>{item.userName}</h6>
                      <h6>{item.total_users__posts}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="card card-list" style={style}>
          <div className="card-header">
            <h4> Authors with the most views</h4>
          </div>
          <div className="card-body">
            <ul className="list-item">
              {topThreeUserViews &&
                topThreeUserViews.slice(0, 3).map((item) => (
                  <li className="d-flex">
                    <div className="w-100">
                      <i className="list-item-icon"></i>
                      <div className="d-flex justify-content-between">
                        <h6>{item.userName}</h6>
                        <h6>{item.totalView}</h6>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
