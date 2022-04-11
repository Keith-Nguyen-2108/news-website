import { useEffect, useState } from "react";
import axiosUser from "./axios";

const useGetUser = (user) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfor = async () => {
      await axiosUser.get("/user/" + user?.id).then((res) => {
        setUserInfo(res.data);
      });
    };
    getUserInfor();
  }, [user]);
  return { userInfo };
};

export default useGetUser;
