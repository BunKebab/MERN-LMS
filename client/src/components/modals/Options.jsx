import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

//import components
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";

const Options = () => {
  return (
    <>
      <button className="btn" onClick={() => document.getElementById("options_modal").showModal()}>
      <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
      </button>

      <dialog id="options_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Options</h3>
          <div className="mb-4">
            <div className="flex justify-center">
              <ChangePassword />
            </div>
            <div className="flex justify-center">
              <Logout />
            </div>
          </div>
          <div className="modal-action flex justify-end">
            <button className="btn" onClick={() => document.getElementById("options_modal").close()}>
              Close <AiOutlineClose className="inline-block h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Options;
