import { useEffect, useState } from "react";
import { axiosGetData } from "./axios";

const useGetUser = (userID) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfor = async () => {
      await axiosGetData.get("/user/" + userID).then((res) => {
        setUserInfo(res.data);
      });
    };
    getUserInfor();
  }, [userID]);
  return { userInfo };
};

export default useGetUser;
