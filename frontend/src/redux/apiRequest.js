import axios from "axios";
import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
import { encodePassword } from "../utils";

export const loginUser = async (user, dispatch, navigate, setMessage) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      user,
      {
        withCredentials: true,
      }
    ); 
    dispatch(loginSuccess(response?.data));
    navigate("/");
  } catch (error) {
    setMessage(error.response?.data);
    dispatch(loginFailed());
  }
};

export const registerUser = async (newUser, dispatch, navigate, setMessage) => {
  dispatch(registerStart());
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/auth/register`, newUser)
    .then((response) => {
      console.log(response)
      dispatch(registerSuccess());
      navigate("/login");
    })
    .catch((error) => {
      dispatch(registerFailed());
      setMessage(error?.response?.data);
    });
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const response = await axiosJWT.get(
      `${process.env.REACT_APP_BASE_URL}/user`,
      {
        headers: {
          token: "Bearer " + accessToken,
        },
      }
    );
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/user/${id}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(deleteUserSuccess(response));
  } catch (error) {
    dispatch(deleteUserFailed());
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    const response = await axiosJWT.post(
      `${process.env.REACT_APP_BASE_URL}/auth/logout`,
      id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(logOutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const updateUser = async (
  newData,
  dispatch,
  currentUser,
  setMsg,
  toast
) => {
  dispatch(loginStart());
  const { newUsername, newName, newPassword, password } = newData;
  const encodedPassword = encodePassword(password);
  if (!newUsername && !newName && !newPassword) {
    alert("You haven't made any new changes. Please re-enter.");
    return;
  }
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/auth/checkpass`, {
      username: currentUser.username,
      password: encodedPassword,
    })
    .then(async (data) => {
      if (!data.data) {
        setMsg("Invalid password");
      } else {
        setMsg("");
        const newUser = {
          username: newUsername || currentUser.username,
          name: newName || currentUser.name,
          password: newPassword ? encodePassword(newPassword) : encodedPassword,
        };
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/auth/update`,
            newUser,
            {
              headers: {
                token: "Bearer " + currentUser.accessToken,
              },
            }
          );
          dispatch(
            loginSuccess({
              ...currentUser,
              username: newUser.username,
              name: newUser.name,
            })
          );
          toast.success(
            "Your account information has been successfully updated."
          );
          // navigate("/");
        } catch (error) {
          // setMessage(error.response?.data);
          console.log(error);
          dispatch(loginFailed());
        }
      }
    })
    .catch((err) => console.log(err));
};
