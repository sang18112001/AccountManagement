import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const LogNav = () => {
  return (
    <>
      <Link to="/login" className="navbar-login">
        LOGIN
      </Link>
      <Button variant="light">
        <Link to="/register" className="navbar-register">
          REGISTER
        </Link>
      </Button>{" "}
    </>
  );
};

export default LogNav;
