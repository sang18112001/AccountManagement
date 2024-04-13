import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createAxios } from "../../utils";
import { loginSuccess } from "../../redux/authSlice";
import TableUser from "../common/TableUser";

const Dashboard = () => {
  const users = useSelector((state) => state.users.users?.allUsers);
  const listUsers = users.filter((user) => user.admin !== 1)
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  useEffect(() => {
    if (!currentUser) {
      alert("You are not authenticated. Please return to the homepage.")
      navigate('/')
    }
    getAllUsers(currentUser.accessToken, dispatch, axiosJWT);
  }, []);
  return (
    <section className="dashboard">
      <h1 className="dashboard-title">Welcome to dashboard</h1>
      <div>
        {" "}
        {listUsers.length > 0 && (
          <div className="table_box">
            <table>
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listUsers?.map((user, index) => {
                  return (
                    <TableUser
                      key={index}
                      user={user}
                      currentUser={currentUser}
                      stt={index}
                      axiosJWT={axiosJWT}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
