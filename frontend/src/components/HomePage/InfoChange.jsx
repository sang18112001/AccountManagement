import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const InfoChange = ({ currentUser }) => {
  toast.configure();
  const [formData, setFormData] = useState({
    newUsername: "",
    newName: "",
    newPassword: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser(formData, dispatch, currentUser, setMsg, toast);

    setFormData({
      newUsername: "",
      newName: "",
      newPassword: "",
      password: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="changeInfo">
      <div className="sign">
        <div className="content">
          <h2>Change your info</h2>
          {msg && <h3 className="sign-message">{msg}</h3>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                name="newUsername"
                value={formData.newUsername}
                onChange={handleChange}
              />{" "}
              <i>Enter new username: </i>
            </div>
            <div className="inputBox">
              <input
                type="text"
                name="newName"
                value={formData.newName}
                onChange={handleChange}
              />{" "}
              <i>Enter new name: </i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />{" "}
              <i>Enter new password: </i>
            </div>
            <div className={`inputBox ${msg && "errorClass"}`} >
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />{" "}
              <i>Enter your password*: </i>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoChange;
