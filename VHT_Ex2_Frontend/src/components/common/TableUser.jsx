import ModalBox from "./ModalBox";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { FaTrash } from "react-icons/fa";
import "./common.style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TableUser({ user, currentUser, stt, axiosJWT }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  toast.configure();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser(currentUser?.accessToken, dispatch, user?.id);
    getAllUsers(currentUser?.accessToken, dispatch, axiosJWT);
    setShow(false);
    toast.success("Deleted successfully");
  };
  const modal = {
    titleModal: "Delete user",
    content: "Do you want to delete the user with username " + user.name,
    typeBtn: "danger",
    titleBtn: "Delete",
    handleFunction: handleDelete,
  };
  return (
    <>
      <tr>
        <td className="stt" style={{ width: "50px" }}>
          {stt}
        </td>
        <td>{user.username}</td>
        <td>{user.name}</td>
        <td className="admin" style={{ width: "50px" }}>
          {user.admin ? user.admin : 0}
        </td>
        <td className="deleteUser">
          <button onClick={() => setShow(true)}>
            <FaTrash />
          </button>
        </td>
      </tr>
      <ModalBox show={show} setShow={setShow} modal={modal} />
    </>
  );
}

export default TableUser;
