import React, { useEffect, useState } from "react";
import Input from "./common/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/apiRequest";
import { encodePassword } from "../utils";
import { registerReload } from "../redux/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  toast.configure();
  const submitHandling = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData);
    const objectUser = {
      ...newUser,
      password: encodePassword(newUser.password),
    };
    registerUser(objectUser, dispatch, navigate, setMessage);
    toast.success("You have successfully registered")
  };

  useEffect(() => {
    dispatch(registerReload())
  }, [])
  return (
    <section className="account">
      <div className="sign">
        <div className="content">
          <h2>Sign Up</h2>
          {message && (
            <h3 className="sign-message">{message}</h3>
          )}
          <form className="form" onSubmit={submitHandling}>
            <div className={message && "errorClass"}>
              <Input content="Username: " name="username" type="text" />
            </div>
            <Input content="Your name: " name="name" type="text" />
            <Input content="Password: " name="password" type="password" />
            <div className="links">
              <Link to="/">Go back to homepage</Link>
              <Link to="/login">Sign In</Link>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
