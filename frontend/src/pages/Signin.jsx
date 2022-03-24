// import axios from 'axios'
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/input/Input";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../redux/slice/UserSlice";
import "./signin.css";

const Signin = () => {
  const [isShow, setShow] = useState(false);

  let history = useHistory();

  const emailOrPhoneRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const data = {
        emailOrphone: emailOrPhoneRef.current.value(),
        password: passwordRef.current.value(),
      };
      const success = await dispatch(login(data));
      unwrapResult(success); // unwrapResult: WHEN HAVE ANY ERROR IN ACTION, WE CAN CATCH IT AND SHOW IN UI
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container">
      <form
        className="mt-4"
        name="frmLogin"
        id="frmLogin"
        method="post"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8 bg-signin">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <h1 className="text-center">Sign In</h1>
                  <div className="form-group mt-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{ height: "100%" }}
                        >
                          <i className="fa fa-user"></i>
                        </span>
                      </div>

                      <Input
                        label=""
                        type="text"
                        id="txtEmail-Signin"
                        ref={emailOrPhoneRef}
                        placeholder="Email or phone number"
                        className="form-control border"
                        min={1}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <div className="input-group">
                      <div
                        className="input-group-prepend"
                        onClick={() => setShow(!isShow)}
                      >
                        <span
                          className="input-group-text"
                          style={{ height: "100%", cursor: "pointer" }}
                        >
                          <i
                            className={`${
                              isShow === false
                                ? "fas fa-lock"
                                : "fa fa-lock-open"
                            } `}
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>

                      <Input
                        label=""
                        type={`${isShow === false ? "password" : "text"}`}
                        id="txtPassword-Signin"
                        ref={passwordRef}
                        placeholder="Password"
                        min={6}
                        className="form-control border"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col text-center">
                      <button
                        type="button"
                        className="btn btnLogin px-4"
                        name="btnLogin"
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>
                    </div>
                    {/* <div className="col-6 text-right">
                                                    <a className="btn btn-link px-0 text-dark" href="#!">Forgot password?</a>
                                                </div> */}
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="card py-5 d-md-down-none card-signup">
                <div className="card-body text-center">
                  <div>
                    <h2>Sign Up</h2>
                    <p>
                      Register to become an author for the website, contribute
                      to the variety of articles for the website.
                    </p>
                    <button
                      className="btnSignup mt-3"
                      onClick={() => history.push("/signup")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
