import React, { useEffect, useState } from "react";
import { axiosGetData } from "../axios";
import BarChart from "./BarChart";
import "./chart.css";
import LineChart from "./LineChart";
const Chart = ({ style }) => {
  const [postsMonth, setPostsMonth] = useState([]);
  const [postsWeek, setPostsWeek] = useState([]);
  const [usersMonth, setUsersMonth] = useState([]);
  const [usersWeek, setUsersWeek] = useState([]);

  const year = new Date().getFullYear();

  // const getCurrentWeekOfYear = () => {
  //   const d = new Date();
  //   let firstDateOfYear = new Date(d.getFullYear(), 0, 1);
  //   let toDate = Math.floor(((d - firstDateOfYear) / 24) * 60 * 60 * 1000);
  //   let currentWeek = Math.ceil((d.getDay() + 1 + toDate) / 7);
  //   return currentWeek;
  // };

  const handlePostsMonth = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].total_posts_month);
    }
    setPostsMonth(newArr);
  };

  const handlePostsWeek = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].total_posts_week);
    }
    setPostsWeek(newArr);
  };

  const handleUsersMonth = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].total_users_month);
    }
    setUsersMonth(newArr);
  };

  const handleUsersWeek = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].total_users_week);
    }
    setUsersWeek(newArr);
  };

  useEffect(() => {
    const statisticsOfArticlesByMonth = async () => {
      await axiosGetData
        .get("/post/groupByMonth?year=" + year)
        .then((res) => {
          handlePostsMonth(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const statisticsOfArticlesByWeek = async () => {
      // let curWeek = getCurrentWeekOfYear();
      await axiosGetData
        .get("/post/groupByWeek?year=" + year + "&week=" + 13)
        .then((res) => {
          handlePostsWeek(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const statisticsOfUsersByMonth = async () => {
      await axiosGetData
        .get("/user/groupByMonth?year=" + year)
        .then((res) => {
          handleUsersMonth(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const statisticsOfUsersByWeek = async () => {
      // let curWeek = getCurrentWeekOfYear();
      await axiosGetData
        .get("/user/groupByWeek?year=" + year + "&week=" + 1)
        .then((res) => {
          handleUsersWeek(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    statisticsOfUsersByMonth();
    statisticsOfArticlesByWeek();
    statisticsOfUsersByWeek();
    statisticsOfArticlesByMonth();
  }, [year]);

  return (
    <div className="combined-chart">
      <LineChart style={style} posts={postsMonth} users={usersMonth} />
      <BarChart style={style} posts={postsWeek} users={usersWeek} />
    </div>
  );
};

export default Chart;
