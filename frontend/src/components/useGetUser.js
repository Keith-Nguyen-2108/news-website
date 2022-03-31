import { useEffect, useState } from "react";
import axiosUser from "./axios";

const useGetUser = (userID) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfor = async () => {
      await axiosUser.get("/user/" + userID).then((res) => {
        setUserInfo(res.data);
      });
    };
    getUserInfor();
  }, [userID]);
  return { userInfo };
};

export default useGetUser;
