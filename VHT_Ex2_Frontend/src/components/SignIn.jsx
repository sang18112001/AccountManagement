import React, { useEffect, useState } from "react";
import Input from "./common/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiRequest";
import { encodePassword } from "../utils";
import { loginReload } from "../redux/authSlice";

const SignIn = () => {
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandling = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentAccount = Object.fromEntries(formData);
    const objectUser = {
      ...currentAccount,
      password: encodePassword(currentAccount.password),
      isCheck: false,
    };
    loginUser(objectUser, dispatch, navigate, setMessage);
  };
  useEffect(() => {
    dispatch(loginReload());
  }, []);
  return (
    <section className="account">
      <div className="sign">
        <div className="content">
          <h2>Sign In</h2>
          {message?.wrongUserMsg && (
            <h3 className="sign-message">{message.wrongUserMsg}</h3>
          )}
          {message?.wrongPasswordMsg && (
            <h3 className="sign-message">{message.wrongPasswordMsg}</h3>
          )}
          <form className="form" onSubmit={submitHandling}>
            <div className={message?.wrongUserMsg && "errorClass"}>
              <Input content="Username" name="username" type="text" />
            </div>
            <div className={message?.wrongPasswordMsg && "errorClass"}>
              <Input content="Password" name="password" type="password" />
            </div>
            <div className="links">
              <Link to="/">Go back to homepage</Link>
              <Link to="/register">Sign Up</Link>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
