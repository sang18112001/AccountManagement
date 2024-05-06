import React from "react";
import { Link } from "react-router-dom";

const LoggedNav = ({currentUser, handleLogout}) => {
  return (
    <>
      <p className="navbar-user">
        Hi, <span>{currentUser?.name}</span>
      </p>
      {currentUser?.admin && (
        <Link to="/dashboard" className="navbar-dashboard">
          Dashboard
        </Link>
      )}
      <Link className="navbar-logout" onClick={handleLogout}>
        Log out
      </Link>
    </>
  );
};

export default LoggedNav;
