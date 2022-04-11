import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { linkAvt } from "../../components/axios";
import ApproveArticles from "../../components/approveArticle/ApproveArticles";
import "./profile.css";
import useGetUser from "../../components/useGetUser";

const Profile = ({ user }) => {
  // console.log(user);

  const history = useHistory();
  const { userInfo } = useGetUser(user);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar(userInfo?.avatar);
  }, [userInfo]);

  // useEffect(() => {
  //   const getUserInfor = async () => {
  //     await axiosGetData.get("/user/" + user.id).then((res) => {
  //       setUserInfo(res.data);
  //     });
  //   };
  //   getUserInfor();
  // }, [user]);
  // const clickCategoryIcon = () =>{
  //     history.push('/category')
  // }

  const element = () => {
    switch (userInfo?.role?.roleName) {
      case "Editor":
        return <ApproveArticles />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      {userInfo && (
        <div className="bg-profile">
          <div className="row d-flex justify-content-center">
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4 bg-image user-profile">
                  <div className="card-block text-center text-white card-img">
                    <div className="m-b-25">
                      <img
                        src={linkAvt + avatar}
                        className="img-radius"
                        alt="User-Profile-Img"
                      />
                    </div>
                    <h6 className="username">{userInfo?.username}</h6>
                    <p className="mt-3 position" style={{ fontSize: "18px" }}>
                      {userInfo.role?.roleName}
                    </p>
                    <div className="d-flex justify-content-evenly mt-4">
                      {userInfo.role?.roleName !== "Editor" ? (
                        <i
                          className="fa fa-plus-square profile-icon"
                          aria-hidden="true"
                          onClick={() => history.push("/create-article")}
                        >
                          <span className="tooltiptext">Create new post</span>
                        </i>
                      ) : null}

                      <i
                        className="fa fa-edit profile-icon"
                        aria-hidden="true"
                        onClick={() => history.push("/update-profile")}
                      >
                        <span className="tooltiptext">Update profile</span>
                      </i>
                      {userInfo.role?.roleName !== "Editor" ? (
                        <i
                          className="fas fa-newspaper profile-icon"
                          aria-hidden="true"
                          onClick={() => history.push("/articles-list")}
                        >
                          <span className="tooltiptext">Articles list</span>
                        </i>
                      ) : null}
                      {userInfo.role?.roleName === "Administrator" && (
                        <i
                          className="fas fa-coins profile-icon"
                          aria-hidden="true"
                          onClick={() => history.push("/dashboard")}
                        >
                          <span className="tooltiptext">dashboard</span>
                        </i>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-block">
                    <h6
                      className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"
                      style={{ fontSize: "23px", color: "black" }}
                    >
                      Information
                    </h6>
                    <div className="row text-center">
                      <div className="col-md-6 ">
                        <p className="m-b-10 f-w-600 text-dark">Email</p>
                        <h6 className="text-muted f-w-400">
                          {userInfo?.email}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <p className="m-b-10 f-w-600 text-dark">Phone</p>
                        <h6 className="text-muted f-w-400">
                          {userInfo?.phone}
                        </h6>
                      </div>
                    </div>
                    <div className="m-b-20 m-t-40 p-b-5 f-w-600">
                      <div className="row text-center">
                        <div className="col-md-6">
                          <p className="m-b-10 f-w-600 text-dark">Fullname</p>
                          <h6 className="text-muted f-w-400">
                            {userInfo?.fullname}
                          </h6>
                        </div>
                        <div className="col-md-6">
                          <p className="m-b-10 f-w-600 text-dark">
                            Create Date
                          </p>
                          <h6 className="text-muted f-w-400">
                            {new Date(userInfo?.createdAt).toDateString()}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">{element()}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
