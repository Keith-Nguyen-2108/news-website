import React, { useContext, useState, useRef } from "react";
import Input from "../components/input/Input";
import { ThemeContext } from "../context/Context";
import "./signup.css";
// import axios from 'axios'

const Signup = () => {
  const email = useRef();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [{ currentComponentTheme }] = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email.current.value());
    // if(phone.match(/[a-zA-Z]/g)){
    //     alert("Phone number can only enter the number!")
    // }
    // else{
    //     const value = {
    //         username,
    //         email,
    //         password,
    //         fullname,
    //         phone,
    //     }
    //     if(avatar){
    //         const data =new FormData()
    //         // console.log(data)
    //         let d = new Date();
    //         let moment = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "-" + d.getHours() + "-"
    //         const filename = avatar.name
    //         data.append("name", filename)
    //         data.append("file", avatar)
    //         value.avatar = moment + filename
    //         try{
    //             const res = await axios.post("/auth/register" , value)
    //             if(res){
    //                 await axios.post("/upload/avatar", data)
    //                 window.location.replace("/signin")
    //             }
    //         }
    //         catch(err){
    //             alert("What you entered may already exist. Let's change something like username")
    //         }
    //     }
    // }
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
          name="frmSignup"
          id="frmSignup"
          method="post"
          encType="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group mt-4">
            <label htmlFor="slTopic">Want to become:</label>
            <select className="form-select" defaultValue="">
              <option value="" disabled="disabled">
                Choose a option
              </option>
              <option value="Reader">Reader</option>
              <option value="Author">Author</option>
            </select>
          </div>
          <div className="form-group mt-4">
            {/* <label htmlFor="txtEmail-Signup">Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              id="txtEmail-Signup"
              required
            /> */}
            <Input
              label="Email address"
              type="email"
              id="txtEmail-Signup"
              placeholder="Enter email"
              className="form-control"
              ref={email}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtUsername-Signup">User name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              id="txtUsername-Signup"
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtPwd-Signup">Password:</label>
            <div className="input-group">
              <input
                type={status ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                min="6"
                onChange={(e) => setPassword(e.target.value)}
                id="txtPwd-Signup"
                required
              />
              <div className="input-group-prepend" onClick={togglePassword}>
                <span className="input-group-text" style={{ height: "100%" }}>
                  <i
                    className={status ? "fa fa-eye" : "fa fa-eye-slash"}
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtName-Signup">Full name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              onChange={(e) => setFullName(e.target.value)}
              id="txtName-Signup"
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtPhone-Signup">Phone number:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
              id="txtPhone-Signup"
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtImage-Signup">
              Images: <i class="fa fa-paperclip" aria-hidden="true"></i>
            </label>
            <input
              type="file"
              className="form-control"
              name="file"
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
            <button type="submit" className="btn btn-primary" id="btnSignup">
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
