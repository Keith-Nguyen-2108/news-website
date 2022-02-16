import React, { useState, useContext } from "react";
// import axios from "axios";
import "./update.css";
import Input from "../../components/input/Input";
import { ThemeContext } from "../../context/Context";

const UpdateInfo = ({ user }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  // const pf = "http://localhost:5000/images/avatar/"

  const [isShow, setShow] = useState(false);

  const [email, setEmail] = useState("hello world");
  const [username, setUserName] = useState("hello world");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("hello world");
  const [phone, setPhone] = useState("0123456789");
  const [newAvatar, setNewAvatar] = useState(null);

  // useEffect(() => {
  //   setEmail(user.email)
  //   setUserName(user.username)
  //   setFullName(user.fullname)
  //   setPhone(user.phone)
  // }, []);

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

  const handleSubmit = () => {
    const data = {
      email: email.current.value(),
    };
    console.log(data);
    // let value
    // if(password !== ""){
    //     value = {
    //         username,
    //         email,
    //         password,
    //         fullname,
    //         phone,
    //     }
    // }
    // else{
    //     value = {
    //         username,
    //         email,
    //         fullname,
    //         phone,
    //     }
    // }
    // // console.log(value)
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
      <div
        className="bg-update"
        style={{
          backgroundColor: currentComponentTheme.backgroundColor,
          color: currentComponentTheme.color,
        }}
      >
        <h1 className="update-info">Update Profile</h1>
        <form
          name="frmUpdateInfo"
          id="frmUpdateInfo"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-group mt-4">
            <label>Avatar:</label>
            <img
              className="image-account"
              src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
              alt=""
            ></img>
          </div>
          <div className="form-group mt-4">
            {/* <label htmlFor="txtEmail-Update">Email address:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="txtEmail-Update"
            /> */}
            <Input
              label="Email address"
              type="email"
              id="txtEmail-Update"
              placeholder="Enter email or phone number"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-4">
            {/* <label htmlFor="txtUsername-Update">User name:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              id="txtUsername-Update"
            /> */}
            <Input
              label="User name"
              type="text"
              id="txtUsername-Update"
              placeholder="Enter user name"
              className="form-control"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
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
            {/* <label htmlFor="txtName-Update">Full name:</label> */}
            {/* <input
              type="text"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              id="txtName-Update"
            /> */}
            <Input
              label="Full name"
              type="text"
              id="txtName-Update"
              placeholder="Enter full name"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group mt-4">
            {/* <label htmlFor="txtPhone-Update">Phone number:</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="txtPhone-Update"
            /> */}
            <Input
              label="Phone number"
              type="tel"
              id="txtPhone-Update"
              placeholder="Enter phone number"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="0[0-9]{9}"
            />
            <small className="text-white">Example: 0123456789.</small>
          </div>
          <div className="form-group mt-4">
            {/* <label htmlFor="txtImage-Update">
              New avatar: <i className="fa fa-paperclip" aria-hidden="true"></i>
            </label>
            <input
              type="file"
              className="form-control"
              id="txtImage-Update"
              onChange={(e) => setAvatar(e.target.files[0])}
              
            /> */}
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
              onClick={() => handleSubmit()}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;
