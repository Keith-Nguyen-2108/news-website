import React, { useState, useContext } from "react";
// import axios from "axios";
import "./update.css";
import Input from "../../components/input/Input";
import { ThemeContext } from "../../context/Context";
import { linkAvt } from "../../components/axios";

const UpdateInfo = ({ user }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  const [isShow, setShow] = useState(false);

  const [email, setEmail] = useState(user?.email);
  const [username, setUserName] = useState(user?.username);
  const [password, setPassword] = useState();
  const [fullname, setFullName] = useState(user?.fullname);
  const [phone, setPhone] = useState(user?.phone);
  const [newAvatar, setNewAvatar] = useState(null);

  // const d = new Date();
  // const moment =
  //   d.getDate() +
  //   "-" +
  //   (d.getMonth() + 1) +
  //   "-" +
  //   d.getFullYear() +
  //   "-" +
  //   d.getHours() +
  //   "-";

  const handleSubmit = (e) => {
    e.preventDefault();
    let value;
    if (password !== "") {
      value = {
        username,
        email,
        password,
        fullname,
        phone,
      };
    } else {
      value = {
        username,
        email,
        fullname,
        phone,
      };
    }
    console.log(value);
    // if(avatar){
    //     const data = new FormData()
    //     data.append("name", avatar.name)
    //     data.append("file", avatar)
    //     value.avatar = moment + avatar.name
    //     try{
    //         await axios.post("/upload/avatar", data)
    //     }
    //     catch(err){}
    // }
    // try{
    //     const res = await axios.put("/users/" + user._id, value)
    //     dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    //     alert("Your information has been updated")
    // }
    // catch(err){
    //     dispatch({type: "UPDATE_FAILURE"})
    //     // console.log(err)
    // }
  };

  return (
    <div className="container">
      {user && (
        <div
          className="bg-update"
          style={{
            backgroundColor: currentComponentTheme.backgroundColor,
            color: currentComponentTheme.color,
          }}
        >
          <h1 className="update-info">Update Profile</h1>
          <form
            id="frmUpdateInfo"
            // method="post"
            encType="multipart/form-data"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-group mt-4">
              <label>Avatar:</label>
              <img
                className="image-account"
                src={linkAvt + user?.avatar}
                alt=""
              ></img>
            </div>
            <div className="form-group mt-4">
              <Input
                label="Email address"
                type="email"
                id="txtEmail-Update"
                placeholder="Enter email or phone number"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group mt-4">
              <Input
                label="User name"
                type="text"
                id="txtUsername-Update"
                placeholder="Enter user name"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="txtPwd-Update">
                New Password: <span></span>
              </label>
              <div className="input-group">
                <Input
                  type={`${isShow === false ? "password" : "text"}`}
                  id="txtPwd-Update"
                  placeholder="Enter user name"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="input-group-prepend"
                  onClick={() => setShow(!isShow)}
                >
                  <span
                    className="input-group-text"
                    style={{ height: "100%", cursor: "pointer" }}
                  >
                    <i
                      className={isShow ? "fa fa-eye" : "fa fa-eye-slash"}
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group mt-4">
              <Input
                label="Full name"
                type="text"
                id="txtName-Update"
                placeholder="Enter full name"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required={true}
              />
            </div>
            <div className="form-group mt-4">
              <Input
                label="Phone number"
                type="tel"
                id="txtPhone-Update"
                placeholder="Enter phone number"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                pattern="0[0-9]{9}"
              />
              <small className="text-white">Example: 0123456789.</small>
            </div>
            <div className="form-group mt-4">
              <Input
                label="New avatar"
                type="file"
                id="txtImage-Update"
                className="form-control"
                onChange={(e) => setNewAvatar(e.target.files[0])}
              />
              {newAvatar && (
                <img
                  className="d-block mt-4 image-preview"
                  src={URL.createObjectURL(newAvatar)}
                  alt=""
                ></img>
              )}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-success"
                id="btnUpdateInfo"
                // onClick={() => handleSubmit()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateInfo;
