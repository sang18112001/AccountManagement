import React from "react";
import InfoChange from "./InfoChange";

const SignedHomePage = ({ currentUser }) => {
  const { name, username } = currentUser;
  return (
    <div className="loggedHomepage">
      <div className="home-box">
        <div className="home-content">
          <h2 className="homepage-title">Welcome {currentUser?.name}</h2>
          <h5>Your information:</h5>
          <ul>
            <li>Your name: {name}</li>
            <li>Username: {username}</li>
          </ul>
          <h5>Your role: {currentUser?.admin ? "Admin" : "User"}</h5>
          <ul>
            {currentUser?.admin ? (
              <li>
                The admin role grants users elevated privileges, allowing them
                access to the dashboard website for administrative tasks like
                managing user accounts. Admins have the authority to change
                their own information as well as delete other user accounts
                within the system.
              </li>
            ) : (
              <li>
                The user role provides standard privileges for regular users,
                enabling them to update their personal information such as their
                name or password.
              </li>
            )}
          </ul>
        </div>
        <InfoChange currentUser={currentUser} />
      </div>
    </div>
  );
};

export default SignedHomePage;
