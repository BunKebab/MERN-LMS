import React from "react";
import { logoutUser } from "../../actions/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn btn-error w-full mt-5"
        onClick={() => document.getElementById("logout_modal").showModal()}
      >
        Logout
      </button>

      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout Confirmation</h3>
          <p className="py-4">Are you sure you want to logout?</p>
          <div className="modal-action flex justify-end">
            <button
              className="btn btn-error mr-2"
              onClick={() => {
                dispatch(logoutUser());
                // Close the modal
                document.getElementById("logout_modal").close();
                //navigate to login
                navigate("/");
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                // Close the modal
                document.getElementById("logout_modal").close();
              }}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Logout;
