import React, { useContext, useState, useRef } from "react";
import Input from "../components/input/Input";
import { ThemeContext } from "../context/Context";
import "./signup.css";
import { axiosGetData } from "../components/axios";

const Signup = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const fullname = useRef();
  const phone = useRef();
  const [avatar, setAvatar] = useState("");

  const [{ currentComponentTheme }] = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value(),
      username: username.current.value(),
      password: password.current.value(),
      fullname: fullname.current.value(),
      phone: phone.current.value(),
    };
    if (avatar) {
      const data = new FormData();
      // console.log(data)
      let d = new Date();
      let moment =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        "-" +
        d.getHours() +
        "-";
      const filename = avatar.name;
      data.append("name", filename);
      data.append("file", avatar);
      user.avatar = moment + filename;
      try {
        const res = await axiosGetData.post("/auth/register", user);
        if (res) {
          await axiosGetData.post("/upload/avatar", data);
          window.location.replace("/signin");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const [status, setStatus] = useState(false);
  const togglePassword = () => {
    setStatus(!status);
  };

  return (
    <div className="container">
      <div
        className="bg-signup"
        style={{
          backgroundColor: currentComponentTheme.backgroundColor,
          color: currentComponentTheme.color,
        }}
      >
        <h1 className="signup">Register</h1>
        <form
          id="frmSignup"
          // method="post"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group mt-4">
            <Input
              label="Email address"
              type="email"
              id="txtEmail-Signup"
              placeholder="Enter your email"
              className="form-control"
              ref={email}
              required={true}
            />
          </div>
          <div className="form-group mt-4">
            <Input
              label="Username"
              type="text"
              id="txtUsername-Signup"
              placeholder="Enter your username"
              className="form-control"
              ref={username}
              required={true}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtPwd-Signup">Password:</label>
            <div className="input-group">
              <Input
                label=""
                type={status ? "text" : "password"}
                id="txtPwd-Signup"
                placeholder="Enter your password"
                className="form-control"
                ref={password}
                required={true}
              />
              <div className="input-group-prepend" onClick={togglePassword}>
                <span className="input-group-text" style={{ height: "100%" }}>
                  <i className={status ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group mt-4">
            <Input
              label="Full name"
              type="text"
              id="txtName-Signup"
              placeholder="Enter your full name"
              className="form-control"
              ref={fullname}
              required={true}
            />
          </div>
          <div className="form-group mt-4">
            <Input
              label="Phone number"
              type="tel"
              id="txtPhone-Signup"
              placeholder="Enter your phone number"
              className="form-control"
              ref={phone}
              required={true}
              pattern="0[0-9]{9}"
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtImage-Signup">
              Images: <i class="fa fa-paperclip"></i>
            </label>
            <input
              type="file"
              className="form-control"
              id="txtImage-Signup"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
              style={{ display: "none" }}
            />
            {avatar && (
              <img
                className="mt-4 d-block image-preview"
                src={URL.createObjectURL(avatar)}
                alt=""
              ></img>
            )}
          </div>
          {/* <div className="form-group form-check mt-4">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" required/> If you post less than two posts in a week, your account will be deleted
                        </label>
                    </div> */}
          <div className="d-flex justify-content-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              id="btnSignup"
              // onClick={() => handleSubmit()}
            >
              Sign up
            </button>
          </div>
        </form>
        {/* <p className="text-center mt-2 text-danger">Your email or phone number or username exists. Please, change it</p> */}
      </div>
    </div>
  );
};

export default Signup;
