import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";
import { createAxios } from "../../utils";
import { loginSuccess } from "../../redux/authSlice";
import { logOut } from "../../redux/apiRequest";
import LogNav from "./LogNav";
import LoggedNav from "./LoggedNav";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const { pathname } = location;

  const handleLogout = () => {
    logOut(dispatch, currentUser?.id, navigate, currentUser?.accessToken, axiosJWT);
  };

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        HOME
      </Link>
      {currentUser?.accessToken ? (
        <LoggedNav currentUser={currentUser} handleLogout={handleLogout} />
      ) : (
        <LogNav />
      )}
    </nav>
  );
};

export default NavBar;
